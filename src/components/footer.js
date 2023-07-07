import { format } from 'date-fns';
import { Row, Col, Container } from 'react-bootstrap';

export default function Footer() {
  const currentYear = format(Date.now(), 'yyyy');

  return (
    <footer className="my-md-4 pt-md-4 border-top diy-footer m-auto">
      <Container>
        <Row>
          <Col md="12" className="text-center">
            Site copyright &copy; {currentYear} DIY Compendium. Data courtesy of
            Reddit.
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
