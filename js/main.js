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

if (navbar) {
  navbar.innerHTML = `
<nav class="navbar">
  <a href="../pages/index.html" class="logo">
    <img src="../images/products/logoooo.png" alt="logo">
  </a>
  <div>
    <ul>
      <li><a href="../pages/home.html">Home</a></li>
      <li><a href="../pages/shop.html">Shop</a></li>
      <li><a href="../pages/cart.html">Cart</a></li>
      <li><a href="../pages/login.html">Login</a></li>
      <li><a href="../pages/wishlist.html">Your Wishlist</a></li>
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
