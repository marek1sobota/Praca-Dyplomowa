import { useEffect, useState } from "react";
import "../styles/home.css"; 

export function Nowosci() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    fetch("http://localhost/backend/get_news.php")
      .then((res) => res.json())
      .then((data) => setNews(data))
      .catch((err) => console.error("Błąd pobierania nowości:", err));
  }, []);

  return (
    <div className="home-container">
      <h2>Nowości</h2>
      {news.length === 0 ? (
        <p>Brak nowości</p>
      ) : (
        news.map((item) => (
          <div key={item.id} className="home">
            <img className="home-image" src={item.image_url} alt={item.title} />
            <h2 className="home-title">{item.title}</h2>
            <p className="home-text">{item.description}</p>
          </div>
        ))
      )}
    </div>
  );
}
