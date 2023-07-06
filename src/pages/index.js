import {
  faArrowCircleRight,
  faArrowCircleLeft
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import { Container, Row, Col, Carousel } from 'react-bootstrap';

import SEO from 'components/seo';
import Layout from 'components/layout';

export default function IndexPage({ data }) {
  const {
    articles: { nodes: articles }
  } = data;

  return (
    <Layout>
      <SEO title="Recent Articles" />
      <Container>
        <h4 className="display-4">Recent Articles</h4>
        <Row className="justify-content-center">
          <Col md={10}>
            <Carousel
              indicators={false}
              className="mt-5"
              nextIcon={
                <FontAwesomeIcon icon={faArrowCircleRight} color="black" />
              }
              prevIcon={
                <FontAwesomeIcon icon={faArrowCircleLeft} color="black" />
              }
            >
              {articles.map(({ children: [article] }) => (
                <Carousel.Item key={article.frontmatter.title}></Carousel.Item>
              ))}
            </Carousel>
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
    allSubmissionsJson(limit: 100) {
      nodes {
        jsonId
      }
    }
  }
`;
