import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import { Row, Col, Container } from 'react-bootstrap';

import SEO from 'components/seo';
import Layout from 'components/layout';
import Pagination from 'components/pagination';
import Submissions from 'components/submissions';

export default function FlairSubmissions({
  data: {
    submissions: { nodes: submissions }
  },
  pageContext: { flair, skip, limit }
}) {
  const pageIndex = skip / limit;

  return (
    <Layout>
      <SEO title={`Recent - Page ${pageIndex}`} />
      <Container>
        <Pagination
          baseUrl={`/flair/${flair.toLowerCase()}`}
          pageIndex={pageIndex}
        />
        <Row className="my-2">
          <Col xs={12}>
            <Submissions submissions={submissions} />
          </Col>
        </Row>
        <Pagination
          baseUrl={`/flair/${flair.toLowerCase()}`}
          pageIndex={pageIndex}
        />
      </Container>
    </Layout>
  );
}

FlairSubmissions.propTypes = {
  data: PropTypes.shape({
    submissions: PropTypes.shape({
      nodes: PropTypes.arrayOf(PropTypes.object).isRequired
    }).isRequired
  }).isRequired,
  pageContext: PropTypes.object.isRequired
};

export const pageQuery = graphql`
  query ($flair: String!, $skip: Int!, $limit: Int!) {
    submissions: allSubmissionsJson(
      filter: { linkFlair: { eq: $flair } }
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
        comments {
          id
          replies {
            id
            replies {
              id
              replies {
                id
              }
            }
          }
        }
      }
    }
  }
`;
