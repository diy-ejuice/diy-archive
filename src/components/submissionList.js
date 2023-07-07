import { Link, graphql } from 'gatsby';
import PropTypes from 'prop-types';
import { Row, Col, ListGroup, ListGroupItem } from 'react-bootstrap';

import Flair from 'components/flair';
import { getSubmissionUrl } from 'utils';

export default function SubmissionList({ data: { submissions } }) {
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
  data: PropTypes.shape({
    submissions: PropTypes.arrayOf(PropTypes.object).isRequired
  }).isRequired
};

export const pageQuery = graphql`
  query ($skip: Int!, $limit: Int!) {
    submissions: allSubmissionsJson(
      limit: $limit
      skip: $skip
      sort: { createdAt: DESC }
    ) {
      nodes {
        jsonId
        score
        title
        author
        createdAt
        linkFlair
      }
    }
  }
`;
