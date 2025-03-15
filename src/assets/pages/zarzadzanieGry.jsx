import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/admin.css";

function ZarzadzanieGry() {
  const [games, setGames] = useState([]);
  const [editGame, setEditGame] = useState(null);
  const [tytul, setTytul] = useState("");
  const [liczbaGraczy, setLiczbaGraczy] = useState("");
  const [czasGry, setCzasGry] = useState("");
  const [trudnosc, setTrudnosc] = useState("");
  const [wiekPEGI, setWiekPEGI] = useState("");
  const [opis, setOpis] = useState("");
  const [obraz, setObraz] = useState(null);
  const [status, setStatus] = useState("");

  useEffect(() => {
    fetch("http://localhost/backend/get_games.php")
      .then((res) => res.json())
      .then((data) => setGames(data))
      .catch((err) => console.error("Błąd pobierania gier:", err));
  }, []);

  const handleAddOrEditGame = async (e) => {
    e.preventDefault();
    if (!tytul || !liczbaGraczy || !czasGry || !trudnosc || !wiekPEGI || !opis) {
      setStatus("Wypełnij wszystkie pola!");
      return;
    }

    const formData = new FormData();
    formData.append("tytul", tytul);
    formData.append("liczba_graczy", liczbaGraczy);
    formData.append("czas_gry", czasGry);
    formData.append("trudnosc", trudnosc);
    formData.append("wiek_PEGI", wiekPEGI);
    formData.append("opis", opis);

    if (obraz) {
      formData.append("obraz", obraz);
    }

    const url = editGame
      ? "http://localhost/backend/edit_game.php"
      : "http://localhost/backend/add_game.php";

    if (editGame) {
      formData.append("id", editGame.id);
    }

    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    setStatus(data.message || data.error);

    if (data.message) {
      setEditGame(null);
      setTytul("");
      setLiczbaGraczy("");
      setCzasGry("");
      setTrudnosc("");
      setWiekPEGI("");
      setOpis("");
      setObraz(null);

      fetch("http://localhost/backend/get_games.php")
        .then((res) => res.json())
        .then((data) => setGames(data));
    }
  };

  const handleEditGame = (game) => {
    setEditGame(game);
    setTytul(game.tytul);
    setLiczbaGraczy(game.liczba_graczy);
    setCzasGry(game.czas_gry);
    setTrudnosc(game.trudnosc);
    setWiekPEGI(game.wiek_PEGI);
    setOpis(game.opis || "");
  };

  const handleDeleteGame = async (id) => {
    const response = await fetch("http://localhost/backend/delete_game.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    const data = await response.json();
    setStatus(data.message || data.error);

    fetch("http://localhost/backend/get_games.php")
      .then((res) => res.json())
      .then((data) => setGames(data));
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center">Zarządzanie Grami</h1>
      {status && <p className="alert alert-info text-center">{status}</p>}

      <form onSubmit={handleAddOrEditGame} className="admin-form">
        <h2>{editGame ? "Edytuj Grę" : "Dodaj Nową Grę"}</h2>
        <input type="text" placeholder="Tytuł gry" value={tytul} onChange={(e) => setTytul(e.target.value)} required />
        <input type="text" placeholder="Liczba graczy (np. 2-4)" value={liczbaGraczy} onChange={(e) => setLiczbaGraczy(e.target.value)} required />
        <input type="number" placeholder="Czas gry (w minutach)" value={czasGry} onChange={(e) => setCzasGry(e.target.value)} required />
        <select value={trudnosc} onChange={(e) => setTrudnosc(e.target.value)} required>
          <option value="">Wybierz trudność</option>
          <option value="łatwa">Łatwa</option>
          <option value="średnia">Średnia</option>
          <option value="trudna">Trudna</option>
        </select>
        <input type="number" placeholder="Wiek PEGI" value={wiekPEGI} onChange={(e) => setWiekPEGI(e.target.value)} required />
        <textarea placeholder="Opis gry" value={opis} onChange={(e) => setOpis(e.target.value)} required />
        <input type="file" accept="image/*" onChange={(e) => setObraz(e.target.files[0])} />

        <button type="submit" className="btn btn-primary w-100 mt-2">{editGame ? "Zapisz zmiany" : "Dodaj Grę"}</button>
      </form>

      <h2 className="text-center mt-4">Lista Gier</h2>
      <div className="row">
        {games.map((game) => (
          <div key={game.id} className="col-md-4 mb-4">
            <div className="card h-100">
              <img src={game.obraz_url} alt={game.tytul} className="card-img-top img-fluid" style={{ maxHeight: "200px", objectFit: "cover" }} />
              <div className="card-body">
                <h5 className="card-title">{game.tytul}</h5>
                <p className="card-text"><strong>Gracze:</strong> {game.liczba_graczy}</p>
                <p className="card-text"><strong>Czas gry:</strong> {game.czas_gry} min</p>
                <p className="card-text"><strong>Trudność:</strong> {game.trudnosc}</p>
                <p className="card-text"><strong>Wiek PEGI:</strong> {game.wiek_PEGI}+</p>
                <p className="card-text"><strong>Opis:</strong> {game.opis}</p>
              </div>
              <div className="card-footer text-center">
                <button className="btn btn-warning me-2" onClick={() => handleEditGame(game)}>Edytuj</button>
                <button className="btn btn-danger" onClick={() => handleDeleteGame(game.id)}>Usuń</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ZarzadzanieGry;
