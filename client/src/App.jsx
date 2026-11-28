import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import "./styles/theme.css";
import Login from "./pages/Login";
import Profile from "./pages/profile";

function AppContent() {
  const location = useLocation();
  const isProfilePage =
    location.pathname === "/" || location.pathname.toLowerCase() === "/profile";

  return (
    <>
      {!isProfilePage && <Navbar />}
      <Routes>
        <Route path="/" element={<Profile />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}