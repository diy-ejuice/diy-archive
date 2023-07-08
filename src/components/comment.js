import { faLink } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { format, formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';

import { getSubmissionUrl } from 'utils';
import Flair from './flair';
import Score from './score';

export default function Comment({ comment, submission }) {
  return (
    <Card body className="mb-2">
      <Card.Title className="small">
        <Score score={comment.score} suffix="points" />
        <span
          className="ms-1"
          id={comment.id}
          title={format(comment.createdAt * 1e3, 'yyyy-MM-dd HH:mm:ss')}
        >
          {formatDistanceToNow(comment.createdAt * 1e3, {
            addSuffix: true
          })}
        </span>{' '}
        by {comment.author}
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
          <Comment key={reply.id} comment={reply} submission={submission} />
        ))}
    </Card>
  );
}

Comment.propTypes = {
  comment: PropTypes.object.isRequired,
  submission: PropTypes.object.isRequired
};
