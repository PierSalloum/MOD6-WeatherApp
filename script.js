
const getLocation = async () => {
    const inputCity = document.getElementById("input-city").value
    const response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${inputCity}&limit=1&appid=2e57c835085c11b3a7f95dbb976b3da7`)
    const data = await response.json()
    getWeather(data[0].lon, data[0].lat)
    let lastSearch = document.querySelector(".list")
    let lastSearchContent = document.createElement("button")
    lastSearchContent.className += ".list-item"
    lastSearchContent.innerHTML = inputCity
    lastSearchContent.addEventListener("click", handleHistory)
    lastSearch.appendChild(lastSearchContent);
    localStorage.setItem("lastSearchResult", lastSearch.innerHTML);
    document.querySelector(".forecast-container").innerHTML = '';
}



async function handleHistory (event) {
    const response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${event.target.innerHTML}&limit=1&appid=2e57c835085c11b3a7f95dbb976b3da7`)
    const data = await response.json()
    getWeather(data[0].lon, data[0].lat)
    document.querySelector(".forecast-container").innerHTML = '';
}
const lastSearchResult = localStorage.getItem("lastSearchResult");
if (lastSearchResult) {
    document.querySelector(".list").innerHTML = lastSearchResult;
}

const clearHistory = document.getElementById("clear-history");
clearHistory.addEventListener("click", () => {
    localStorage.removeItem("lastSearchResult");
    document.querySelector(".list").innerHTML = "";

});
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




