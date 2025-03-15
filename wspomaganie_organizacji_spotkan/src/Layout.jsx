import Footer from "./assets/components/Footer";
import NavbarComponent from "./assets/components/Navbar"; // Zmieniona nazwa importu
import { Outlet } from "react-router-dom";
import { Container } from "react-bootstrap";
import './Layout.css'; 

export function Layout() {
  return (
    <>
      <NavbarComponent />
      <Container className="mt-4">
        <Outlet />
      </Container>
      <Footer />
    </>
  );
}
