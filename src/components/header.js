import { Link, navigate } from 'gatsby';
import PropTypes from 'prop-types';
import { Fragment, useCallback, useState } from 'react';
import {
  Form,
  Container,
  Navbar,
  Nav,
  Button,
  Dropdown
} from 'react-bootstrap';
import {
  faBook,
  faClock,
  faListDots,
  faStar
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getSubmissionUrl } from 'utils';

export default function Header({ siteTitle = '' }) {
  const [submissionId, setSubmissionId] = useState(null);
  const handleGo = useCallback(() => {
    if (!submissionId) {
      return;
    }

    navigate(getSubmissionUrl({ jsonId: submissionId }));
  }, [submissionId]);

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
              <Dropdown as={Nav.Item}>
                <Dropdown.Toggle as={Nav.Link}>
                  <FontAwesomeIcon icon={faListDots} fixedWidth /> Flair
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item as={Link} to="/flair/recipe">
                    Recipes
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/flair/vendor">
                    Vendors
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/flair/fotw">
                    FOTW
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/flair/weekly">
                    Weekly Posts
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/flair/other">
                    Other
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
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
