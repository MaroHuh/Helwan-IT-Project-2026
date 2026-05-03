// show password
document.querySelectorAll(".toggle-pw").forEach((btn) => {
  btn.addEventListener("click", () => {
    const inp = document.getElementById(btn.dataset.target);
    const isText = inp.type === "text";
    inp.type = isText ? "password" : "text";
    btn.textContent = isText ? "show" : "hide";
    btn.setAttribute("aria-label", isText ? "Show password" : "Hide password");
  });
});

// success message
function showMsg(text, type = "error") {
  const el = document.getElementById("auth-msg");
  el.textContent = (type === "success" ? "success " : "error ") + text;
  el.className = "auth-message " + type;
  el.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

// Login submit
document.getElementById("login-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const btn = document.getElementById("login-btn");

  // validation
  if (!email || !password) {
    showMsg("Please fill in all fields.");
    return;
  }
  if (!/\S+@\S+\.\S+/.test(email)) {
    showMsg("Please enter a valid email address.");
    return;
  }

  // Simulate login check against registered users
  const users = JSON.parse(localStorage.getItem("ms_users") || "[]");
  const match = users.find((u) => u.email === email && u.password === password);

  if (!match) {
    showMsg("Incorrect email or password. Try again.");
    return;
  }

  // Success
  btn.disabled = true;
  btn.textContent = "Signing in…";

  localStorage.setItem("isLoggedIn", "true");
  localStorage.setItem(
    "ms_current_user",
    JSON.stringify({ name: match.name, email: match.email }),
  );

  showMsg("Login successful! Redirecting…", "success");
  setTimeout(() => {
    window.location.href = "index.html";
  }, 1000);
});
