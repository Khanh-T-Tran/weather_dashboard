// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the  erature, the humidity, the wind speed, and the UV index
// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the  erature, the wind speed, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city


    
    const apiKey = 'd1e2d0763204896fd894698f5c6e27ee';
    const searchBtn = $("#searchBtn");
    const weatherApiRootUrl = 'https://api.openweathermap.org';
    const searchCityInput = $("#searchCityInput")
    var today = moment().format('L');
    
// function get city data from API 
    function searchCity(event) {
        event.preventDefault()
        let city = searchCityInput.val().trim()
        let API = "https://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=5&appid=" + apiKey
        
    // Fetching the info from URL     
        fetch(API)
        .then(function(result){
            return result.json()
        })
        .then(function(data){
            console.log(data);
            getWeather(data[0]);
        })
    }
    
    function getWeather(data) {
        let lat = data.lat
        let lon = data.lon
        let city = data.name
        let API = "https://api.openweathermap.org" + "/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&exclude=minutely,hourly&appid=" + apiKey
        fetch(API)
        .then(function(result){
            return result.json()
        })
        .then(function(data){
            console.log(data);
            renderCurrentWeather (city,data)
            renderForecastWeather(city,data)
        })
    }
    

    function renderCurrentWeather(city,data) {
        
            let   = data.current 
            let heading = $("#city")
            heading.text (city + " " + today)
            var temp = $(`#temp`)
            var wind = $(`#wind`)
            var humidity = $(`#humidity`)
            var uvi = $(`#uvi`)
            temp.text("Temp: " + data.current.temp)
            wind.text("Wind: " + data.current.wind_speed)
            humidity.text("Humidity: " + data.current.humidity)
            uvi.text(data.current.uvi)
            uviBtn(data.current.uvi);
    
    }

    function uviBtn(uvi) {
        var currentUvi = $(`#uvi`);
        if (uvi < 3) {
            currentUvi.addClass("btn-success")
        } else if (uvi >= 3 && uvi <=7) {
            currentUvi.addClass("btn-warning")
        } else {
            currentUvi.addClass("btn-danger")
        }          
    
    }
  
    function renderForecastWeather(city,data){
        
        // let   = data.daily
        console.log(data.daily);
        for (var i = 0; i < 6; i++) {
            var dateString = moment.unix(data.daily[i + 1].dt).format("MM/DD/YYYY");
            var weatherIcon = `<img src="http://openweathermap.org/img/wn/${data.daily[i + 1].weather[0].icon}@2x.png">
            `

            var tempFuture = $(`#tempFuture${i + 1}`)
            var windFuture = $(`#windFuture${i + 1}`)
            var humidityFuture = $(`#humidityFuture${i + 1}`)
            var uviFuture = $(`#uviFuture${i + 1}`)
            var futureDate = $(`#futureDate${i + 1}`)
            tempFuture.text("Temp: " + data.daily[i].temp.max)
            windFuture.text("Wind Speed: " + data.daily[i].wind_speed)
            humidityFuture.text("Humidity: " + data.daily[i].humidity)
            uviFuture.text("Temp: " + data.daily[i].uvi)
            futureDate.text("Date: " + dateString)
            futureDate.append(weatherIcon)
    
            };
         }


        
    searchBtn.on("click", searchCity)