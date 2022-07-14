# Weather dashboard
![LICENSE](https://img.shields.io/github/license/tiffany-brand/weather-conditions-dashboard?style=plastic) 

## Table of Contents
1. [Description](#Description)
2. [User_Story](#User_Story)
3. [Acceptance_Criteria](#Acceptance_Criteria)
4. [Technologies](#Technologies)

## Description
This weather dashboard project allows the user to search for cities and view current weather conditions and a 5 day forecast with data from the OpenWeather API. A user can input a city and a state and/or country, and the relevent weather data will be retrieved from OpenwWeather. The past five searched cities will appear as buttons that, when clicked, will load the current weather data for that city. When the page is refreshed, the last-searched city's weather data is displayed.

## User_Story
AS A traveler
I WANT to see the weather outlook for multiple cities
SO THAT I can plan a trip accordingly

## Acceptance_Criteria
GIVEN a weather dashboard with form inputs
WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history
WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
WHEN I view the UV index
THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city

## Technologies
OpenWeather API: https://openweathermap.org/api 

Bootstrap CSS Framework: https://getbootstrap.com/

Moment JS: https://momentjs.com/ 

## Link to Deployed Application
View the Weather Conditions Dashboard at: https://khanh-t-tran.github.io/weather_dashboard/
