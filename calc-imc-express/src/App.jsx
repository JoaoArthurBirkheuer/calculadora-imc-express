import { BrowserRouter, Routes, Route } from "react-router-dom";
import TableIMC from "./tableIMC";
import FormIMC from "./formIMC";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TableIMC />} />
        <Route path="/add" element={<FormIMC />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;