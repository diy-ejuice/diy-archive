import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import { Fragment } from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Header({ siteTitle = '' }) {
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
            <Nav className="ms-auto">
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
