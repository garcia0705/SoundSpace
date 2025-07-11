document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  const errorMessage = document.getElementById("error-message");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const inputs = form.querySelectorAll("input");
    const email = inputs[0].value;
    const password = inputs[1].value;

    const savedEmail = localStorage.getItem("userEmail");
    const savedPassword = localStorage.getItem("userPassword");

    errorMessage.textContent = "";
    if (email === savedEmail && password === savedPassword) {
      window.location.href = "categorii.html";
    } else {
      errorMessage.textContent = "⚠️ Email sau parola incorecta!";
    }
  });
});
