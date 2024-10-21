import jsonfile from 'jsonfile';
import { existsSync, createWriteStream } from 'fs';
import { Transform } from 'stream';
import { pipeline } from 'stream/promises';
import { mkdirp } from 'mkdirp';
import { basename } from 'path';
import { decompressStream } from 'cppzst';

const { readFile, writeFile } = jsonfile;

const transformSubmission = ({
  author,
  author_flair_text: authorFlair,
  author_flair_background_color: authorFlairColor,
  created_utc: createdAt,
  edited,
  id,
  is_self: isSelf,
  link_flair_background_color: linkFlairColor,
  link_flair_text: linkFlair,
  permalink,
  score,
  selftext,
  thumbnail,
  title,
  url
}) => {
  const result = {
    author,
    authorFlair,
    authorFlairColor,
    createdAt: parseInt(createdAt, 10),
    edited: edited === false ? null : parseInt(edited, 10),
    id,
    linkFlair,
    linkFlairColor,
    permalink,
    score,
    thumbnail,
    title
  };

  if (isSelf) {
    result.selftext = selftext;
  } else {
    result.url = url;
  }

  return result;
};

const transformComment = ({
  author_flair_text: authorFlair,
  author,
  body,
  created_utc: createdAt,
  id,
  score
}) => ({
  author,
  authorFlair,
  body,
  createdAt: parseInt(createdAt, 10),
  id,
  replies: [],
  score
});

class JsonFixer extends Transform {
  started = false;

  _transform(chunk, _, callback) {
    const commaChunk = chunk.toString().replace(/$/gm, ',').replace(/,$/, '');

    if (!this.started) {
      callback(null, `[\n${commaChunk}`);
      this.started = true;
    } else {
      callback(null, commaChunk);
    }
  }

  _flush(callback) {
    callback(null, '{}]');
  }
}

const downloadAndExtractArchive = async (url) => {
  const baseName = basename(url.substring(url.lastIndexOf('/') + 1), '.zst');
  const tempFile = `./cache/${baseName}.json`;

  if (existsSync(tempFile)) {
    console.log(`Cache hit for ${tempFile}`);
    return;
  }

  await pipeline(
    (await fetch(url)).body,
    decompressStream(),
    new JsonFixer(),
    createWriteStream(tempFile)
  );
};

const fetchArchiveData = async (subreddit) => {
  const urls = [
    `https://the-eye.eu/redarcs/files/${subreddit}_submissions.zst`,
    `https://the-eye.eu/redarcs/files/${subreddit}_comments.zst`
  ];

  const startTime = process.hrtime();

  await mkdirp('./cache');
  await Promise.all(urls.map(downloadAndExtractArchive));

  const [elapsedSec, elapsedNano] = process.hrtime(startTime);
  console.log(
    `Downloaded subreddit data in ${(
      (elapsedSec * 1e3 + elapsedNano / 1e6) /
      1e3
    ).toFixed(2)} seconds`
  );

  return {
    submissions: await readFile(`./cache/${subreddit}_submissions.json`),
    comments: await readFile(`./cache/${subreddit}_comments.json`)
  };
};

const splitData = async (subreddit) => {
  await mkdirp('./data/submissions');

  // read static data
  const { submissions, comments } = await fetchArchiveData(subreddit);

  // set up temporary maps for data storage
  const submissionMap = new Map();
  const parentChildMap = new Map();
  const commentMap = new Map();

  let counter = 0;

  // fill maps with comment data
  for (const comment of comments) {
    const { id, body, parent_id: parentId } = comment;

    if (++counter % 1000 === 0) {
      console.log(
        `${((counter / comments.length) * 100).toFixed(2)}% parsing comments`
      );
    }

    if (!id || body === '[deleted]') {
      continue;
    }

    commentMap.set(id, comment);

    if (parentId.startsWith('t3_')) {
      // the parent is a post
      if (!submissionMap.has(parentId)) {
        submissionMap.set(parentId, []);
      }

      submissionMap.get(parentId).push(transformComment(comment));
    } else if (parentId.startsWith('t1_')) {
      // the parent is a comment
      if (!parentChildMap.has(parentId)) {
        parentChildMap.set(parentId, []);
      }

      parentChildMap.get(parentId).push(id);
    }
  }

  counter = 0;

  for (const submission of submissions) {
    if (++counter % 100 === 0) {
      console.log(
        `${((counter / submissions.length) * 100).toFixed(
          2
        )}% parsing submissions`
      );
    }

    if (!submission.id || submission.score < 10) {
      continue;
    }

    const recurseReplies = (innerComments) =>
      innerComments.map((innerComment) => ({
        ...innerComment,
        replies: recurseReplies(
          (parentChildMap.get(`t1_${innerComment.id}`) ?? []).map((childId) =>
            transformComment(commentMap.get(childId))
          )
        )
      }));

    const sub = {
      ...transformSubmission(submission),
      comments: recurseReplies(submissionMap.get(`t3_${submission.id}`) ?? [])
    };

    await writeFile(`./data/submissions/${sub.id}.json`, sub);
  }
};

splitData('DIY_eJuice');
