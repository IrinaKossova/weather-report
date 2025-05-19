document.addEventListener("DOMContentLoaded", function () {
  const apiKeyWeather = "87b31996d9276087e1e5d2d7338ce72c";
  const weatherDataDiv = document.getElementById("weatherData");
  const loadingIndicator = document.getElementById("loadingIndicator");
  const weatherTemplate = document.getElementById("weatherTemplate");

  function getWeatherData() {
    withLoading(
      loadingIndicator,
      new Promise((resolve, reject) => {
        fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=Moscow&appid=${apiKeyWeather}&units=metric&lang=ru`
        )
          .then((response) => response.json())
          .then((data) => {
            const weatherData = {
              temperature: data.main.temp,
              feelsLike: data.main.feels_like,
              humidity: data.main.humidity,
              description: data.weather[0].description,
              windSpeed: data.wind.speed,
            };

            const templateContent = weatherTemplate.content.cloneNode(true);

            const temperatureElement = templateContent.querySelector(
              '.weather-data__value[data-weather-type="temperature"]'
            );
            if (temperatureElement) {
              temperatureElement.textContent = `${weatherData.temperature}°C`;
            }

            const feelsLikeElement = templateContent.querySelector(
              '.weather-data__value[data-weather-type="feelsLike"]'
            );
            if (feelsLikeElement) {
              feelsLikeElement.textContent = `${weatherData.feelsLike}°C`;
            }

            const humidityElement = templateContent.querySelector(
              '.weather-data__value[data-weather-type="humidity"]'
            );
            if (humidityElement) {
              humidityElement.textContent = `${weatherData.humidity}%`;
            }

            const descriptionElement = templateContent.querySelector(
              '.weather-data__value[data-weather-type="description"]'
            );
            if (descriptionElement) {
              descriptionElement.textContent = weatherData.description;
            }

            const windSpeedElement = templateContent.querySelector(
              '.weather-data__value[data-weather-type="windSpeed"]'
            );
            if (windSpeedElement) {
              windSpeedElement.textContent = `${weatherData.windSpeed} м/с`;
            }

            weatherDataDiv.innerHTML = "";

            weatherDataDiv.appendChild(templateContent);
            resolve();
          })
          .catch((error) => {
            console.error("Ошибка при получении данных о погоде:", error);
            weatherDataDiv.textContent =
              "Произошла ошибка при получении данных о погоде.";
            reject(error);
          });
      })
    );
  }

  getWeatherData();
});
