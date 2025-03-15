-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 15, 2025 at 03:30 PM
-- Wersja serwera: 10.4.32-MariaDB
-- Wersja PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `boardgames`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `games`
--

CREATE TABLE `games` (
  `id` int(11) NOT NULL,
  `tytul` varchar(100) NOT NULL,
  `liczba_graczy` varchar(20) NOT NULL,
  `czas_gry` int(11) NOT NULL,
  `trudnosc` enum('łatwa','średnia','trudna') NOT NULL,
  `wiek_PEGI` int(11) NOT NULL,
  `obraz_url` varchar(255) NOT NULL,
  `opis` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `games`
--

INSERT INTO `games` (`id`, `tytul`, `liczba_graczy`, `czas_gry`, `trudnosc`, `wiek_PEGI`, `obraz_url`, `opis`) VALUES
(1, 'Catan', '3-4', 60, 'średnia', 10, 'http://localhost/backend/obrazy/1.jpg', 'Klasyczna gra strategiczna o handlu i osadnictwie.'),
(2, 'Carcassonne', '2-5', 45, 'łatwa', 8, 'http://localhost/backend/obrazy/2.png', 'Buduj drogi, miasta i klasztory w tej kafelkowej grze.'),
(3, 'Dixit', '3-6', 30, 'łatwa', 8, 'http://localhost/backend/obrazy/3.jpg', 'Kreatywna gra obrazkowa rozwijająca wyobraźnię.'),
(4, 'Terraformacja Marsa', '1-5', 120, 'trudna', 12, 'http://localhost/backend/obrazy/4.jpg', 'Zarządzaj zasobami i terraformuj Czerwoną Planetę.'),
(5, 'Splendor', '2-4', 30, 'łatwa', 10, 'http://localhost/backend/obrazy/5.jpg', 'Buduj imperium handlowe i kolekcjonuj kamienie szlachetne.'),
(6, '7 Cudów Świata', '3-7', 45, 'średnia', 10, 'http://localhost/backend/obrazy/6.jpg', 'Dynamiczna gra karciana, w której gracze wcielają się w przywódców starożytnych cywilizacji, rywalizując o dominację poprzez rozwój naukowy, militarny i gospodarczy. Każdy uczestnik buduje swoje miasto, konstruuje cud świata i podejmuje strategiczne decyzje, które wpływają na rozwój jego imperium. '),
(7, 'Azul', '2-4', 30, 'łatwa', 8, 'http://localhost/backend/obrazy/7.jpg', 'Twórz piękne mozaiki i zdobywaj punkty za wzory.'),
(8, 'Wsiąść do Pociągu: Europa', '2-5', 60, 'średnia', 8, 'http://localhost/backend/obrazy/8.jpg', 'Podróżuj po Europie i łącz miasta kolejami.'),
(9, 'Gloomhaven', '1-4', 120, 'trudna', 14, 'http://localhost/backend/obrazy/9.jpg', 'Rozbudowana gra RPG w świecie fantasy.'),
(10, 'Everdell', '1-4', 60, 'średnia', 10, 'http://localhost/backend/obrazy/10.jpg', 'Buduj miasto zwierzątek w magicznej dolinie.'),
(12, 'Blood Rage', '2-4', 90, 'trudna', 14, 'http://localhost/backend/obrazy/12.png', 'Strategiczna gra osadzona w świecie wikingów, gdzie walczysz o chwałę przed Ragnarokiem.'),
(13, 'Brass: Birmingham', '2-4', 120, 'trudna', 14, 'http://localhost/backend/obrazy/13.jpg', 'Zaawansowana ekonomiczna gra strategiczna o rozwijaniu przemysłu w XIX-wiecznej Anglii.'),
(14, 'Puerto Rico', '2-5', 90, 'trudna', 12, 'http://localhost/backend/obrazy/14.jpg', 'Klasyczna gra ekonomiczna, w której zarządzasz plantacjami i rozwijasz kolonię.'),
(15, 'Agricola', '1-4', 120, 'trudna', 12, 'http://localhost/backend/obrazy/15.jpg', 'Symulacja życia rolników – zarządzaj gospodarstwem i rozwijaj swoją rodzinę.'),
(16, 'Scythe', '1-5', 115, 'trudna', 14, 'http://localhost/backend/obrazy/16.jpg', 'Epicka gra strategiczna osadzona w alternatywnej Europie lat 20., pełna mechsów i ekonomii.'),
(17, 'Pandemic', '2-4', 45, 'średnia', 10, 'http://localhost/backend/obrazy/17.jpg', 'Kooperacyjna gra, w której gracze walczą z rozprzestrzeniającymi się epidemiami na całym świecie.'),
(18, 'Robinson Crusoe: Przygoda na Przeklętej Wyspie', '1-4', 90, 'trudna', 12, 'http://localhost/backend/obrazy/18.jpg', 'Kooperacyjna gra survivalowa, gdzie starasz się przetrwać na bezludnej wyspie.'),
(19, 'Codenames', '2-8', 20, 'łatwa', 10, 'http://localhost/backend/obrazy/19.jpg', 'Gra dedukcyjna, w której drużyny próbują odgadnąć tajne hasła przy minimalnych wskazówkach.'),
(20, 'Zombicide', '1-6', 120, 'trudna', 14, 'http://localhost/backend/obrazy/20.jpg', 'Kooperacyjna gra o przetrwaniu apokalipsy zombie – zbieraj ekwipunek i walcz o życie.'),
(21, 'Descent: Wędrówki w Mroku', '1-4', 120, 'trudna', 14, 'http://localhost/backend/obrazy/21.jpg', 'Przygoda RPG, w której gracze eksplorują lochy i walczą z potworami.'),
(22, 'Talisman: Magia i Miecz', '2-6', 120, 'trudna', 12, 'http://localhost/backend/obrazy/22.jpg', 'Klasyczna przygodowa gra fantasy, w której przemierzasz świat pełen magicznych wyzwań.'),
(23, 'Mage Knight', '1-4', 180, 'trudna', 14, 'http://localhost/backend/obrazy/23.jpg', 'Zaawansowana gra fantasy, łącząca eksplorację, walkę i rozwój bohatera.'),
(24, 'Star Wars: Rebellion', '2', 180, 'trudna', 14, 'http://localhost/backend/obrazy/24.jpg', 'Strategiczna gra osadzona w uniwersum Gwiezdnych Wojen, odtwarzająca epicką walkę Rebelii z Imperium.'),
(25, 'Small World', '2-5', 60, 'średnia', 8, 'http://localhost/backend/obrazy/25.jpg', 'Gra o kontroli terytorium, w której różne rasy walczą o dominację na zbyt małej mapie.'),
(26, 'Dominion', '2-4', 30, 'średnia', 10, 'http://localhost/backend/obrazy/26.jpg', 'Gra karciana, która zapoczątkowała gatunek deck-buildingu – buduj swoją strategię z kart.'),
(27, 'BANG!', '4-7', 30, 'łatwa', 10, 'http://localhost/backend/obrazy/27.jpg', 'Dynamiczna gra karciana w klimacie Dzikiego Zachodu – kto jest szeryfem, a kto bandytą?'),
(28, 'Tzolkin: Kalendarz Majów', '2-4', 90, 'trudna', 12, 'http://localhost/backend/obrazy/28.jpg', 'Zaawansowana gra strategiczna, w której wykorzystujesz mechanizm obracających się kół zębatych.'),
(29, 'Grajmy!', '2-6', 15, 'łatwa', 6, 'http://localhost/backend/obrazy/29.webp', 'Szybka gra familijna, idealna na każdą okazję.'),
(30, 'Pory Roku', '2-4', 60, 'średnia', 10, 'http://localhost/backend/obrazy/30.jpg', 'Gra karciano-kościana o rywalizacji czarodziejów i zarządzaniu zasobami magicznymi.'),
(31, 'Arnak', '1-4', 90, 'średnia', 12, 'http://localhost/backend/obrazy/31.jpg', 'Eksploracyjna gra przygodowa, w której odkrywasz zaginioną cywilizację i zdobywasz artefakty.'),
(32, 'Twilight Imperium', '3-6', 240, 'trudna', 14, 'http://localhost/backend/obrazy/32.png', 'Epicka strategia 4X, gdzie kosmiczne imperia rywalizują o dominację nad galaktyką.'),
(33, 'Nemesis', '1-5', 120, 'trudna', 14, 'http://localhost/backend/obrazy/33.jpg', 'Horror survivalowy, w którym załoga statku kosmicznego walczy z przerażającymi obcymi.'),
(34, 'Great Western Trail', '2-4', 120, 'trudna', 12, 'http://localhost/backend/obrazy/34.jpg', 'Strategia ekonomiczna o hodowcach bydła przemierzających Dziki Zachód.'),
(35, 'Cytadela', '2-8', 45, 'średnia', 10, 'http://localhost/backend/obrazy/35.webp', 'Gra blefu i strategii, w której budujesz miasto i starasz się przechytrzyć rywali.'),
(36, 'Dolina Królów', '2-4', 60, 'średnia', 10, 'http://localhost/backend/obrazy/36.jpg', 'Strategiczna gra planszowa osadzona w starożytnym Egipcie, gdzie budujesz piramidy.'),
(37, 'The Crew', '3-5', 20, 'łatwa', 8, 'http://localhost/backend/obrazy/37.jpg', 'Kooperacyjna gra karciana oparta na mechanice lew, w której drużyna wspólnie realizuje misje.'),
(38, 'Splendor: Miasta', '2-4', 30, 'łatwa', 10, 'http://localhost/backend/obrazy/38.jpg', 'Rozszerzenie do Splendoru, które dodaje nowe cele i strategie.'),
(39, 'Gizmos', '2-4', 45, 'średnia', 10, 'http://localhost/backend/obrazy/39.jpg', 'Dynamiczna gra o wynalazkach, w której wykorzystujesz reakcje łańcuchowe, aby budować najlepsze maszyny.'),
(40, 'Obłędny Rycerz', '2-4', 60, 'średnia', 12, 'http://localhost/backend/obrazy/40.jpg', 'Ekscentryczna gra przygodowa pełna humoru i niespodzianek.'),
(41, 'Kingdomino', '2-4', 15, 'łatwa', 8, 'http://localhost/backend/obrazy/41.jpg', 'Strategiczna gra kafelkowa, w której budujesz swoje królestwo, dopasowując tereny i zdobywając punkty.'),
(42, 'Zombicide: Czarna Plaga', '1-6', 120, 'trudna', 14, 'http://localhost/backend/obrazy/42.png', 'Kooperacyjna gra akcji osadzona w świecie fantasy, w którym walczysz z hordami zombie.'),
(43, 'Aeons End', '1-4', 60, 'średnia', 12, 'http://localhost/backend/obrazy/43.webp', 'Dynamiczna gra deck-buildingowa, w której magowie bronią miasta przed potworami.'),
(44, 'Lisboa', '2-4', 120, 'trudna', 14, 'http://localhost/backend/obrazy/44.png', 'Zaawansowana gra ekonomiczna, w której odbudowujesz Lizbonę po wielkim trzęsieniu ziemi.'),
(45, 'Clank!', '2-4', 45, 'średnia', 10, 'http://localhost/backend/obrazy/45.png', 'Ekscytująca gra przygodowa, w której gracze próbują ukraść skarby i uciec przed smokiem.'),
(46, 'Kroniki Zbrodni', '1-4', 60, 'średnia', 12, 'http://localhost/backend/obrazy/46.jpg', 'Detektywistyczna gra narracyjna, w której rozwiązujesz zagadki kryminalne za pomocą aplikacji mobilnej.'),
(47, 'Rising Sun', '3-5', 120, 'trudna', 14, 'http://localhost/backend/obrazy/47.jpg', 'Epicka gra strategiczna osadzona w feudalnej Japonii, gdzie polityka i wojna idą w parze.'),
(48, 'Patchwork', '2', 30, 'łatwa', 8, 'http://localhost/backend/obrazy/48.webp', 'Taktyczna gra logiczna dla dwóch graczy, w której układasz patchworkowe koce.'),
(49, 'Barrage', '2-4', 120, 'trudna', 14, 'http://localhost/backend/obrazy/49.jpg', 'Strategiczna gra ekonomiczna o zarządzaniu energią wodną i budowie tam.'),
(50, 'Wielka Pętla', '2-4', 40, 'średnia', 8, 'http://localhost/backend/obrazy/50.jpg', 'Gra wyścigowa, w której zarządzasz drużyną kolarzy, aby wygrać legendarny wyścig.'),
(51, 'Brzdęk!', '2-4', 45, 'średnia', 10, 'http://localhost/backend/obrazy/51.jpg', 'Deck-buildingowa gra przygodowa, w której starasz się zdobyć skarb i uciec z lochu.'),
(52, 'Sheriff z Nottingham', '3-5', 60, 'średnia', 10, 'http://localhost/backend/obrazy/52.jpg', 'Gra blefu i negocjacji, w której wcielasz się w kupca próbującego przemycić towary.'),
(53, 'Królestwo w Budowie', '2-4', 45, 'średnia', 8, 'http://localhost/backend/obrazy/53.jpg', 'Strategiczna gra planszowa, w której rozbudowujesz swoje królestwo na modularnej mapie.'),
(54, 'T.I.M.E Stories', '2-4', 90, 'średnia', 12, 'http://localhost/backend/obrazy/54.jpg', 'Narracyjna gra przygodowa, w której podróżujesz w czasie i rozwiązujesz zagadki.'),
(55, 'Nemesis Lockdown', '1-5', 120, 'trudna', 14, 'http://localhost/backend/obrazy/55.webp', 'Kosmiczny horror survivalowy, w którym walczysz o życie w tajnym laboratorium.'),
(56, 'Duna: Imperium', '1-4', 120, 'trudna', 14, 'http://localhost/backend/obrazy/56.jpg', 'Strategiczna gra deck-buildingowa osadzona w świecie Diuny.'),
(57, 'Wiedźmin: Stary Świat', '1-5', 120, 'średnia', 14, 'http://localhost/backend/obrazy/57.jpg', 'Gra planszowa osadzona w uniwersum Wiedźmina, w której wcielasz się w wiedźminów.'),
(58, 'Bitoku', '1-4', 120, 'trudna', 12, 'http://localhost/backend/obrazy/58.jpg', 'Pięknie ilustrowana gra strategiczna inspirowana japońską mitologią.'),
(59, 'Anachrony', '1-4', 120, 'trudna', 14, 'http://localhost/backend/obrazy/59.webp', 'Zaawansowana gra strategiczna, w której zarządzasz zasobami i podróżujesz w czasie.'),
(60, 'Res Arcana', '2-4', 30, 'średnia', 10, 'http://localhost/backend/obrazy/60.jpg', 'Szybka gra karciana, w której rywalizują potężni magowie.'),
(61, 'Pax Pamir', '1-5', 90, 'trudna', 14, 'http://localhost/backend/obrazy/61.jpg', 'Historyczna gra polityczna o rywalizacji plemion w XIX-wiecznym Afganistanie.'),
(62, 'Projekt Gaja', '1-4', 150, 'trudna', 14, 'http://localhost/backend/obrazy/62.jpg', 'Zaawansowana gra strategiczna w kosmicznym uniwersum Terra Mystica.'),
(63, 'Na Skrzydłach', '1-5', 60, 'średnia', 10, 'http://localhost/backend/obrazy/63.jpg', 'Przepięknie zilustrowana gra ekonomiczna o ptakach i zarządzaniu rezerwatem.'),
(64, 'Santorini', '2-3', 20, 'łatwa', 8, 'http://localhost/backend/obrazy/64.jpg', 'Prosta, ale głęboka strategicznie gra abstrakcyjna inspirowana architekturą Grecji.'),
(65, 'Camel Up', '3-8', 30, 'łatwa', 8, 'http://localhost/backend/obrazy/65.jpg', 'Zwrotna i ekscytująca gra o wyścigach wielbłądów na pustyni.'),
(66, 'Skull', '3-6', 20, 'łatwa', 10, 'http://localhost/backend/obrazy/66.jpg', 'Gra blefu i ryzyka, w której starasz się odkryć symbole przeciwników.'),
(67, 'Suburbia', '1-4', 90, 'średnia', 12, 'http://localhost/backend/obrazy/67.jpg', 'Gra ekonomiczna o budowie i zarządzaniu miastem.'),
(68, 'Flick’em Up', '2-10', 45, 'łatwa', 8, 'http://localhost/backend/obrazy/68.jpg', 'Zręcznościowa gra planszowa osadzona na Dzikim Zachodzie, w której sterujesz kowbojami.'),
(69, 'Cthulhu: Death May Die', '1-5', 120, 'trudna', 14, 'http://localhost/backend/obrazy/69.jpg', 'Horror survivalowy osadzony w świecie Lovecrafta, gdzie walczysz z Przedwiecznymi.'),
(70, 'Aeon’s End: Legacy', '1-4', 60, 'średnia', 12, 'http://localhost/backend/obrazy/70.jpg', 'Kooperacyjna gra deck-buildingowa z mechaniką permanentnych zmian w kampanii.'),
(71, 'Yokohama', '2-4', 90, 'trudna', 12, 'http://localhost/backend/obrazy/71.jpg', 'Gra ekonomiczna o handlu i ekspansji w XIX-wiecznej Japonii.'),
(72, 'Teotihuacan', '1-4', 120, 'trudna', 14, 'http://localhost/backend/obrazy/72.jpg', 'Zaawansowana gra strategiczna o budowie piramid i zarządzaniu cywilizacją Azteków.'),
(73, 'Glen More II: Chronicles', '2-4', 90, 'średnia', 12, 'http://localhost/backend/obrazy/73.png', 'Gra strategiczna o rozwijaniu szkockiego klanu na przestrzeni wieków.'),
(74, 'Eldritch Horror', '1-8', 180, 'trudna', 14, 'http://localhost/backend/obrazy/74.jpg', 'Kooperacyjna gra przygodowa, w której podróżujesz po świecie, walcząc z kosmicznym złem.'),
(75, 'Trismegistus', '1-4', 120, 'trudna', 14, 'http://localhost/backend/obrazy/75.webp', 'Gra strategiczna o alchemii, w której starasz się stworzyć legendarny kamień filozoficzny.'),
(76, 'Tapestry', '1-5', 90, 'średnia', 12, 'http://localhost/backend/obrazy/76.jpg', 'Strategiczna gra cywilizacyjna, w której rozwijasz swoją kulturę od początków aż po przyszłość.'),
(77, 'Red Cathedral', '1-4', 60, 'średnia', 10, 'http://localhost/backend/obrazy/77.jpg', 'Gra ekonomiczna o budowie katedry, w której zarządzasz zasobami i robotnikami.'),
(78, 'Wodny Szlak', '1-4', 20, 'łatwa', 8, 'http://localhost/backend/obrazy/78.jpg', 'Gra logiczna, w której budujesz system kanałów wodnych, łącząc je w sprawny sposób.'),
(79, 'Górą i Dołem', '1-4', 60, 'średnia', 10, 'http://localhost/backend/obrazy/79.jpg', 'Narracyjna gra przygodowa, w której eksplorujesz podziemia i rozwijasz osadę.'),
(80, 'Roll for the Galaxy', '2-5', 45, 'średnia', 12, 'http://localhost/backend/obrazy/80.jpg', 'Gra kościana, w której budujesz imperium kosmiczne, eksplorując i handlując.'),
(81, 'Kemet', '2-5', 90, 'trudna', 14, 'http://localhost/backend/obrazy/81.jpg', 'Gra bitewna osadzona w mitologicznym Egipcie, pełna bogów i epickich starć.'),
(82, 'Orlean', '2-5', 90, 'średnia', 12, 'http://localhost/backend/obrazy/82.jpg', 'Strategiczna gra o rozwoju średniowiecznego miasta, wykorzystująca mechanikę budowania worka.'),
(83, 'Imperial Settlers', '1-4', 60, 'średnia', 10, 'http://localhost/backend/obrazy/83.jpg', 'Gra cywilizacyjna, w której rozwijasz swoją frakcję i zarządzasz zasobami.'),
(84, 'Tainted Grail', '1-4', 120, 'trudna', 14, 'http://localhost/backend/obrazy/84.jpg', 'Narracyjna gra przygodowa osadzona w mrocznym świecie arturiańskich legend.'),
(85, 'Cyclades', '2-5', 90, 'trudna', 12, 'http://localhost/backend/obrazy/85.png', 'Strategiczna gra mitologiczna, w której kontrolujesz greckie wyspy i wzywasz bogów na pomoc.'),
(86, 'King of Tokyo', '2-6', 30, 'łatwa', 8, 'http://localhost/backend/obrazy/86.jpg', 'Dynamiczna gra o walkach gigantycznych potworów w Tokio.'),
(87, 'Endless Winter: Paleoamericans', '1-4', 90, 'trudna', 12, 'http://localhost/backend/obrazy/87.webp', 'Gra cywilizacyjna osadzona w epoce kamienia, łącząca deck-building i area control.'),
(88, 'Praga Caput Regni', '1-4', 90, 'trudna', 12, 'http://localhost/backend/obrazy/88.jpg', 'Zaawansowana gra ekonomiczna o budowie średniowiecznej Pragi.'),
(89, 'Nidavellir', '2-5', 45, 'średnia', 10, 'http://localhost/backend/obrazy/89.jpg', 'Gra licytacyjna, w której rekrutujesz krasnoludy, by stworzyć potężną armię.'),
(90, 'Kaskadia', '1-4', 30, 'łatwa', 8, 'http://localhost/backend/obrazy/90.jpg', 'Gra kafelkowa o budowie ekosystemu i zarządzaniu dziką przyrodą.'),
(91, 'Królowie Szkocji', '2-5', 45, 'średnia', 10, 'http://localhost/backend/obrazy/91.jpg', 'Gra strategiczna, w której zarządzasz szkockim klanem i walczysz o wpływy.'),
(92, 'Belfort', '2-5', 120, 'trudna', 12, 'http://localhost/backend/obrazy/92.jpg', 'Strategiczna gra o budowie miasta, gdzie rywalizujesz o kontrolę nad dzielnicami.'),
(93, 'Mombasa', '2-4', 120, 'trudna', 12, 'http://localhost/backend/obrazy/93.jpg', 'Ekonomiczna gra o handlu i ekspansji firm w Afryce.'),
(94, 'Caverna', '1-7', 120, 'trudna', 12, 'http://localhost/backend/obrazy/94.jpg', 'Zaawansowana gra o zarządzaniu farmą krasnoludów i eksploracji podziemi.'),
(95, 'Grand Austria Hotel', '2-4', 90, 'średnia', 12, 'http://localhost/backend/obrazy/95.jpg', 'Gra ekonomiczna o zarządzaniu luksusowym hotelem i obsłudze gości.'),
(96, 'Trickerion', '2-4', 120, 'trudna', 14, 'http://localhost/backend/obrazy/96.webp', 'Gra o iluzjonistach rywalizujących o miano największego magika.'),
(97, 'Obsession', '1-4', 90, 'średnia', 12, 'http://localhost/backend/obrazy/97.jpg', 'Gra o arystokracji i prowadzeniu posiadłości w epoce wiktoriańskiej.'),
(98, 'Lords of Waterdeep', '2-5', 90, 'średnia', 12, 'http://localhost/backend/obrazy/98.webp', 'Strategiczna gra osadzona w świecie Dungeons & Dragons, gdzie zarządzasz tajnymi misjami.'),
(99, 'Boonlake', '1-4', 120, 'trudna', 14, 'http://localhost/backend/obrazy/99.jpg', 'Gra ekonomiczna o rozwijaniu osady nad jeziorem i zarządzaniu zasobami.'),
(101, 'Oathsworn: Into the Deepwood', '1-4', 120, 'trudna', 14, 'http://localhost/backend/obrazy/101.webp', 'Narracyjna gra kooperacyjna z epickimi walkami i głęboką fabułą.'),
(102, 'Hero Realms', '2-4', 45, 'średnia', 12, 'http://localhost/backend/obrazy/102.webp', 'Szybka gra karciana w stylu deck-buildingu, w której walczysz przeciwko przeciwnikom.'),
(103, 'Magic: the Gathering ', '1-8', 90, 'trudna', 13, 'http://localhost/backend/obrazy/103.jpg', 'Klasyczna kolekcjonerska gra karciana, w której rywalizują potężni magowie.'),
(106, 'Sabotarzysta', '2-8', 30, 'łatwa', 8, 'http://localhost/backend/obrazy/67c9b407af809_rebel-gra-karciana-sabotazysta-box-3d.jpg', 'Gra karciana o kopaczach tuneli i sabotażystach, którzy próbują zniszczyć wysiłki innych.'),
(107, 'Eksplodujące Kotki', '2-5', 15, 'łatwa', 12, 'http://localhost/backend/obrazy/67d0083919455_rebel-gra-imprezowa-eksplodujace-kotki-box3d-2024.png', 'Zabawna gra karciana o unikaniu eksplodujących kotków i sabotowaniu przeciwników.');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `meetings`
--

CREATE TABLE `meetings` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `date` date NOT NULL,
  `time` time NOT NULL,
  `location` varchar(255) NOT NULL,
  `organizer_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `meetings`
--

INSERT INTO `meetings` (`id`, `title`, `description`, `date`, `time`, `location`, `organizer_id`, `created_at`) VALUES
(1, 'Turniej Wiedźmie Eliksiry', 'Turniej w Wiedźmie Eliksiry', '2025-03-28', '18:00:00', 'Myszków Rolnicza 17a', 1, '2025-03-06 16:29:31'),
(3, 'Gramy sesję w D&D', 'Zaczynamy nową kampanie w świecie D&D.', '2025-04-17', '18:00:00', 'Chorzów MDK', 10, '2025-03-06 16:54:28'),
(5, '5 kompanów do Talismana', 'Poszukuje 5 graczy do talismana z 4 dodatkami. Zapowiada się epicka przygoda.', '2025-04-26', '16:40:00', 'Wiejska 1', 14, '2025-03-11 21:40:04');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `news`
--

CREATE TABLE `news` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `image_url` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `news`
--

INSERT INTO `news` (`id`, `title`, `description`, `image_url`) VALUES
(1, 'Nowe logo klubu', 'Cześć przychodzimy do was z nowym logiem klubu. Dajcie nam znać co o nim myślicie!', 'http://localhost/backend/obrazy/67c9b9fc547f9_Klub.jpg'),
(2, 'Turniej w Wiedźmie Eliksiry ', 'Informujemy że dnia 28.03.2025 (piątek) o godzinie 17:00 odbędzie się turniej w MDK w Myszkowie. Zachęcamy do przybycia i wzięcia udziału. Do zobaczenia!', 'http://localhost/backend/obrazy/67c9ba8fe7fc8_news1.jpg');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('user','admin') DEFAULT 'user',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `badges` set('tłumacz gier','organizator spotkań','członek klubu') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `role`, `created_at`, `updated_at`, `badges`) VALUES
(1, 'admin', 'lolsobota17@gmail.com', '$2y$10$sbQEIST.U5./y2WeoGsPSu/CujfyKCMpccbnEbgpOpXhkx68PGk/2', 'admin', '2025-03-03 14:30:10', '2025-03-06 15:42:51', 'tłumacz gier,organizator spotkań,członek klubu'),
(4, 'Marek', 'lolsobota18@gmail.com', '$2y$10$2PVEWPItUHaL/T5ZPrqxKu/R.6kn0WdU/LGJvlzg9WgJzQ2djlKmS', 'admin', '2025-03-03 16:15:11', '2025-03-13 17:52:34', 'tłumacz gier,członek klubu'),
(5, 'Janek', 'janek23@gmail.com', '$2y$10$p6g/qumU4Q8J9Zc./hE1ye4RsE/Qqgq3uCTkP94u73vTn1bbcw6te', 'user', '2025-03-03 16:17:13', '2025-03-03 16:17:13', NULL),
(6, 'bonzur', 'bonzur123456@gmail.com', '$2y$10$GtZeay/Z1i3omR/p489KIOhW4oymDzXm.lO49JykrExbEYYmc7sQm', 'user', '2025-03-04 09:24:25', '2025-03-04 09:24:25', NULL),
(7, 'Michał', '12345@gmail.com', '$2y$10$UX/VNfmmecN2w8CaJvXameW0gn9d7WZv0KCXxc.9fM0qi12eQpxsO', 'user', '2025-03-04 09:26:11', '2025-03-04 09:26:11', NULL),
(8, 'marcin', 'g@gmail.com', '$2y$10$Q8Pcxtvvh8rWDou88Spmn.E/0ny84k9thuye.m.Pt.WrirgMYI2q6', 'user', '2025-03-04 10:36:25', '2025-03-04 10:36:25', NULL),
(9, 'Kubas', '12345657@gmail.com', '$2y$10$mSyLnsSmi06CYcdzV3gMx.BtBtW9n9hkmhrx3Ve44C9Nolmb1g22m', 'user', '2025-03-04 15:30:53', '2025-03-13 17:53:15', ''),
(10, 'john', 'korwok@gmail.com', '$2y$10$EtctV9QG4l59iG15VeTw2uhFvYaGpBSsXC9ovBz0rC5g1mfHUavCu', 'user', '2025-03-06 15:46:04', '2025-03-06 15:46:04', NULL),
(14, 'qwerty', 'qwerty@gmail.com', '$2y$10$V9tTuaiVXfMg3y5L12keT.U9M6H14lDlfUSK7C.O5XFAXft93GZvy', 'user', '2025-03-11 21:34:50', '2025-03-13 17:52:48', 'tłumacz gier');

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `games`
--
ALTER TABLE `games`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `meetings`
--
ALTER TABLE `meetings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `organizer_id` (`organizer_id`);

--
-- Indeksy dla tabeli `news`
--
ALTER TABLE `news`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `games`
--
ALTER TABLE `games`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=110;

--
-- AUTO_INCREMENT for table `meetings`
--
ALTER TABLE `meetings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `news`
--
ALTER TABLE `news`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `meetings`
--
ALTER TABLE `meetings`
  ADD CONSTRAINT `meetings_ibfk_1` FOREIGN KEY (`organizer_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
