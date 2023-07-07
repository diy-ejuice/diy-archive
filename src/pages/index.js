import { Container, Row, Col } from 'react-bootstrap';

import SEO from 'components/seo';
import Layout from 'components/layout';

export default function IndexPage() {
  return (
    <Layout>
      <SEO title="Home" />
      <Container>
        <Row>
          <Col xs={12}>
            <h1>DIY Archive</h1>
            <p>This site is an archive of the /r/DIY_eJuice subreddit.</p>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}
