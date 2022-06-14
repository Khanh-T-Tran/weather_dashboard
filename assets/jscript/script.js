// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city

// $(document).ready(function () {

    // OpenWeather API
const apiKey = '218bd26d3855488a6e6abc9f6a2091c0';

// Selectors for HTML elements 
const searchCityBtn = $("#search-btn")
const searchCityInput = $("#searchTerm")
const cityEl = $()
const currentWeatherEL = $(".currentWeather")
const weatherApiRootUrl = 'https://api.openweathermap.org';


// function for searccity
function searchCity (event) {
    event.preventDefault()
    let city = searchCityInput.val().trim()
    let API = weatherApiRootUrl + "/geo/1.0/direct?q=" + city + "&limit=5&appid=" + apiKey
    fetch(API)
    .then(function(result){
        return result.json()
    })
    .then(function(data){
        console.log(data);
        getWeather(data[0]);
    })
}

//
function getWeather (data){
    let lat = data.lat
    let lon = data.lon
    let city = data.name
    let API = weatherApiRootUrl + "/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&exclude=minutely,hourly&appid=" + apiKey
    fetch(API)
    .then(function(result){
        return result.json()
    })
    .then(function(data){
        console.log(data);
        renderCurrentWeather (city,data)
    })
}

// render current weather
function renderCurrentWeather (city,data) {
    let temp = data.current.temp
    let heading = $("<h3>")
    heading.text (city)
    let tempEl = $("<p>")
    tempEl.text (temp)
    currentWeatherEL.append(heading,tempEl)

}




// Add event to the search button calling for it's function
$("#search-btn").click(searchCity)


// });