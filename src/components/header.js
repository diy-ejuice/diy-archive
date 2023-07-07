import { Link, navigate } from 'gatsby';
import PropTypes from 'prop-types';
import { Fragment, useCallback, useState } from 'react';
import { Form, Container, Navbar, Nav, Button } from 'react-bootstrap';
import { faBook, faClock, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getSubmissionUrl } from 'utils';

export default function Header({ siteTitle = '' }) {
  const [submissionId, setSubmissionId] = useState(null);
  const handleGo = useCallback(() => {
    if (!submissionId) {
      return;
    }

    navigate(getSubmissionUrl({ jsonId: submissionId }));
  }, []);

  return (
    <Fragment>
      <Navbar variant="dark" bg="primary" expand="lg">
        <Container>
          <Navbar.Brand>
            <Link to="/" className="text-light">
              {siteTitle}
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Nav>
              <Nav.Link as={Link} to="/new">
                <FontAwesomeIcon icon={faClock} fixedWidth /> New
              </Nav.Link>
              <Nav.Link as={Link} to="/top">
                <FontAwesomeIcon icon={faStar} fixedWidth /> Top
              </Nav.Link>
            </Nav>
            <Form className="d-flex ms-auto me-2">
              <Form.Control
                type="text"
                className="me-2"
                placeholder="post id (e.g. '3npyqv')"
                onChange={(event) => setSubmissionId(event.target.value)}
              />
              <Button onClick={handleGo} variant="success">
                Go
              </Button>
            </Form>
            <Nav>
              <Nav.Link href="https://diyejuice.org">
                <FontAwesomeIcon icon={faBook} fixedWidth /> DIY Compendium
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Fragment>
  );
}

Header.propTypes = {
  siteTitle: PropTypes.string
};
