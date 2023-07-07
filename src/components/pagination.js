import PropTypes from 'prop-types';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'gatsby';
import { Fragment } from 'react';
import { Button, Row, Col } from 'react-bootstrap';

export default function Pagination({ pageIndex = 1, baseUrl }) {
  return (
    <Fragment>
      <Row>
        <Col xs={2}>
          {pageIndex > 1 && (
            <Link
              to={pageIndex === 2 ? baseUrl : `${baseUrl}/${pageIndex - 1}`}
            >
              <Button bg="secondary">
                <FontAwesomeIcon icon={faArrowLeft} fixedWidth /> Previous
              </Button>
            </Link>
          )}
        </Col>
        <Col xs={8}></Col>
        <Col xs={2} className="text-end">
          <Link to={`${baseUrl}/${pageIndex + 1}`}>
            <Button bg="secondary">
              <FontAwesomeIcon icon={faArrowRight} fixedWidth /> Next
            </Button>
          </Link>
        </Col>
      </Row>
    </Fragment>
  );
}

Pagination.propTypes = {
  pageIndex: PropTypes.number,
  baseUrl: PropTypes.string.isRequired
};
