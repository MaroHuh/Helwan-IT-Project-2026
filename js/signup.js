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

document.getElementById("password").addEventListener("input", function () {
  const pw = this.value;
  if (!pw) {
    strengthFill.style.width = "0%";
    strengthFill.style.background = "";
    strengthLabel.textContent = "";
    return;
  }

  // confirm password
  document.getElementById("confirm").addEventListener("input", function () {
    const hint = document.getElementById("confirm-hint");
    const pw = document.getElementById("password").value;
    if (!this.value) {
      hint.textContent = "";
      hint.className = "field-hint";
      return;
    }
    if (this.value === pw) {
      hint.textContent = "✓ Passwords match";
      hint.className = "field-hint valid";
    } else {
      hint.textContent = "✗ Passwords don't match";
      hint.className = "field-hint invalid";
    }
  });

  // email check
  document.getElementById("email").addEventListener("blur", function () {
    const hint = document.getElementById("email-hint");
    if (!this.value) {
      hint.textContent = "";
      hint.className = "field-hint";
      return;
    }
    if (/\S+@\S+\.\S+/.test(this.value)) {
      hint.textContent = "";
      hint.className = "field-hint";
    } else {
      hint.textContent = "✗ Enter a valid email";
      hint.className = "field-hint invalid";
    }
  });

  // show message
  function showMsg(text, type = "error") {
    const el = document.getElementById("auth-msg");
    el.textContent = (type === "success" ? "success " : "error ") + text;
    el.className = "auth-message " + type;
    el.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  // signup submit
  document
    .getElementById("signup-form")
    .addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value;
      const confirm = document.getElementById("confirm").value;
      const terms = document.getElementById("terms").checked;
      const btn = document.getElementById("signup-btn");

      if (!name || !email || !password || !confirm) {
        showMsg("Please fill in all fields.");
        return;
      }
      if (!/\S+@\S+\.\S+/.test(email)) {
        showMsg("Please enter a valid email address.");
        return;
      }
      if (password.length < 6) {
        showMsg("Password must be at least 6 characters.");
        return;
      }
      if (password !== confirm) {
        showMsg("Passwords do not match.");
        return;
      }
      if (!terms) {
        showMsg("You must accept the Terms of Service to continue.");
        return;
      }

      // check user
      const users = JSON.parse(localStorage.getItem("ms_users") || "[]");
      if (users.find((u) => u.email === email)) {
        showMsg("An account with this email already exists.");
        return;
      }

      // save user
      users.push({ name, email, password });
      localStorage.setItem("ms_users", JSON.stringify(users));

      // auto login
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("ms_current_user", JSON.stringify({ name, email }));

      btn.disabled = true;
      btn.textContent = "Creating account…";
      showMsg("Account created! Redirecting to your store…", "success");
      setTimeout(() => {
        window.location.href = "index.html";
      }, 1200);
    });
});
