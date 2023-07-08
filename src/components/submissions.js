import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import { ListGroup, ListGroupItem, Row, Col } from 'react-bootstrap';
import { format, formatDistanceToNow } from 'date-fns';

import Flair from 'components/flair';
import Score from 'components/score';
import CommentCount from 'components/commentCount';
import { countComments, getSubmissionUrl } from 'utils';

export default function Submissions({ submissions }) {
  return (
    <ListGroup>
      {submissions.map((submission) => (
        <ListGroupItem key={submission.jsonId}>
          <Row>
            <Col xs={1}>
              <Row>
                <Col xs={6}>
                  <Score score={submission.score} />
                </Col>
                <Col xs={6}>
                  <CommentCount count={countComments(submission)} />
                </Col>
              </Row>
            </Col>
            <Col xs={11}>
              <p className="mb-1">
                <Flair
                  text={submission.linkFlair}
                  color={submission.linkFlairColor}
                />
                <Link to={getSubmissionUrl(submission)}>
                  {submission.title}
                </Link>
              </p>
              <p className="small mb-0">
                submitted{' '}
                <span
                  title={format(
                    submission.createdAt * 1e3,
                    'yyyy-MM-dd HH:mm:ss'
                  )}
                >
                  {formatDistanceToNow(submission.createdAt * 1e3, {
                    addSuffix: true
                  })}{' '}
                  by {submission.author}
                </span>
              </p>
            </Col>
          </Row>
        </ListGroupItem>
      ))}
    </ListGroup>
  );
}

Submissions.propTypes = {
  submissions: PropTypes.arrayOf(PropTypes.object).isRequired
};
