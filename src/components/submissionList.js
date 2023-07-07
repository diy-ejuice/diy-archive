import { Link, graphql } from 'gatsby';
import PropTypes from 'prop-types';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Row, Col, Container } from 'react-bootstrap';

import Layout from 'components/layout';
import Submissions from 'components/submissions';
import { subsPerPage } from 'utils';

export default function SubmissionList({
  data: {
    submissions: { nodes: submissions }
  },
  pageContext: { skip }
}) {
  const pageIndex = skip / subsPerPage;

  return (
    <Layout>
      <Container>
        <Row>
          <Col xs={12}>
            <Submissions submissions={submissions} />
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
  }).isRequired,
  pageContext: PropTypes.object.isRequired
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
