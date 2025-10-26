import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import MovieView from "./MovieView";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieView />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;