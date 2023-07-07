import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'react-bootstrap';

import SEO from 'components/seo';
import Layout from 'components/layout';
import SubmissionList from 'components/submissionList';

export default function IndexPage({ data }) {
  const {
    allSubmissionsJson: { nodes: submissions }
  } = data;

  return (
    <Layout>
      <SEO title="Recent Submissions" />
      <Container>
        <Row>
          <Col xs={12}>
            <SubmissionList submissions={submissions} />
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}

IndexPage.propTypes = {
  data: PropTypes.object.isRequired
};

export const query = graphql`
  query {
    allSubmissionsJson(limit: 20, sort: { createdAt: DESC }) {
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
