import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const PUBLIC_GOOGLE_CALENDAR_URL = "https://calendar.google.com/calendar/embed?src=aGFyY2Vyc2tpa2x1YnBhZkBnbWFpbC5jb20&ctz=Europe/Warsaw";

function Kalendarz() {
  return (
    <Container className="mt-4">
      <h2 className="text-primary text-center fw-bold">Publiczny Kalendarz Klubu</h2>

      <iframe
        src={PUBLIC_GOOGLE_CALENDAR_URL}
        style={{ border: "0", width: "100%", height: "600px", frameBorder: "0", scrolling: "no" }}
        title="Publiczny Kalendarz Google"
      ></iframe>
    </Container>
  );
}

export default Kalendarz;
