document.addEventListener("DOMContentLoaded", () => {
  const tabListings = document.getElementById("tabListings");
  const tabReviews = document.getElementById("tabReviews");
  const listingsView = document.getElementById("listingsView");
  const reviewsView = document.getElementById("reviewsView");
  const addListingBtn = document.getElementById("addListingBtn");

  function switchTab(tab) {
    if (tab === "listings") {
      listingsView.style.display = "grid";
      reviewsView.style.display = "none";
      tabListings.classList.add("active");
      tabReviews.classList.remove("active");
    } else {
      listingsView.style.display = "none";
      reviewsView.style.display = "flex";
      tabReviews.classList.add("active");
      tabListings.classList.remove("active");
    }
  }

  function updateListingsCount() {
    const remaining = document.querySelectorAll("#listingsView .product-card").length;
    document.getElementById("tabListings").textContent = `الإعلانات النشطة (${remaining})`;
    document.getElementById("activeCountPill").textContent = `الإعلانات النشطة: ${remaining}`;
  }
  // Toggle Profile & Login Dropdown
const userMenuBtn = document.getElementById("userMenuBtn");
const userDropdownMenu = document.getElementById("userDropdownMenu");

if (userMenuBtn && userDropdownMenu) {
  userMenuBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    const isOpen = userDropdownMenu.classList.toggle("open");
    userMenuBtn.setAttribute("aria-expanded", isOpen);
  });

  document.addEventListener("click", (e) => {
    if (!userDropdownMenu.contains(e.target) && !userMenuBtn.contains(e.target)) {
      userDropdownMenu.classList.remove("open");
      userMenuBtn.setAttribute("aria-expanded", "false");
    }
  });
}

  tabListings.addEventListener("click", () => switchTab("listings"));
  tabReviews.addEventListener("click", () => switchTab("reviews"));

  addListingBtn.addEventListener("click", () => {
    alert("فتح نافذة إضافة إعلان جديد");
  });

  document.querySelectorAll(".edit-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const card = e.target.closest(".product-card");
      const title = card.dataset.title;
      alert(`تعديل إعلان: ${title}`);
    });
  });

  document.querySelectorAll(".delete-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      if (confirm("هل أنت متأكد من حذف هذا الإعلان؟")) {
        const card = e.target.closest(".product-card");
        card.remove();
        updateListingsCount();
      }
    });
  });
});