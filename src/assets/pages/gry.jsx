import { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, Card, Alert } from "react-bootstrap";
import "../styles/gry.css";

export function Gry() {
  const [games, setGames] = useState([]); 
  const [filteredGames, setFilteredGames] = useState([]); 
  const [search, setSearch] = useState(""); 
  const [difficulty, setDifficulty] = useState(""); 

  useEffect(() => {
    fetch("http://localhost/backend/get_games.php")
      .then((res) => res.json())
      .then((data) => {
        setGames(data);
        setFilteredGames(data);
      })
      .catch((err) => console.error("Błąd pobierania gier:", err));
  }, []);

  const sortGames = (type) => {
    let sortedGames = [...filteredGames];
    switch (type) {
      case "wiek-asc":
        sortedGames.sort((a, b) => a.wiek_PEGI - b.wiek_PEGI);
        break;
      case "wiek-desc":
        sortedGames.sort((a, b) => b.wiek_PEGI - a.wiek_PEGI);
        break;
      case "gracze-asc":
        sortedGames.sort((a, b) => parseInt(a.liczba_graczy) - parseInt(b.liczba_graczy));
        break;
      case "gracze-desc":
        sortedGames.sort((a, b) => parseInt(b.liczba_graczy) - parseInt(a.liczba_graczy));
        break;
      case "czas-asc":
        sortedGames.sort((a, b) => a.czas_gry - b.czas_gry);
        break;
      case "czas-desc":
        sortedGames.sort((a, b) => b.czas_gry - a.czas_gry);
        break;
      default:
        sortedGames = [...games]; 
    }
    setFilteredGames(sortedGames);
  };

  useEffect(() => {
    let filtered = games.filter((game) =>
      game.tytul.toLowerCase().includes(search.toLowerCase())
    );
    if (difficulty) {
      filtered = filtered.filter((game) => game.trudnosc === difficulty);
    }
    setFilteredGames(filtered);
  }, [search, difficulty, games]);

  return (
    <Container className="mt-4">
      <h1 className="text-primary text-center fw-bold">Lista Gier Klubu</h1>

      {/* Wyszukiwarka */}
      <Form className="mb-3">
        <Form.Control
          type="text"
          placeholder="Wyszukaj grę..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Form>

      {/* Sortowanie i Filtry */}
      <Row className="mb-4">
        <Col md={6} className="mb-2">
          <Form.Select onChange={(e) => setDifficulty(e.target.value)}>
            <option value="">Wszystkie trudności</option>
            <option value="łatwa">Łatwa</option>
            <option value="średnia">Średnia</option>
            <option value="trudna">Trudna</option>
          </Form.Select>
        </Col>
        <Col md={6} className="mb-2 d-flex justify-content-between">
          <Button variant="primary" onClick={() => sortGames("wiek-asc")}>Wiek ↑</Button>
          <Button variant="primary" onClick={() => sortGames("wiek-desc")}>Wiek ↓</Button>
          <Button variant="primary" onClick={() => sortGames("gracze-asc")}>Gracze ↑</Button>
          <Button variant="primary" onClick={() => sortGames("gracze-desc")}>Gracze ↓</Button>
          <Button variant="primary" onClick={() => sortGames("czas-asc")}>Czas Gry ↑</Button>
          <Button variant="primary" onClick={() => sortGames("czas-desc")}>Czas Gry ↓</Button>
        </Col>
      </Row>

      {/* Lista gier */}
      <Row>
        {filteredGames.length === 0 ? (
          <Col>
            <Alert variant="warning" className="text-center">Brak gier spełniających kryteria.</Alert>
          </Col>
        ) : (
          filteredGames.map((game) => (
            <Col key={game.id} md={4} className="mb-4">
              <Card className="h-100">
                <Card.Img variant="top" src={game.obraz_url} alt={game.tytul} className="gry-image" />
                <Card.Body>
                  <Card.Title>{game.tytul}</Card.Title>
                  <Card.Text>
                    <strong>Liczba graczy:</strong> {game.liczba_graczy} <br />
                    <strong>Czas gry:</strong> {game.czas_gry} min <br />
                    <strong>Trudność:</strong> {game.trudnosc} <br />
                    <strong>Wiek PEGI:</strong> {game.wiek_PEGI}+ <br />
                    <strong>Opis:</strong> {game.opis}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
}

export default Gry;
