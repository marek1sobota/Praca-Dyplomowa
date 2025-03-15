import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button, Table, Alert, Card } from "react-bootstrap";
import "../styles/spotkania.css";

export function Spotkania() {
  const [meetings, setMeetings] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState("");
  const [userId, setUserId] = useState(null);
  const [role, setRole] = useState(null);
  const [editingMeetingId, setEditingMeetingId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMeetings();

    const storedUserId = localStorage.getItem("user_id");
    const storedRole = localStorage.getItem("role");

    if (storedUserId) {
      setUserId(parseInt(storedUserId));
      setRole(storedRole);
    }
  }, []);

  const fetchMeetings = () => {
    fetch("http://localhost/backend/get_meetings.php")
      .then((res) => res.json())
      .then((data) => setMeetings(data))
      .catch((err) => console.error("Błąd pobierania spotkań:", err));
  };

  const handleAddOrEditMeeting = async (e) => {
    e.preventDefault();

    if (!userId) {
      setStatus("Musisz się zalogować, aby dodać spotkanie!");
      return;
    }

    if (!title || !description || !date || !time || !location) {
      setStatus("Wypełnij wszystkie pola!");
      return;
    }

    const url = editingMeetingId
      ? "http://localhost/backend/edit_meeting.php"
      : "http://localhost/backend/add_meeting.php";

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: editingMeetingId,
        title,
        description,
        date,
        time,
        location,
        organizer_id: userId,
      }),
    });

    const data = await response.json();
    setStatus(data.message || data.error);

    if (data.message) {
      setTitle("");
      setDescription("");
      setDate("");
      setTime("");
      setLocation("");
      setEditingMeetingId(null);
      fetchMeetings();
    }
  };

  const handleEditMeeting = (meeting) => {
    if (!userId) {
      setStatus("Musisz się zalogować, aby edytować spotkanie!");
      return;
    }

    if (meeting.organizer_id !== userId && role !== "admin") {
      setStatus("Nie masz uprawnień do edycji tego spotkania!");
      return;
    }

    setEditingMeetingId(meeting.id);
    setTitle(meeting.title);
    setDescription(meeting.description);
    setDate(meeting.date);
    setTime(meeting.time);
    setLocation(meeting.location);
  };

  const handleDeleteMeeting = async (id, organizerId) => {
    if (!userId) {
      setStatus("Musisz się zalogować, aby usunąć spotkanie!");
      return;
    }

    if (organizerId !== userId && role !== "admin") {
      setStatus("Nie masz uprawnień do usunięcia tego spotkania!");
      return;
    }

    const response = await fetch("http://localhost/backend/delete_meeting.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, user_id: userId }),
    });

    const data = await response.json();
    setStatus(data.message || data.error);

    fetchMeetings();
  };

  // 🔹 **Funkcja generująca link do Google Calendar z wymuszonym logowaniem**
  const generateGoogleCalendarLink = (meeting) => {
    const startTime = new Date(`${meeting.date}T${meeting.time}`).toISOString().replace(/-|:|\.\d+/g, "");
    const endTime = new Date(new Date(`${meeting.date}T${meeting.time}`).getTime() + 60 * 60 * 1000)
      .toISOString()
      .replace(/-|:|\.\d+/g, "");
  
    // Link do dodania wydarzenia do Google Calendar
    const calendarLink = `https://calendar.google.com/calendar/u/0/r/eventedit?text=${encodeURIComponent(meeting.title)}&details=${encodeURIComponent(meeting.description)}&location=${encodeURIComponent(meeting.location)}&dates=${startTime}/${endTime}&sprop=name:PAF-Klub`;
  
    // Link do logowania do Google przed przekierowaniem do kalendarza
    return `https://accounts.google.com/AddSession?continue=${encodeURIComponent(calendarLink)}`;
  };

  return (
    <Container className="mt-4">
      <h1 className="text-danger text-center fw-bold">Spotkania Klubu</h1>

      {status && <Alert variant="info">{status}</Alert>}

      {!userId && (
        <Alert variant="warning" className="text-center">
          Musisz się{" "}
          <span
            className="login-link"
            onClick={() => navigate("/login")}
            style={{ cursor: "pointer", color: "blue", textDecoration: "underline" }}
          >
            zalogować
          </span>{" "}
          aby dodać spotkanie!
        </Alert>
      )}

      {userId && (
        <Form onSubmit={handleAddOrEditMeeting} className="mb-4">
          <Card className="p-4">
            <h2 className="text-primary text-center fw-bold">{editingMeetingId ? "Edytuj Spotkanie" : "Dodaj Spotkanie"}</h2>
            <Form.Group className="mb-3">
              <Form.Control type="text" placeholder="Tytuł" value={title} onChange={(e) => setTitle(e.target.value)} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control as="textarea" placeholder="Opis" value={description} onChange={(e) => setDescription(e.target.value)} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control type="text" placeholder="Lokalizacja" value={location} onChange={(e) => setLocation(e.target.value)} required />
            </Form.Group>
            <Button variant="success" type="submit" className="w-100">
              {editingMeetingId ? "Zapisz zmiany" : "Dodaj Spotkanie"}
            </Button>
          </Card>
        </Form>
      )}

      <h2 className="text-success text-center fw-bold">Lista Spotkań</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Tytuł</th>
            <th>Opis</th>
            <th>Data</th>
            <th>Miejsce</th>
            <th>Organizator</th>
            <th>Akcje</th>
          </tr>
        </thead>
        <tbody>
          {meetings.map((meeting) => (
            <tr key={meeting.id}>
              <td>{meeting.title}</td>
              <td>{meeting.description}</td>
              <td>{meeting.date} {meeting.time}</td>
              <td>{meeting.location}</td>
              <td>{meeting.organizer}</td>
              <td className="text-center">
                {(userId === meeting.organizer_id || role === "admin") && (
                  <>
                    <Button variant="warning" className="me-2" onClick={() => handleEditMeeting(meeting)}>Edytuj</Button>
                    <Button variant="danger" onClick={() => handleDeleteMeeting(meeting.id, meeting.organizer_id)}>Usuń</Button>
                  </>
                )}
                <a href={generateGoogleCalendarLink(meeting)} target="_blank" rel="noopener noreferrer">
                  <Button variant="info">Dodaj do Google</Button>
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default Spotkania;
