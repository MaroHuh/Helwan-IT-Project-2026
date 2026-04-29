document.getElementById("navbar").innerHTML = `
<nav class="navbar">
  <h2>MyStore</h2>
  <div>
   <ul>
                    <li><a href="/pages/home.html">Home</a></li>
                    <li><a href="/pages/shop.html">Shop</a></li>
                    <li><a href="/pages/cart.html">Cart</a></li>
                    <li><a href="/pages/login.html">Login</a></li>
                    <li><span id="wishlist-count">❤️0</span></li>
                    <li><button onclick="toggleTheme()">🌙</button></li>
                </ul>
  </div>
</nav>
`;

// Footer
document.getElementById("footer").innerHTML = `
<p style="text-align:center">© 2026 MyStore</p>
`;

// Theme
function toggleTheme() {
  let theme = document.getElementById("theme-link");
  theme.href = theme.href.includes("light")
    ? "../css/dark-theme.css"
    : "../css/light-theme.css";
}