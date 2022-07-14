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
    // var cityArray = JSON.parse(localStorage.getItem("city")) || [] ;
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
        .then(function(result){
            return result.json()
        })
        
        .then(function(data){
            // console.log(data);
            // cityArray.push(data[0].name)
            if (!searchHistoryList.includes(city)) {
                searchHistoryList.push(city);
                var searchedCity = $(`
                <button type="button" class="btn btn-info list-group-item" id="searchCityList">${city}</button>
                    `);
                $("#searchHistory").append(searchedCity);
            };
            localStorage.setItem("city", JSON.stringify(searchHistoryList));
            
            // console.log(searchHistoryList);

            getWeather(data[0]);
           
        });
        
    }

    
    
       
    
    
    function getWeather(data) {
        let lat = data.lat
        let lon = data.lon
        let city = data.name
        let API = "https://api.openweathermap.org" + "/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&exclude=minutely,hourly&appid=" + apiKey
        //  console.log(API);
        fetch(API)
        .then(function(result){
            return result.json()
        })
        .then(function(data){
           
            renderCurrentWeather (city,data)
            renderForecastWeather(city,data)
        })
    }
    

    function renderCurrentWeather(city,data) {
            var weatherIcon = `<img src="http://openweathermap.org/img/w/${data.current.weather[0].icon}.png">` 
            // let   = data.current 
        
            let heading = $("#city")
            heading.text (city + " " + today)
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
        
        
        // console.log(data.daily);
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


$(document).on("click", ".list-group-item", function() {
    var listCity = $(this).text();
    
    let API = "https://api.openweathermap.org/geo/1.0/direct?q=" + listCity + "&limit=5&appid=" + apiKey
    // console.log(API);
// Fetching the info from URL     
    fetch(API)
    .then(function(result){
        return result.json()
    })

    .then(data => {
        // console.log(data);
        getWeather(data[0])
       
    })
   
})
    
searchBtn.on("click", searchCity) 