import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button, Alert, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function Rejestracja() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (msg) {
      const timeout = setTimeout(() => setMsg(""), 5000);
      return () => clearTimeout(timeout);
    }
  }, [msg]);

  useEffect(() => {
    if (error) {
      const timeout = setTimeout(() => setError(""), 5000);
      return () => clearTimeout(timeout);
    }
  }, [error]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMsg("");

    if (!username || !email || !password || !passwordRepeat) {
      setError("Wszystkie pola są wymagane!");
      return;
    }
    if (password !== passwordRepeat) {
      setError("Hasła nie są takie same!");
      return;
    }
    if (password.length < 8) {
      setError("Hasło musi mieć co najmniej 8 znaków!");
      return;
    }

    try {
      const response = await fetch("http://localhost/backend/registration.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();
      if (data[0]?.result === "Zarejestrowano pomyślnie!") {
        setMsg("Rejestracja zakończona sukcesem!");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setError(data[0]?.result || "Błąd rejestracji!");
      }
    } catch (err) {
      setError("Błąd serwera: " + err.message);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Row className="w-100">
        <Col md={{ span: 6, offset: 3 }}>
          <div className="shadow-lg p-4 rounded bg-white">
            <h2 className="text-center mb-4">Rejestracja</h2>
            {msg && <Alert variant="success">{msg}</Alert>}
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Nazwa użytkownika</Form.Label>
                <Form.Control
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>E-mail</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Hasło</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Powtórz hasło</Form.Label>
                <Form.Control
                  type="password"
                  value={passwordRepeat}
                  onChange={(e) => setPasswordRepeat(e.target.value)}
                  required
                />
              </Form.Group>
              <Button variant="success" type="submit" className="w-100">
                Zarejestruj
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Rejestracja;
