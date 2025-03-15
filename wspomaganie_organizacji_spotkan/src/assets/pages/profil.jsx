import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import "../styles/profil.css";

function Profil() {
  const [username, setUsername] = useState(null);
  const [role, setRole] = useState(null);
  const [badges, setBadges] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    const storedRole = localStorage.getItem("role");

    if (storedUsername) {
      setUsername(storedUsername);
      setRole(storedRole || "user");

      fetch(`http://localhost/backend/get_user_badges.php?username=${storedUsername}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.badges) {
            setBadges(data.badges.split(","));
          }
        })
        .catch((err) => console.error("Błąd pobierania odznaczeń:", err));
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const badgeImages = {
    "tłumacz gier": "tłumacz.jpg",
    "organizator spotkań": "organizator_spotkan.jpg",
    "członek klubu": "członek_klubu.jpg",
  };

  return (
    <Container className="mt-4">
      {username ? (
        <>
          <h1 className="text-white text-center">Profil użytkownika: {username}</h1>
          <hr className="border-light" />
          
          {/* Odznaczenia */}
          <h2 className="text-white text-center">Odznaczenia do zdobycia:</h2>
          <Row className="justify-content-center">
            {Object.keys(badgeImages).map((badge) => (
              <Col key={badge} md={4} className="mb-3">
                <Card bg="dark" text="white" className="text-center">
                  <Card.Img variant="top" src={`/images/${badgeImages[badge]}`} className="badge-image p-3" />
                  <Card.Body>
                    <Card.Title>{badge}</Card.Title>
                    {badges.includes(badge) ? (
                      <Card.Text className="text-success">🎉 Gratulacje! Posiadasz to odznaczenie.</Card.Text>
                    ) : (
                      <Card.Text className="text-danger">❌ Nie posiadasz tego odznaczenia.</Card.Text>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          {/* Panel Admina */}
          {role === "admin" && (
            <Card bg="primary" text="white" className="text-center mt-4">
              <Card.Body>
                <Card.Title>Panel Administracyjny</Card.Title>
                <Row className="justify-content-center">
                  <Col md={4} className="mb-2">
                    <Button as={Link} to="/zarzadzanieGrami" variant="light" className="w-100">Zarządzanie Grami</Button>
                  </Col>
                  <Col md={4} className="mb-2">
                    <Button as={Link} to="/zarzadzanieNowosciami" variant="light" className="w-100">Zarządzanie Nowościami</Button>
                  </Col>
                  <Col md={4} className="mb-2">
                    <Button as={Link} to="/zarzadzanieUzytkownikami" variant="light" className="w-100">Zarządzanie Użytkownikami</Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          )}
        </>
      ) : null}
    </Container>
  );
}

export default Profil;
