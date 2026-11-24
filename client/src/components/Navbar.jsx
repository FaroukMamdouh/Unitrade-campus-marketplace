import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";

// Pages behind these links are built in Week 2; for now they show a placeholder.
export default function Navbar() {
  return (
    <header className="navbar">
      <Link to="/" className="logo">
        <span aria-hidden="true">🎓</span> UniTrade
      </Link>
      <nav aria-label="التنقل الرئيسي">
        <NavLink to="/">الرئيسية</NavLink>
        <NavLink to="/browse">تصفح</NavLink>
        <NavLink to="/my-listings">إعلاناتي</NavLink>
        <NavLink to="/messages">الرسائل</NavLink>
      </nav>
      <div className="nav-actions">
        <Link to="/login" className="nav-link">تسجيل الدخول</Link>
        <Link to="/register" className="btn-gold">حساب جديد</Link>
      </div>
    </header>
  );
}