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


    
    const apiKey = '218bd26d3855488a6e6abc9f6a2091c0';
    const searchBtn = $("#searchBtn");
    const weatherApiRootUrl = 'https://api.openweathermap.org';
    const searchCityInput = $("#searchTerm")
    
    searchBtn.on("click", searchCity)
    function searchCity(event) {
        console.log("weather")
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
        })
    }
    
    function renderCurrentWeather(city,data) {
        
            let   = data.current 
            let heading = $("#city")
            heading.text (city)
            
            for (var i = 0; i < 6; i++) {
                var temp = $(`#temp${i + 1}`)
                temp.text("Temp:" + data.daily[i].temp.max)
            }
    
    }