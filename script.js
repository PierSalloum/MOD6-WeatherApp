

const getLocation = async () => {
    const response = await fetch("http://api.openweathermap.org/geo/1.0/direct?q=&limit=1&appid=2e57c835085c11b3a7f95dbb976b3da7")
}


const getWeather = async () => {
    const response = await fetch("https://goweather.herokuapp.com/weather/Caracas", {mode: "no-cors"});
    console.log(response)
}

getWeather()