import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import "./styles/theme.css";
import Login from "./pages/Login";

// Temporary placeholder until each pair pushes its real page
const Placeholder = ({ title }) => (
  <h1 style={{ padding: 24, color: "var(--navy)" }}>{title} (قريبًا)</h1>
);

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/profile" element={<Placeholder title="الملف الشخصي" />} />
        <Route path="*" element={<Placeholder title="هذه الصفحة" />} />
      </Routes>
    </BrowserRouter>
  );
}