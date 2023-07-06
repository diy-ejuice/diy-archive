import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Layout from './layout';
import { Badge, Card, Col, Container, Row } from 'react-bootstrap';

import Comment from './comment.js';

export default function Submission({ data }) {
  const { submissionsJson: submission } = data;

  return (
    <Layout>
      <Container>
        <Card body className="mb-2">
          <Card.Title>
            <Container fluid>
              <Row>
                <Col xs={12}>
                  {submission.linkFlair ? (
                    <Badge color={submission.linkFlairColor ?? '#262323'}>
                      {submission.linkFlair}
                    </Badge>
                  ) : null}
                  {submission.title}
                </Col>
              </Row>
              <Row>
                <Col xs={12}>submitted on DATE by {submission.author}</Col>
              </Row>
            </Container>
          </Card.Title>
          <Container>
            <blockquote>{submission.selftext}</blockquote>
          </Container>
        </Card>
        <Card body>
          <Card.Title>Comments</Card.Title>
          {submission.comments.map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))}
        </Card>
      </Container>
    </Layout>
  );
}

Submission.propTypes = {
  data: PropTypes.object
};

export const pageQuery = graphql`
  query ($jsonId: String!) {
    submissionsJson(jsonId: { eq: $jsonId }) {
      jsonId
      url
      selftext
      linkFlair
      score
      title
      author
      comments {
        id
        body
        author
      }
    }
  }
`;
