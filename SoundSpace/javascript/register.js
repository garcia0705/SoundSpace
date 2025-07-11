document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  const errorMessage = document.getElementById("error-message");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const inputs = form.querySelectorAll("input");
    const fullName = inputs[0].value;
    const email = inputs[1].value;
    const password = inputs[2].value;
    const confirmPassword = inputs[3].value;

    errorMessage.textContent = "";
    if (password !== confirmPassword) {
      errorMessage.textContent = "⚠️ Parolele nu coincid!";
      return;
    }

    localStorage.setItem("userFullName", fullName);
    localStorage.setItem("userEmail", email);
    localStorage.setItem("userPassword", password);

    window.location.href = "login.html";
  });
});
