import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Link, graphql } from 'gatsby';
import PropTypes from 'prop-types';
import {
  Container,
  Row,
  Col,
  Button,
  ListGroup,
  ListGroupItem
} from 'react-bootstrap';

import SEO from 'components/seo';
import Layout from 'components/layout';
import Flair from 'components/flair';
import { getSubmissionUrl } from 'utils';

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
          <Col xs={12} className="d-flex justify-content-end mt-2">
            <Link to="/new/1">
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
