const latitude = 27.57;
const longitude = 81.60;

async function loadWeather() {

  const url =
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}` +
    `&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m,wind_direction_10m` +
    `&hourly=temperature_2m,precipitation_probability,precipitation,weather_code,wind_speed_10m` +
    `&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,sunrise,sunset` +
    `&timezone=Asia%2FKolkata&forecast_days=7`;

  try {

    const response = await fetch(url);
    const data = await response.json();

    // Current weather
    document.querySelector(".temp").textContent =
      Math.round(data.current.temperature_2m) + "°C";

    const cards = document.querySelectorAll(".info-card strong");

    cards[0].textContent =
      Math.round(data.current.temperature_2m) + "°C";

    cards[1].textContent =
      Math.round(data.current.relative_humidity_2m) + "%";

    cards[2].textContent =
      Math.round(data.current.wind_speed_10m) + " km/h";

    cards[3].textContent =
      data.hourly.precipitation_probability[0] + "%";


    // -------------------------
    // NEXT 24 HOURS
    // -------------------------

    const hourlyContainer =
      document.getElementById("hourlyForecast");

    hourlyContainer.innerHTML = "";

    const currentHour =
      new Date().getHours();

    for (
      let i = currentHour;
      i < currentHour + 24 && i < data.hourly.time.length;
      i++
    ) {

      const time =
        new Date(data.hourly.time[i]);

      const hour =
        time.toLocaleTimeString("en-IN", {
          hour: "numeric",
          hour12: true
        });

      const temperature =
        Math.round(data.hourly.temperature_2m[i]);

      const rain =
        data.hourly.precipitation_probability[i];

      const wind =
        Math.round(data.hourly.wind_speed_10m[i]);

      const card = document.createElement("div");

      card.className = "hour-card";

      card.innerHTML = `
        <h3>${hour}</h3>
        <span>🌦️</span>
        <strong>${temperature}°C</strong>
        <p>🌧️ ${rain}%</p>
        <small>💨 ${wind} km/h</small>
      `;

      hourlyContainer.appendChild(card);
    }


    // -------------------------
    // 7 DAY FORECAST
    // -------------------------

    const dailyContainer =
      document.getElementById("dailyForecast");

    dailyContainer.innerHTML = "";

    for (
      let i = 0;
      i < 7;
      i++
    ) {

      const date =
        new Date(data.daily.time[i]);

      const day =
        date.toLocaleDateString("en-IN", {
          weekday: "short"
        });

      const max =
        Math.round(
          data.daily.temperature_2m_max[i]
        );

      const min =
        Math.round(
          data.daily.temperature_2m_min[i]
        );

      const rain =
        data.daily.precipitation_probability_max[i];

      const card =
        document.createElement("div");

      card.className = "day";

      card.innerHTML = `
        <h3>${day}</h3>
        <span>🌦️</span>
        <strong>${max}° / ${min}°</strong>
        <p>🌧️ Rain ${rain}%</p>
      `;

      dailyContainer.appendChild(card);
    }

  } catch (error) {

    console.error(
      "Weather data load nahi hua:",
      error
    );

  }
}

loadWeather();


// Current date

const today = new Date();

document.getElementById("date").textContent =
  today.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric"
  });


// Footer year

document.getElementById("year").textContent =
  today.getFullYear();