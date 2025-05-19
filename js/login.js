document.addEventListener("DOMContentLoaded", function () {
  const loginFormContainer = document.getElementById("loginFormContainer");
  const weatherContainer = document.getElementById("weatherContainer");
  const loadingIndicator = document.getElementById("loadingIndicator");
  const errorDiv = document.getElementById("errorDiv");
  let token = localStorage.getItem("token");

  function showLoginPage() {
    weatherContainer.style.display = "none";
    loginFormContainer.style.display = "block";
    loadingIndicator.style.display = "none";
  }

  function showWeatherPage() {
    loginFormContainer.style.display = "none";
    weatherContainer.style.display = "block";
    loadingIndicator.style.display = "none";
  }

  function attachLoginFormListener() {
    const loginForm = document.getElementById("loginForm");

    loginForm.addEventListener("submit", function (event) {
      event.preventDefault();

      loginFormContainer.style.display = "none";

      loadingIndicator.style.display = "block";

      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;
      const apiKey = "reqres-free-v1";

      fetch("https://reqres.in/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
        },
        body: JSON.stringify({
          email: username,
          password: password,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Неверный логин или пароль");
          }
          return response.json();
        })
        .then((data) => {
          loadingIndicator.style.display = "none";
          if (data.token) {
            token = data.token;
            localStorage.setItem("token", data.token);
            console.log("Вход выполнен успешно, токен сохранен");
            errorDiv.textContent = "";
            showWeatherPage();
          } else {
            errorDiv.textContent =
              "Ошибка при входе. Проверьте логин и пароль.";
            console.log("Ошибка при входе", data);
            showLoginPage();
          }
        })
        .catch((error) => {
          loadingIndicator.style.display = "none";
          errorDiv.textContent = "Произошла ошибка: " + error.message;
          console.error("Ошибка:", error);
          showLoginPage();
        });
    });
  }

  attachLoginFormListener();

  if (token) {
    showWeatherPage();
  } else {
    showLoginPage();
  }
});
