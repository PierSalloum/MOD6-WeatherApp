const getLocation = async () => {
    const inputCity = document.getElementById("input-city").value
    console.log(inputCity)
    const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${inputCity}&limit=1&appid=2e57c835085c11b3a7f95dbb976b3da7`)
    console.log(response)
    const data = await response.json()
    console.log(data)
    getWeather(data[0].lon, data[0].lat)
    let lastSearch = document.querySelector(".list")
    let lastSearchContent = document.createElement("li")
    lastSearchContent.className += ".list-item"
    lastSearchContent.innerHTML = inputCity
    lastSearch.appendChild(lastSearchContent);
    data.innerHTML = '';
}

const buttonCity = document.getElementById("button-city")
buttonCity.addEventListener("click", getLocation)

const getWeather = async (lon, lat) => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=2e57c835085c11b3a7f95dbb976b3da7&units=imperial`);
    const data = await response.json();
    data.list.map((weather)=> {
        const setHour = weather.dt_txt.substr(11, 2)
        if (setHour == "21"){
            console.log(weather)
            forecastDisplay(weather.dt_txt, weather.main.humidity, weather.main.temp, weather.wind.speed)
        }
    })
}

function forecastDisplay(dt_txt, humidity, temp, speed) {
    let day1 = document.querySelector(".forecast-container");
    let newParagraph = document.createElement("p")
    newParagraph.className += "day-container"
    newParagraph.innerHTML = `Day: ${dt_txt.substr(0, 10)}<br> Humidity: ${humidity}<br> Temperature: ${temp}F<br> Wind: ${speed}MPH`;
    day1.appendChild(newParagraph);
}




