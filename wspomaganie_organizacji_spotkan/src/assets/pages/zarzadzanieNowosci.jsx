/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import "../styles/admin.css";

function ZarzadzanieNowosci() {
  const [news, setNews] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const res = await fetch("http://localhost/backend/get_news.php");
      const data = await res.json();
      setNews(data);
    } catch (err) {
      console.error("Błąd pobierania nowości:", err);
    }
  };

  const handleAddOrEditNews = async (e) => {
    e.preventDefault();
    setStatus(null);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    if (image) formData.append("image", image);
    if (editingId) formData.append("id", editingId);

    const url = editingId
      ? "http://localhost/backend/edit_news.php"
      : "http://localhost/backend/add_news.php";

    try {
      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (result.success) {
        setStatus({ type: "success", message: result.message });
        setTitle("");
        setDescription("");
        setImage(null);
        setEditingId(null);
        await fetchNews(); // Odświeżenie listy nowości
      } else {
        setStatus({ type: "error", message: result.error });
      }
  
    } catch (error) {
      setStatus({ type: "error", message: "Błąd sieci. Spróbuj ponownie." });
    }
  };

  const handleEditNews = (newsItem) => {
    setTitle(newsItem.title);
    setDescription(newsItem.description);
    setEditingId(newsItem.id);
  };

  const handleDeleteNews = async (id) => {
    try {
      const response = await fetch("http://localhost/backend/delete_news.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      const result = await response.json();
      if (result.success) {
        setNews(news.filter((item) => item.id !== id));
      } else {
        alert("Błąd: " + result.error);
      }
    } catch (error) {
      alert("Błąd sieci. Spróbuj ponownie.");
    }
  };

  return (
    <Container className="mt-4">
      <h1 className="text-center mb-4">Zarządzanie Nowościami</h1>

      {status && (
        <div className={`alert alert-${status.type === "success" ? "success" : "danger"}`}>
          {status.message}
        </div>
      )}

      <Row className="justify-content-center">
        <Col md={6}>
          <Form onSubmit={handleAddOrEditNews} className="p-4 border rounded shadow-sm bg-light">
            <Form.Group className="mb-3">
              <Form.Label>Tytuł nowości</Form.Label>
              <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Opis nowości</Form.Label>
              <Form.Control as="textarea" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Zdjęcie</Form.Label>
              <Form.Control type="file" onChange={(e) => setImage(e.target.files[0])} required={!editingId} />
            </Form.Group>
            <Button type="submit" variant="primary" className="w-100">
              {editingId ? "Zapisz zmiany" : "Dodaj Nowość"}
            </Button>
            {editingId && <Button variant="secondary" className="w-100 mt-2" onClick={() => setEditingId(null)}>Anuluj edycję</Button>}
          </Form>
        </Col>
      </Row>

      <h2 className="text-center mt-4">Lista Nowości</h2>
      <Row>
        {news.map((item) => (
          <Col key={item.id} md={4} className="mb-4">
            <Card>
              <Card.Img variant="top" src={item.image_url} alt={item.title} />
              <Card.Body>
                <Card.Title>{item.title}</Card.Title>
                <Card.Text>{item.description}</Card.Text>
                <Button variant="warning" className="me-2" onClick={() => handleEditNews(item)}>Edytuj</Button>
                <Button variant="danger" onClick={() => handleDeleteNews(item.id)}>Usuń</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default ZarzadzanieNowosci;
