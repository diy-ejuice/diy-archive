import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import { Row, Col, ListGroup, ListGroupItem } from 'react-bootstrap';

import Flair from 'components/flair';
import { getSubmissionUrl } from 'utils';

export default function SubmissionList({ submissions }) {
  return (
    <ListGroup>
      {submissions.map((submission) => (
        <ListGroupItem key={submission.id}>
          <Row>
            <Col xs={1}>
              <Flair
                text={submission.linkFlair}
                color={submission.linkFlairColor}
              />
            </Col>
            <Col xs={11}>
              <Link to={getSubmissionUrl(submission)}>
                {submission.title} by {submission.author}
              </Link>
            </Col>
          </Row>
        </ListGroupItem>
      ))}
    </ListGroup>
  );
}

SubmissionList.propTypes = {
  submissions: PropTypes.arrayOf(PropTypes.object).isRequired
};
