const searchBtn = document.getElementById("searchBtn");
const search = document.getElementById("search");

const current = document.querySelector(".current");
const forecast = document.querySelector(".forecast-temp");
//Getting Data//

let weatherData = {
  current: {},
  forecast1: {},
  forecast2: {},
  forecast3: {},
  forecast4: {},
};

async function getWeather(location) {
  try {
    const response = await fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=3b8334187ddd46c8b6a130355233112&q=${location}&days=5`,
      { mode: "cors" }
    );
    const data = await response.json();
    console.log(data);
    weatherData.current.city = data.location.name;
    weatherData.current.condition = data.current.condition.text;
    weatherData.current.temperature = data.current.feelslike_c;

    weatherData.forecast1.high = data.forecast.forecastday[1].day.maxtemp_c;
    weatherData.forecast1.low = data.forecast.forecastday[1].day.mintemp_c;
    weatherData.forecast1.condition =
      data.forecast.forecastday[1].day.condition.icon.substring(2);
    weatherData.forecast1.date = data.forecast.forecastday[1].date.substring(5);

    weatherData.forecast2.high = data.forecast.forecastday[2].day.maxtemp_c;
    weatherData.forecast2.low = data.forecast.forecastday[2].day.mintemp_c;
    weatherData.forecast2.condition =
      data.forecast.forecastday[2].day.condition.icon.substring(2);
    weatherData.forecast2.date = data.forecast.forecastday[2].date.substring(5);

    weatherData.forecast3.high = data.forecast.forecastday[3].day.maxtemp_c;
    weatherData.forecast3.low = data.forecast.forecastday[3].day.mintemp_c;
    weatherData.forecast3.condition =
      data.forecast.forecastday[3].day.condition.icon.substring(2);
    weatherData.forecast3.date = data.forecast.forecastday[3].date.substring(5);

    weatherData.forecast4.high = data.forecast.forecastday[4].day.maxtemp_c;
    weatherData.forecast4.low = data.forecast.forecastday[4].day.mintemp_c;
    weatherData.forecast4.condition =
      data.forecast.forecastday[4].day.condition.icon.substring(2);
    weatherData.forecast4.date = data.forecast.forecastday[4].date.substring(5);
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}

searchBtn.addEventListener("click", async () => {
  let location = search.value;
  await getWeather(location);
  currentWeather(
    weatherData.current.city,
    weatherData.current.condition,
    weatherData.current.temperature
  );

  forecast.innerHTML = "";
  forecastWeather(
    weatherData.forecast1.date,
    weatherData.forecast1.condition,
    weatherData.forecast1.high,
    weatherData.forecast1.low
  );
  forecastWeather(
    weatherData.forecast2.date,
    weatherData.forecast2.condition,
    weatherData.forecast2.high,
    weatherData.forecast2.low
  );
  forecastWeather(
    weatherData.forecast3.date,
    weatherData.forecast3.condition,
    weatherData.forecast3.high,
    weatherData.forecast3.low
  );
  forecastWeather(
    weatherData.forecast4.date,
    weatherData.forecast4.condition,
    weatherData.forecast4.high,
    weatherData.forecast4.low
  );
});

search.addEventListener("keydown", async (e) => {
  if (e.key === "Enter") {
    e.preventDefault();

    let location = search.value;
    await getWeather(location);
    currentWeather(
      weatherData.current.city,
      weatherData.current.condition,
      weatherData.current.temperature
    );
    forecast.innerHTML = "";
    forecastWeather(
      weatherData.forecast1.date,
      weatherData.forecast1.condition,
      weatherData.forecast1.high,
      weatherData.forecast1.low
    );
    forecastWeather(
      weatherData.forecast2.date,
      weatherData.forecast2.condition,
      weatherData.forecast2.high,
      weatherData.forecast2.low
    );
    forecastWeather(
      weatherData.forecast3.date,
      weatherData.forecast3.condition,
      weatherData.forecast3.high,
      weatherData.forecast3.low
    );
    forecastWeather(
      weatherData.forecast4.date,
      weatherData.forecast4.condition,
      weatherData.forecast4.high,
      weatherData.forecast4.low
    );
  }
});

//Rendering//

function currentWeather(city, status, tem) {
  current.innerHTML = "";
  const infor = document.createElement("div");

  const inforHTML = `
    <h2 id="location">${city}</h2>
        <h3 id="current-condition">${status}</h3>
        <h1 id="current-temp">${tem} <span id="temp-unit">°C</span></h1>
    `;
  infor.innerHTML = inforHTML;
  current.appendChild(infor);
}

function forecastWeather(date, img, heigh, low) {
  const infor = document.createElement("div");
  const inforHTML = `
      <div class="day1 forecast">
        <h4 id="date">${date}</h4>
        <img src="http://${img}" alt="" />
        <div class="temp">
          <h4>H: ${heigh}°C</h4>
          <h4>L: ${low}°C</h4>
        </div>
      </div>
    `;
  infor.innerHTML = inforHTML;
  forecast.appendChild(infor);
}
