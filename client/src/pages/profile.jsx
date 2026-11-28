import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

const INITIAL_PRODUCTS = [
  {
    id: 1,
    title: "لاب توب MacBook Pro",
    price: "18,500 EGP",
    condition: "حالة ممتازة",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&q=80"
  },
  {
    id: 2,
    title: "كتاب Calculus 9th",
    price: "450 EGP",
    condition: "حالة جيدة",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&q=80"
  },
  {
    id: 3,
    title: "آلة حاسبة Casio FX-991",
    price: "350 EGP",
    condition: "مستعمل",
    image: "https://images.unsplash.com/photo-1587145820266-a5951ee6f620?w=500&q=80"
  },
  {
    id: 4,
    title: "مكتب مذاكرة صغير",
    price: "600 EGP",
    condition: "حالة جيدة",
    image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=500&q=80"
  }
];

const DEFAULT_PROFILE = {
  fullName: "Ahmed H.",
  email: "ahmed.h@university.edu.eg",
  faculty: "كلية الهندسة - جامعة القاهرة",
  memberSince: "2021",
  rating: "4.9",
  reviewsCount: 24,
  salesCount: 18,
  avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&q=80"
};

export default function Profile() {
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const [activeTab, setActiveTab] = useState("listings");
  const [searchQuery, setSearchQuery] = useState("");
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("unitrade_user");
    if (!savedUser) return DEFAULT_PROFILE;
    try {
      return { ...DEFAULT_PROFILE, ...JSON.parse(savedUser) };
    } catch {
      return DEFAULT_PROFILE;
    }
  });

  const [editForm, setEditForm] = useState({
    fullName: user.fullName,
    faculty: user.faculty
  });

  const [products, setProducts] = useState(() => {
    const savedProducts = localStorage.getItem("unitrade_products");
    if (!savedProducts) return INITIAL_PRODUCTS;
    try {
      return JSON.parse(savedProducts);
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  useEffect(() => {
    localStorage.setItem("unitrade_products", JSON.stringify(products));
  }, [products]);

  // إغلاق القائمة المنسدلة تلقائياً عند الضغط في أي مكان خارجها
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("unitrade_user");
    setIsMenuOpen(false);
    navigate("/Login");
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    if (!editForm.fullName.trim() || !editForm.faculty.trim()) return;
    const updatedUser = {
      ...user,
      fullName: editForm.fullName.trim(),
      faculty: editForm.faculty.trim()
    };
    setUser(updatedUser);
    localStorage.setItem("unitrade_user", JSON.stringify(updatedUser));
    setIsEditingProfile(false);
  };

  const handleAddProduct = () => {
    const title = window.prompt("أدخل اسم المنتج الجديد:");
    if (!title || !title.trim()) return;
    const price = window.prompt("أدخل السعر (مثال: 750 EGP):", "750 EGP") || "750 EGP";
    const condition = window.prompt("أدخل حالة المنتج:", "حالة جيدة") || "حالة جيدة";

    const newProduct = {
      id: Date.now(),
      title: title.trim(),
      price: price.trim(),
      condition: condition.trim(),
      image: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=500&q=80"
    };

    setProducts((prev) => [newProduct, ...prev]);
    setActiveTab("listings");
  };

  const handleEditProduct = (id) => {
    const target = products.find((p) => p.id === id);
    if (!target) return;
    const newTitle = window.prompt("تعديل اسم المنتج:", target.title);
    if (!newTitle || !newTitle.trim()) return;
    const newPrice = window.prompt("تعديل السعر:", target.price) || target.price;

    setProducts((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, title: newTitle.trim(), price: newPrice.trim() } : item
      )
    );
  };

  const handleDeleteProduct = (id) => {
    setProducts((prev) => prev.filter((item) => item.id !== id));
  };

  const filteredProducts = products.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.trim().toLowerCase())
  );

  return (
    <div className="dashboard-wrapper" dir="rtl">
      {/* الشريط العلوي الكحلي */}
      <header className="ut-navbar">
        <div className="ut-nav-right">
          <Link to="/" className="ut-brand">
            <span className="ut-brand-icon">🎓</span>
            <span>UniTrade</span>
          </Link>
          <nav className="ut-nav-links">
            <Link to="/">الرئيسية</Link>
            <a
              href="#listings"
              onClick={(e) => {
                e.preventDefault();
                setActiveTab("listings");
              }}
            >
              تصفح الفئات
            </a>
            <Link to="/profile">رسائلي</Link>
          </nav>
        </div>

        <div className="ut-nav-left">
          <div className="ut-search-box">
            <input
              type="text"
              placeholder="ابحث عن كتب، أدوات..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <span className="ut-search-icon">🔍</span>
          </div>

          <button type="button" className="ut-icon-btn" title="الإشعارات">
            🔔
          </button>

          {/* صورة البروفايل المصغرة + السهم + القائمة المنسدلة */}
          <div className="ut-profile-dropdown-wrap" ref={dropdownRef}>
            <div className="ut-profile-trigger">
              <Link to="/profile" className="ut-mini-avatar" title="الملف الشخصي">
                <img src={user.avatar} alt={user.fullName} />
              </Link>
              <button
                type="button"
                className={`ut-arrow-login-btn ${isMenuOpen ? "open" : ""}`}
                onClick={() => setIsMenuOpen((prev) => !prev)}
                aria-expanded={isMenuOpen}
                aria-label="قائمة الحساب"
              >
                ⌄
              </button>
            </div>

            {isMenuOpen && (
              <div className="ut-dropdown-menu">
                <div className="ut-dropdown-header">
                  <strong>{user.fullName}</strong>
                  <span>{user.email}</span>
                </div>
                <Link
                  to="/profile"
                  className="ut-dropdown-item"
                  onClick={() => setIsMenuOpen(false)}
                >
                  👤 الملف الشخصي
                </Link>
                <Link
                  to="/Login"
                  className="ut-dropdown-item"
                  onClick={() => setIsMenuOpen(false)}
                >
                  🔑 تسجيل الدخول (Login)
                </Link>
                <Link
                  to="/Register"
                  className="ut-dropdown-item"
                  onClick={() => setIsMenuOpen(false)}
                >
                  📝 إنشاء حساب جديد
                </Link>
                <hr className="ut-dropdown-divider" />
                <button
                  type="button"
                  className="ut-dropdown-item ut-dropdown-logout"
                  onClick={handleLogout}
                >
                  🚪 تسجيل الخروج
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* المحتوى الرئيسي */}
      <main className="ut-main-bg">
        <div className="ut-container">
          <section className="ut-profile-banner">
            <div className="ut-profile-info">
              <img src={user.avatar} alt={user.fullName} className="ut-avatar-lg" />
              <div className="ut-user-details">
                {!isEditingProfile ? (
                  <>
                    <div className="ut-name-row">
                      <h2>{user.fullName}</h2>
                      <span className="ut-badge-verified">✔ طالب موثق</span>
                      <span className="ut-badge-seller">🏅 بائع موثق</span>
                    </div>
                    <p className="ut-faculty">{user.faculty}</p>
                    <p className="ut-since">عضو منذ {user.memberSince}</p>
                    <div className="ut-rating-row">
                      <span className="ut-rating-num">{user.rating}</span>
                      <span className="ut-stars">★★★★★</span>
                      <span className="ut-reviews-count">({user.reviewsCount} تقييم)</span>
                    </div>
                    <button
                      type="button"
                      className="ut-edit-profile-btn"
                      onClick={() => {
                        setEditForm({ fullName: user.fullName, faculty: user.faculty });
                        setIsEditingProfile(true);
                      }}
                    >
                      تعديل بيانات الحساب
                    </button>
                  </>
                ) : (
                  <form className="ut-inline-edit-form" onSubmit={handleSaveProfile}>
                    <input
                      type="text"
                      value={editForm.fullName}
                      onChange={(e) => setEditForm({ ...editForm, fullName: e.target.value })}
                      placeholder="الاسم الكامل"
                    />
                    <input
                      type="text"
                      value={editForm.faculty}
                      onChange={(e) => setEditForm({ ...editForm, faculty: e.target.value })}
                      placeholder="الكلية والجامعة"
                    />
                    <div className="ut-inline-edit-actions">
                      <button type="submit" className="ut-btn-edit">حفظ</button>
                      <button
                        type="button"
                        className="ut-btn-delete"
                        onClick={() => setIsEditingProfile(false)}
                      >
                        إلغاء
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>

            <div className="ut-profile-stats">
              <div className="ut-stats-pills">
                <div className="ut-stat-pill">الإعلانات النشطة: {products.length}</div>
                <div className="ut-stat-pill">المبيعات: {user.salesCount}</div>
                <div className="ut-stat-pill">تقييم البائع: {user.rating}</div>
              </div>
              <button type="button" className="ut-add-btn" onClick={handleAddProduct}>
                إضافة إعلان جديد
              </button>
            </div>
          </section>

          <section className="ut-content-card" id="listings">
            <div className="ut-tabs-bar">
              <button
                type="button"
                className={`ut-tab ${activeTab === "reviews" ? "active" : ""}`}
                onClick={() => setActiveTab("reviews")}
              >
                آراء الطلاب والمراجعات ({user.reviewsCount})
              </button>
              <button
                type="button"
                className={`ut-tab ${activeTab === "listings" ? "active" : ""}`}
                onClick={() => setActiveTab("listings")}
              >
                الإعلانات النشطة ({filteredProducts.length})
              </button>
            </div>

            {activeTab === "listings" ? (
              <div className="ut-products-grid">
                {filteredProducts.map((item) => (
                  <article key={item.id} className="ut-product-card">
                    <div className="ut-product-img-wrap">
                      <img src={item.image} alt={item.title} />
                    </div>
                    <h3 className="ut-product-title">{item.title}</h3>
                    <p className="ut-product-price">{item.price}</p>
                    <p className="ut-product-condition">{item.condition}</p>
                    <div className="ut-product-actions">
                      <button
                        type="button"
                        className="ut-btn-edit"
                        onClick={() => handleEditProduct(item.id)}
                      >
                        تعديل
                      </button>
                      <button
                        type="button"
                        className="ut-btn-delete"
                        onClick={() => handleDeleteProduct(item.id)}
                      >
                        حذف
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="ut-reviews-box">
                <p><strong>محمود حسن:</strong> تعامل سريع والكتاب بحالة ممتازة جداً.</p>
                <p><strong>سارة علي:</strong> آلة حاسبة أصلية وبسعر مناسب للطلاب.</p>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}