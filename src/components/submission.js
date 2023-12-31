import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLink } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import { format, formatDistanceToNow } from 'date-fns';
import ReactMarkdown from 'react-markdown';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';

import Layout from './layout';
import Comment from './comment';
import Flair from './flair';
import Score from './score';
import { useState } from 'react';

export default function Submission({ data }) {
  const { submissionsJson: submission } = data;
  const [sortKey, setSortKey] = useState('score');

  if (submission.comments) {
    submission.comments.sort((a, b) => b[sortKey] - a[sortKey]);
  }

  return (
    <Layout>
      <Container>
        <Card body className="mb-2">
          <Card.Title>
            <Container fluid>
              <Row>
                <Col
                  xs={1}
                  className="d-flex justify-content-center align-items-center"
                >
                  <Score score={submission.score} />
                </Col>
                <Col xs={11}>
                  <Row>
                    <Col xs={12}>
                      <Flair
                        text={submission.linkFlair}
                        color={submission.linkFlairColor}
                      />
                      {submission.title}
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12} className="small">
                      submitted{' '}
                      <span
                        title={format(
                          submission.createdAt * 1e3,
                          'yyyy-MM-dd HH:mm:ss'
                        )}
                      >
                        {formatDistanceToNow(submission.createdAt * 1e3, {
                          addSuffix: true
                        })}
                      </span>{' '}
                      by {submission.author}
                      <Flair text={submission.authorFlair} />
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Container>
          </Card.Title>
          <Container>
            {Boolean(submission.selftext) && (
              <Card body>
                <ReactMarkdown>{submission.selftext}</ReactMarkdown>
              </Card>
            )}
            {Boolean(submission.url) && (
              <a
                href={submission.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="primary">
                  <FontAwesomeIcon icon={faExternalLink} fixedWidth /> View{' '}
                  {submission.url}
                </Button>
              </a>
            )}
          </Container>
        </Card>
        <Card body>
          <Card.Title>
            <Container fluid>
              <Row>
                <Col xs={8} className="d-flex align-items-center">
                  Comments
                </Col>
                <Col xs={4} className="d-flex justify-content-end">
                  <Form>
                    <Form.Group className="d-flex align-items-center">
                      <span className="me-2">Sort</span>
                      <Form.Select
                        onChange={(event) => setSortKey(event.target.value)}
                      >
                        <option value="score">Score</option>
                        <option value="createdAt">Age</option>
                      </Form.Select>
                    </Form.Group>
                  </Form>
                </Col>
              </Row>
            </Container>
          </Card.Title>
          {submission.comments.map((comment) => (
            <Comment
              key={comment.id}
              comment={comment}
              submission={submission}
              sortKey={sortKey}
            />
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
      score
      title
      author
      authorFlair
      createdAt
      comments {
        id
        body
        author
        authorFlair
        score
        createdAt
        replies {
          id
          body
          author
          authorFlair
          score
          createdAt
          replies {
            id
            body
            author
            authorFlair
            score
            createdAt
            replies {
              id
              body
              author
              authorFlair
              score
              createdAt
            }
          }
        }
      }
    }
  }
`;
