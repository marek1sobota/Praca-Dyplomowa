import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from './assets/pages/home.jsx';
import { Gry } from './assets/pages/gry.jsx';
import Kalendarz from './assets/pages/kalendarz.jsx';
import { Kontakt } from './assets/pages/kontakt.jsx';
import { Nowosci } from './assets/pages/nowosci.jsx';
import { Spotkania } from './assets/pages/spotkania.jsx';
import { Layout } from './Layout.jsx';
import Rejestracja from "./assets/pages/rejestracja.jsx";
import Login from "./assets/pages/login.jsx"; 
import Profil from "./assets/pages/profil.jsx";
import ZarzadzanieGry from "./assets/pages/ZarzadzanieGry.jsx";
import ZarzadzanieNowosci from "./assets/pages/ZarzadzanieNowosci.jsx";
import ZarzadzanieUzytkownikami from "./assets/pages/zarzadzanieUzytkownikami.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';



function App() {
  return (
    <div className="app-container">
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/kalendarz" element={<Kalendarz />} />
            <Route path="/gry" element={<Gry />} />
            <Route path="/nowosci" element={<Nowosci />} />
            <Route path="/spotkania" element={<Spotkania />} />
            <Route path="/kontakt" element={<Kontakt />} />
            <Route path="/profil" element={<Profil />} />
            <Route path="/zarzadzanieGrami" element={<ZarzadzanieGry />} />
            <Route path="/zarzadzanieNowosciami" element={<ZarzadzanieNowosci />} />
            <Route path="/zarzadzanieUzytkownikami" element={<ZarzadzanieUzytkownikami />} />
          </Route>
          {/* Trasy bez Navbar i Footer */}
          <Route path="/rejestracja" element={<Rejestracja />} />
          <Route path="/login" element={<Login />} /> 
        </Routes>
      </Router>
    </div>
  );
}

export default App;