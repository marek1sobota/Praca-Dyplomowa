import { Link, useNavigate } from "react-router-dom";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import { useState, useEffect } from "react";
import "../styles/navbar.css";

export function NavbarComponent() {
  const [username, setUsername] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = localStorage.getItem("username");
    if (loggedInUser) {
      setUsername(loggedInUser);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    localStorage.removeItem("user_id");
    setUsername(null);
    navigate("/");
    window.location.reload();
  };

  return (
    <Navbar bg="primary" variant="dark" expand="lg" className="w-100">
      <Container>
        <Navbar.Brand as={Link} to="/">PAF Klub</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Strona główna</Nav.Link>
            <Nav.Link as={Link} to="/kalendarz">Kalendarz</Nav.Link>
            <Nav.Link as={Link} to="/gry">Gry</Nav.Link>
            <Nav.Link as={Link} to="/nowosci">Nowości</Nav.Link>
            <Nav.Link as={Link} to="/spotkania">Spotkania</Nav.Link>
            <Nav.Link as={Link} to="/kontakt">Kontakt</Nav.Link>
          </Nav>
          {username ? (
            <Nav className="align-items-center">
              <span className="text-light me-2">{username}</span>
              <NavDropdown title={<FaUserCircle size={30} />} id="user-dropdown">
                <NavDropdown.Item as={Link} to="/profil">Profil</NavDropdown.Item>
                <NavDropdown.Item onClick={handleLogout}>Wyloguj się</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          ) : (
            <Nav>
              <Nav.Link as={Link} to="/login">Zaloguj się</Nav.Link>
              <Nav.Link as={Link} to="/rejestracja">Zarejestruj</Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;
