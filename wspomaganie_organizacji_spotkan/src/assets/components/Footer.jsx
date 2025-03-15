import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import "../styles/footer.css";

function Footer() {
  return (
    <footer className="bg-dark text-light py-4 mt-auto">
      <Container>
        <Row>
          <Col md={6}>
            <h3>&copy; {new Date().getFullYear()} Harcerski Klub Gier Planszowych i Fabularnych PAF</h3>
          </Col>
          <Col md={6}>
            <nav>
              <ul className="list-unstyled d-flex justify-content-end">
                <li className="mx-2"><Link to="/" className="text-light">Strona główna</Link></li>
                <li className="mx-2"><Link to="/kalendarz" className="text-light">Kalendarz</Link></li>
                <li className="mx-2"><Link to="/gry" className="text-light">Gry</Link></li>
                <li className="mx-2"><Link to="/nowosci" className="text-light">Nowości</Link></li>
                <li className="mx-2"><Link to="/spotkania" className="text-light">Spotkania</Link></li>
                <li className="mx-2"><Link to="/kontakt" className="text-light">Kontakt</Link></li>
              </ul>
            </nav>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
