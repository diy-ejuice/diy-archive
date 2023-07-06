import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import { Fragment } from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { faList } from '@fortawesome/free-solid-svg-icons';

import TitleIcon from 'components/titleIcon';

export default function Header({ siteTitle = '' }) {
  return (
    <Fragment>
      <Navbar variant="dark" bg="primary" expand="lg">
        <Container>
          <Navbar.Brand className="d-flex d-sm-none">
            <Link to="/" className="text-light">
              {siteTitle}
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Nav>
              <Nav.Link as={Link} to="/submissions">
                <TitleIcon icon={faList} title="Submissions" />
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
