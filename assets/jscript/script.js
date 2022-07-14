// declare all global variable here
const apiKey = 'd1e2d0763204896fd894698f5c6e27ee';
const searchBtn = $("#searchBtn");
const weatherApiRootUrl = 'https://api.openweathermap.org';
const searchCityInput = $("#searchCityInput")
var today = moment().format('L');
var searchHistoryList = [];
const searchHistory = $("#searchHistory");

// function get city data from API 
function searchCity(event) {
    event.preventDefault()
    let city = searchCityInput.val().trim()
    let API = "https://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=5&appid=" + apiKey
    // console.log(city);
    // Fetching the info from URL     
    fetch(API)
        .then(function (result) {
            return result.json()
        })

        .then(function (data) {
            if (!searchHistoryList.includes(city)) {
                searchHistoryList.push(city);
                var searchedCity = $(`
                <div class="d-grid gap-2">
                    <button type="button" class="btn btn-info" id="searchCityList">${city}</button>
                </div>
                    `);
                $("#searchHistory").append(searchedCity);
            };
            localStorage.setItem("city", JSON.stringify(searchHistoryList));
            // console.log(searchHistoryList);
            getWeather(data[0]);
        });
}

// function get weather form city data above 
function getWeather(data) {
    let lat = data.lat
    let lon = data.lon
    let city = data.name
    let API = "https://api.openweathermap.org" + "/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&exclude=minutely,hourly&appid=" + apiKey
    //  console.log(API);
    fetch(API)
        .then(function (result) {
            return result.json()
        })
        .then(function (data) {

            renderCurrentWeather(city, data)
            renderForecastWeather(city, data)
        })
}

// function render current weather 
function renderCurrentWeather(city, data) {
    var weatherIcon = `<img src="http://openweathermap.org/img/w/${data.current.weather[0].icon}.png">`
    // let   = data.current 

    let heading = $("#city")
    heading.text(city + " " + today)
    heading.append(weatherIcon)
    var temp = $(`#temp`)
    var wind = $(`#wind`)
    var humidity = $(`#humidity`)
    var uvi = $(`#uvi`)
    temp.text("Temp: " + data.current.temp)
    wind.text("Wind: " + data.current.wind_speed)
    humidity.text("Humidity: " + data.current.humidity)
    uvi.text(data.current.uvi)
    uviBtn(data.current.uvi);
    // console.log(data);
}

// function set color for UV button 
function uviBtn(uvi) {
    var currentUvi = $(`#uvi`);
    if (uvi < 3) {
        currentUvi.addClass("btn-success")
    } else if (uvi >= 3 && uvi <= 7) {
        currentUvi.addClass("btn-warning")
    } else {
        currentUvi.addClass("btn-danger")
    }
}

// function render forecastweather
function renderForecastWeather(city, data) {   
    for (var i = 0; i < 6; i++) {
        var dateString = moment.unix(data.daily[i + 1].dt).format("MM/DD/YYYY");
        var weatherIcon = `<img src="http://openweathermap.org/img/w/${data.daily[i + 1].weather[0].icon}.png">`
        var tempFuture = $(`#tempFuture${i + 1}`)
        var windFuture = $(`#windFuture${i + 1}`)
        var humidityFuture = $(`#humidityFuture${i + 1}`)
        var futureDate = $(`#futureDate${i + 1}`)

        tempFuture.text("Temp: " + data.daily[i].temp.max)
        windFuture.text("Wind Speed: " + data.daily[i].wind_speed)
        humidityFuture.text("Humidity: " + data.daily[i].humidity)

        futureDate.text("Date: " + dateString)
        futureDate.append(weatherIcon)
    };
}

// add even listener for history city buttons
$(document).on("click", "#searchCityList", function () {
    var listCity = $(this).text();
    let API = "https://api.openweathermap.org/geo/1.0/direct?q=" + listCity + "&limit=5&appid=" + apiKey
    // Fetching the info from URL     
    fetch(API)
        .then(function (result) {
            return result.json()
        })

        .then(data => {
            // console.log(data);
            getWeather(data[0])
        })
})

searchBtn.on("click", searchCity) 