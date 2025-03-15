import { useEffect, useState } from "react";
import { Container, Table, Form, Button } from "react-bootstrap";
import "../styles/admin.css";

function ZarzadzanieUzytkownikami() {
  const [users, setUsers] = useState([]);
  const [editedUsers, setEditedUsers] = useState({});

  useEffect(() => {
    fetch("http://localhost/backend/get_users.php")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error("Błąd pobierania użytkowników:", err));
  }, []);

  const handleEdit = (id, key, value) => {
    setEditedUsers((prev) => ({
      ...prev,
      [id]: { ...prev[id], [key]: value },
    }));
  };

  const handleSaveChanges = async (id) => {
    const user = editedUsers[id];

    if (!user) {
        alert("Nie dokonano żadnych zmian.");
        return;
    }

    // Pobranie oryginalnych danych użytkownika
    const originalUser = users.find((u) => u.id === id);

    if (!originalUser) {
        alert("Błąd: Nie znaleziono użytkownika.");
        return;
    }

    // Wypełnianie pustych pól domyślnymi wartościami
    const updatedUser = {
        username: user.username || originalUser.username,
        role: user.role || originalUser.role,
        badges: user.badges !== undefined ? user.badges : originalUser.badges || "",
    };

    // Wysyłanie żądania do backendu
    const response = await fetch("http://localhost/backend/update_user.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...updatedUser }),
    });

    const data = await response.json();
    if (data.success) {
        setUsers(users.map((u) => (u.id === id ? { ...u, ...updatedUser } : u)));
        setEditedUsers((prev) => ({ ...prev, [id]: {} }));
    } else {
        alert("Błąd: " + data.error);
    }
};

  const handleDeleteUser = async (id) => {
    const response = await fetch("http://localhost/backend/delete_user.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    const data = await response.json();
    if (data.success) {
      setUsers(users.filter((user) => user.id !== id));
    } else {
      alert("Błąd: " + data.error);
    }
  };

  return (
    <Container className="mt-4">
      <h1 className="text-center mb-4">Zarządzanie Użytkownikami</h1>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nazwa</th>
            <th>Rola</th>
            <th>Odznaki</th>
            <th>Akcje</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>
                <Form.Control
                  type="text"
                  value={editedUsers[user.id]?.username || user.username}
                  onChange={(e) => handleEdit(user.id, "username", e.target.value)}
                />
              </td>
              <td>
                <Form.Select
                  value={editedUsers[user.id]?.role || user.role}
                  onChange={(e) => handleEdit(user.id, "role", e.target.value)}
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </Form.Select>
              </td>
              <td>
                <Form.Check
                  type="checkbox"
                  label="Tłumacz Gier"
                  checked={(editedUsers[user.id]?.badges || user.badges || "").includes("tłumacz gier")}
                  onChange={(e) => {
                    const newBadges = e.target.checked
                      ? [...(editedUsers[user.id]?.badges?.split(",") || user.badges?.split(",") || []), "tłumacz gier"].join(",")
                      : (editedUsers[user.id]?.badges?.split(",") || user.badges?.split(",") || []).filter((b) => b !== "tłumacz gier").join(",");
                    handleEdit(user.id, "badges", newBadges);
                  }}
                />
                <Form.Check
                  type="checkbox"
                  label="Organizator Spotkań"
                  checked={(editedUsers[user.id]?.badges || user.badges || "").includes("organizator spotkań")}
                  onChange={(e) => {
                    const newBadges = e.target.checked
                      ? [...(editedUsers[user.id]?.badges?.split(",") || user.badges?.split(",") || []), "organizator spotkań"].join(",")
                      : (editedUsers[user.id]?.badges?.split(",") || user.badges?.split(",") || []).filter((b) => b !== "organizator spotkań").join(",");
                    handleEdit(user.id, "badges", newBadges);
                  }}
                />
                <Form.Check
                  type="checkbox"
                  label="Członek Klubu"
                  checked={(editedUsers[user.id]?.badges || user.badges || "").includes("członek klubu")}
                  onChange={(e) => {
                    const newBadges = e.target.checked
                      ? [...(editedUsers[user.id]?.badges?.split(",") || user.badges?.split(",") || []), "członek klubu"].join(",")
                      : (editedUsers[user.id]?.badges?.split(",") || user.badges?.split(",") || []).filter((b) => b !== "członek klubu").join(",");
                    handleEdit(user.id, "badges", newBadges);
                  }}
                />
              </td>
              <td>
                <Button variant="success" className="me-2" onClick={() => handleSaveChanges(user.id)}>
                  Zapisz zmiany
                </Button>
                <Button variant="danger" onClick={() => handleDeleteUser(user.id)}>
                  Usuń
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default ZarzadzanieUzytkownikami;
