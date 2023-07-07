import { Link, graphql } from 'gatsby';
import PropTypes from 'prop-types';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Button,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Container
} from 'react-bootstrap';

import Flair from 'components/flair';
import { getSubmissionUrl } from 'utils';
import Layout from './layout';

export default function SubmissionList({
  data: {
    submissions: { nodes: submissions }
  }
}) {
  const pageIndex = parseInt(
    window.location.href.substring(window.location.href.lastIndexOf('/') + 1),
    10
  );

  return (
    <Layout>
      <Container>
        <Row>
          <Col xs={12}>
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
          </Col>
        </Row>
        <Row className="mt-2">
          <Col xs={2}>
            {pageIndex > 1 && (
              <Link to={`/new/${pageIndex - 1}`}>
                <Button bg="secondary">
                  <FontAwesomeIcon icon={faArrowLeft} fixedWidth /> Previous
                </Button>
              </Link>
            )}
          </Col>
          <Col xs={8}></Col>
          <Col xs={2} className="text-end">
            <Link to={`/new/${pageIndex + 1}`}>
              <Button bg="secondary">
                <FontAwesomeIcon icon={faArrowRight} fixedWidth /> Next
              </Button>
            </Link>
          </Col>
        </Row>
      </Container>
    </Layout>
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
