import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faExternalLink } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import { format, formatDistanceToNow } from 'date-fns';
import ReactMarkdown from 'react-markdown';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';

import Layout from './layout';
import Comment from './comment';
import Flair from './flair';

export default function Submission({ data }) {
  const { submissionsJson: submission } = data;

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
                  <FontAwesomeIcon
                    color="#FF5700"
                    icon={faArrowUp}
                    fixedWidth
                  />{' '}
                  {submission.score}
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
          <Card.Title>Comments</Card.Title>
          {submission.comments.map((comment) => (
            <Comment
              key={comment.id}
              comment={comment}
              submission={submission}
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
