import { BrowserRouter, Routes, Route } from "react-router-dom";
import MontyHall from "./components/Game/MontyHall";
import MainPage from "./components/MainPage";
import MontyHallResults from "./components/Simulation/MontyHallResults";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/game" element={<MontyHall />} />
        <Route path="/simulation" element={<MontyHallResults />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
