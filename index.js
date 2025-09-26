document.addEventListener("DOMContentLoaded", () => {
  // ---------- SIGN IN PAGE ----------
  const form = document.getElementById("form");
  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault(); // stop form from submitting

      let isValid = true;

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value.trim();

      const NameError = document.getElementById("NameError");
      const EmailError = document.getElementById("EmailError");
      const PasswordError = document.getElementById("PasswordError");

      // Reset old errors
      NameError.textContent = "";
      EmailError.textContent = "";
      PasswordError.textContent = "";

      // Validate Name
      if (name === "") {
        NameError.textContent = "Name is required.";
        isValid = false;
      } else if (name.length < 3) {
        NameError.textContent = "Name must be at least 3 characters.";
        isValid = false;
      }

      // Validate Email
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (email === "") {
        EmailError.textContent = "Email is required.";
        isValid = false;
      } else if (!emailRegex.test(email)) {
        EmailError.textContent = "Please enter a valid email address.";
        isValid = false;
      }

      // Validate Password
      if (password === "") {
        PasswordError.textContent = "Password is required.";
        isValid = false;
      } else if (password.length < 6) {
        PasswordError.textContent = "Password must be at least 6 characters.";
        isValid = false;
      }

      // Final check
      if (isValid) {
        alert(name + ", you have signed in successfully!");

        // Save login state
        localStorage.setItem("signedIn", "true");
        localStorage.setItem("username", name);

        // Redirect to homepage
        window.location.href = "index.html";
      }
    });
  }

  // ---------- HOMEPAGE ----------
  const signinBtn = document.getElementById("signin-btn");
  const signoutBtn = document.getElementById("signout-btn");

  if (signinBtn && signoutBtn) {
    if (localStorage.getItem("signedIn") === "true") {
      signinBtn.classList.add("d-none");
      signoutBtn.classList.remove("d-none");

      // Optional: show username on signout button
      const username = localStorage.getItem("username");
      if (username) {
        signoutBtn.textContent = `Sign Out (${username})`;
      }
    } else {
      signinBtn.classList.remove("d-none");
      signoutBtn.classList.add("d-none");
    }

    // Handle sign out
    signoutBtn.addEventListener("click", () => {
      localStorage.removeItem("signedIn");
      localStorage.removeItem("username");

      signinBtn.classList.remove("d-none");
      signoutBtn.classList.add("d-none");

      alert("You have signed out!");
    });
  }
});
