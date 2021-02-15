const apiKeyOwm = "b1a49a1a1585c9d83e5c4e6d2cc844e0";
let cityID = '';
let cityList = [];

// Get cities with Fetch API. Local server needs to be available 
getCities = () => {
  fetch('./js/cities.json')
    .then((res) => res.json())
    .then((data) => {
      let output = `\n<option>Select city or village</option>\n`;
      data.forEach((city) => {
        // console.log(data);
        output += `<option value="${city.id}">${city.name}, ${city.country}</option>`;
        cityList.push(city);
      });

      formControl.innerHTML = output;

    })
}

getCities();


/////////////////////
// Event Listeners //
/////////////////////


// Get Weather Status  with API Fetch

getWeatherStatusBtn.addEventListener('click', (ev) => {
  cityID = ev.target.parentElement.firstElementChild[0].value;
  fetch(`http://api.openweathermap.org/data/2.5/weather?id=${cityID}&appid=${apiKeyOwm}`)
    .then((res) => res.json())
    .then((data) => {
      let dayHour = Intl.DateTimeFormat('en-US', {
        weekday: "long",
        hour: "2-digit",
        minute: "2-digit"
      }).format((data.dt + data.timezone - 3400) * 1000);
      let output = '';
      output = `
     <table id="weatherTable" class="table table-striped mt-2">
        <thead class="thead-dark">
          <tr>
            <th>Day</th>
            <th>Weather Description</th>
            <th>Temperature</th>
            <th>Feels Like</th>
            <th>Humidity</th>
            <th>Wind Speed</th>
          </tr>
        </thead>
        <tbody id="productTableBody">
          <tr>
            <td> ${dayHour}</td>
            <td> ${data.weather[0].description} </td>
            <td> ${parseInt(data.main.temp - 273)} ºC </td>
            <td> ${parseInt(data.main.feels_like - 273)} ºC </td>
            <td> ${data.main.humidity} % </td>
            <td> ${data.wind.speed } m/s </td>
          </tr>
        </tbody>
       </table>
      `;
      weatherContainer.innerHTML = output;
    })
})




// Get weather forecast witch API Fetch

getWeatherForecastBtn.addEventListener('click', (ev) => {
  cityID = parseInt(ev.target.parentElement.firstElementChild[0].value);
  let latitude = '';
  let longitude = '';
  for (const n in cityList) {
    if (cityList[n].id === cityID) {
      latitude = cityList[n].coord.lat;
      longitude = cityList[n].coord.lon;

    }
  }

  fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKeyOwm}`)
    .then((res) => res.json())
    .then((data) => {
      let output = `
         <table id="weatherTable" class="table table-striped thead-light mt-2">
         <thead class="thead-dark">
           <tr>
             <th>Day</th>
             <th>Weather Description</th>
             <th>Temperature</th>
             <th>Feels Like</th>
             <th>Humidity</th>
             <th>Wind Speed</th>
           </tr>
         </thead>
         <tbody id="productTableBody">`;

      for (let n = 1; n < 8; n++) {
        let dayLong = Intl.DateTimeFormat('en-US', {
          weekday: "long"
        }).format((data.daily[n].dt + data.timezone_offset) * 1000);
        output += `
          <tr>
            <td> ${dayLong}</td>
            <td> ${data.daily[n].weather[0].description} </td>
            <td> ${parseInt(data.daily[n].temp.day - 273)} ºC </td>
            <td> ${parseInt(data.daily[n].feels_like.day - 273)} ºC </td>
            <td> ${data.daily[n].humidity} % </td>
            <td> ${data.daily[n].wind_speed } m/s </td>
          </tr>`;
      }

      output += `
         </tbody>
        </table>
          `;
      weatherContainer.innerHTML = output;
    })
})