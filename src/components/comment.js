import { faLink } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { format, formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';

import { getSubmissionUrl } from 'utils';
import Flair from './flair';
import Score from './score';
import { useGeoPattern } from 'react-geopattern';

export default function Comment({ comment, submission, sortKey }) {
  const pattern = useGeoPattern(comment.author);

  if (comment.replies) {
    comment.replies.sort((a, b) => b[sortKey] - a[sortKey]);
  }

  return (
    <Card body className="mb-2">
      <Card.Title className="small">
        <Score score={comment.score} suffix="points" />
        <div
          style={{
            display: 'inline-block',
            borderRadius: 8,
            height: 20,
            width: 48,
            marginLeft: 4,
            marginRight: 4,
            backgroundImage: pattern.toDataUrl()
          }}
        >
          &nbsp;
        </div>
        by {comment.author}
        <span
          className="ms-1"
          id={comment.id}
          title={format(comment.createdAt * 1e3, 'yyyy-MM-dd HH:mm:ss')}
        >
          {formatDistanceToNow(comment.createdAt * 1e3, {
            addSuffix: true
          })}
        </span>
        <Flair text={comment.authorFlair} color={comment.authorFlairColor} />
        <a
          href={`${getSubmissionUrl(submission)}#${comment.id}`}
          className="ms-2"
        >
          <FontAwesomeIcon icon={faLink} />
        </a>
      </Card.Title>
      <ReactMarkdown>{comment.body}</ReactMarkdown>
      {Boolean(comment.replies) &&
        comment.replies.map((reply) => (
          <Comment
            key={reply.id}
            comment={reply}
            submission={submission}
            sortKey={sortKey}
          />
        ))}
    </Card>
  );
}

Comment.propTypes = {
  comment: PropTypes.object.isRequired,
  submission: PropTypes.object.isRequired,
  sortKey: PropTypes.string.isRequired
};
