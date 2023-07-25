const apiKey = "b6907d289e10d714a6e88b30761fae22";
const cityName = "London";

const API_BASE_URL = `https://cors-anywhere.herokuapp.com/http://samples.openweathermap.org/data/2.5/forecast/hourly?q=${cityName}&appid=${apiKey}`;

async function fetchData() {
  try {
    const dateInput = document.getElementById("dateInput").value;
    const response = await fetch(API_BASE_URL);
    const data = await response.json();
    return data.list.find((item) => item.dt_txt.includes(dateInput));
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

function displayOutput(output) {
  const outputDiv = document.getElementById("output");
  outputDiv.textContent = output;
}

async function getWeather() {
  const data = await fetchData();
  if (data) {
    const temp = data.main.temp;
    displayOutput(`Temperature for ${data.dt_txt}: ${temp}°C`);
  } else {
    displayOutput("Date not found in the forecast.");
  }
}

async function getWindSpeed() {
  const data = await fetchData();
  if (data) {
    const windSpeed = data.wind.speed;
    displayOutput(`Wind Speed for ${data.dt_txt}: ${windSpeed} m/s`);
  } else {
    displayOutput("Date not found in the forecast.");
  }
}

async function getPressure() {
  const data = await fetchData();
  if (data) {
    const pressure = data.main.pressure;
    displayOutput(`Pressure for ${data.dt_txt}: ${pressure} hPa`);
  } else {
    displayOutput("Date not found in the forecast.");
  }
}

function terminateProgram() {
  displayOutput("Program terminated.");
}

window.addEventListener("keydown", (e) => {
  if (e.key === "1") {
    getWeather();
  }

  if (e.key === "2") {
    getWindSpeed();
  }

  if (e.key === "3") {
    getPressure();
  }

  if (e.key === "0") {
    terminateProgram();
  }
});