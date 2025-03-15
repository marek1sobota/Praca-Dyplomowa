import "../styles/home.css";

const KlubPic = "/images/Klub.jpg";  // Brak importu!

export function Home() {
  return (
    <div className="home-container">
      <header>
        <h1>Wspomaganie organizacji spotkań klubu gier planszowych</h1>
      </header>
      <div className="home">
        <img className="home-image" src={KlubPic} alt="zdjęcie klubu" />
        <h2 className="home-title">Harcerski Klub Gier Planszowych i Fabularnych PAF</h2>
        <p className="home-text">
          Jest to aplikacja, która pomaga w skuteczniejszej organizacji spotkań klubowiczów oraz pozwala na
          zapoznanie się z dostępnymi grami jak i nadchodzącymi spotkaniami czy turniejami.
        </p>
      </div>
    </div>
  );
}
