import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import { ListGroup, ListGroupItem, Row, Col } from 'react-bootstrap';
import { format, formatDistanceToNow } from 'date-fns';

import Flair from 'components/flair';
import { getSubmissionUrl } from 'utils';
import Score from './score';

export default function Submissions({ submissions }) {
  return (
    <ListGroup>
      {submissions.map((submission) => (
        <ListGroupItem key={submission.id}>
          <Row>
            <Col
              xs={1}
              className="d-flex justify-content-center align-items-center"
            >
              <Score score={submission.score} />
            </Col>
            <Col xs={11}>
              <p className="mb-1">
                <Flair
                  text={submission.linkFlair}
                  color={submission.linkFlairColor}
                />
                <Link to={getSubmissionUrl(submission)}>
                  {submission.title} by {submission.author}
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
                  })}
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
