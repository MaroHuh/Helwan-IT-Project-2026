const THEME_STORAGE_KEY = "theme";
const LIGHT_THEME = "../css/light-theme.css";
const DARK_THEME = "../css/dark-theme.css";

const navbar = document.getElementById("navbar") || document.getElementById("Navbar");
const footer = document.getElementById("footer");
const themeLink = document.getElementById("theme-link");

function getSavedTheme() {
  return localStorage.getItem(THEME_STORAGE_KEY) === "dark" ? "dark" : "light";
}

function applyTheme(themeName) {
  const nextTheme = themeName === "dark" ? "dark" : "light";

  if (themeLink) {
    themeLink.href = nextTheme === "dark" ? DARK_THEME : LIGHT_THEME;
  }

  localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
  document.documentElement.dataset.theme = nextTheme;
}

function toggleTheme() {
  const currentTheme = getSavedTheme();
  applyTheme(currentTheme === "dark" ? "light" : "dark");
}

applyTheme(getSavedTheme());

function updateWishlistBadge() {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const badge = document.getElementById("wishlist-badge");
    //دالة الcount لل wishlist 
    if (badge) {
        badge.innerText = wishlist.length;
      
        if (wishlist.length === 0) {
            badge.style.display = "none";
        } else {
            badge.style.display = "inline-block";
        }
    }
}

document.addEventListener("DOMContentLoaded", updateWishlistBadge);

if (navbar) {
  navbar.innerHTML = `
<nav class="navbar">
  <h2>MyStore</h2>
  <div>
    <ul>
      <li><a href="../pages/home.html">Home</a></li>
      <li><a href="../pages/shop.html">Shop</a></li>
      <li><a href="../pages/cart.html">Cart</a></li>
      <li><a href="../pages/login.html">Login</a></li>
      <li><a href="../pages/wishlist.html"class="nav-link">Your Wishlist<span id="wishlist-badge" class="badge">0</span></a></li>
      <li><button type="button" onclick="toggleTheme()" aria-label="Toggle theme">Theme</button></li>
    </ul>
  </div>
</nav>
`;
}

if (footer) {
  footer.innerHTML = `
<p style="text-align:center">&copy; 2026 MyStore</p>
`;
}
