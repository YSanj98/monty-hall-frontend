import { BrowserRouter, Routes, Route } from "react-router-dom";
import MontyHall from "./components/Game/MontyHall";
import MainPage from "./components/MainPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/game" element={<MontyHall />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
