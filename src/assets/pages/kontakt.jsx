import { FaFacebook } from "react-icons/fa"; 
import "../styles/kontakt.css"; 
const KlubPic = "/images/Klub.jpg";  

export function Kontakt() {
  return (
    <div className="kontakt-container">
      <h1>Kontakt</h1>
      <p className="kontakt-text">
        <FaFacebook className="facebook-icon" />
        Zajrzyj na naszą grupę na Facebooku{" "}
        <a 
          href="https://www.facebook.com/groups/2727357584154648" 
          target="_blank" 
          rel="noopener noreferrer"
          className="kontakt-link">
          Facebook
        </a>
      </p>

      {/* Sekcja ze zdjęciem klubu */}
      <div className="kontakt-box">
        <img className="kontakt-image" src={KlubPic} alt="zdjęcie klubu" />
        <h2 className="kontakt-title">Harcerski Klub Gier Planszowych i Fabularnych PAF</h2>
      </div>
    </div>
  );
}
