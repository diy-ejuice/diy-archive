import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import { Row, Col, Container } from 'react-bootstrap';

import SEO from 'components/seo';
import Layout from 'components/layout';
import Pagination from 'components/pagination';
import Submissions from 'components/submissions';

export default function NewSubmissions({
  data: {
    submissions: { nodes: submissions }
  },
  pageContext: { skip, limit }
}) {
  const pageIndex = skip / limit;

  return (
    <Layout>
      <SEO title={`Recent - Page ${pageIndex}`} />
      <Container>
        <Pagination baseUrl="/new" pageIndex={pageIndex} />
        <Row className="my-2">
          <Col xs={12}>
            <Submissions submissions={submissions} />
          </Col>
        </Row>
        <Pagination baseUrl="/new" pageIndex={pageIndex} />
      </Container>
    </Layout>
  );
}

NewSubmissions.propTypes = {
  data: PropTypes.shape({
    submissions: PropTypes.shape({
      nodes: PropTypes.arrayOf(PropTypes.object).isRequired
    }).isRequired
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
