//4c1859eb5eaf44d5337039c7e072e585
//console.log('Hello');

$(document).ready(function() {
    //GIVEN a weather dashboard with form inputs
    //THEN I am presented with current and future conditions for that city and that city is added to the search history
    var searchHistoryContainer = $('#past-searches');
    var searchForm = $('#search-form');
    var currentWeatherContainer = $('#current-weather');
    var FiveDayForecastContainer = $('#five-day-forecast');
    var apiKey = '4c1859eb5eaf44d5337039c7e072e585'; //dont' submit to github with apikey. user must submit their own
    var baseUrl = 'https://api.openweathermap.org/data/2.5/weather?';
    var baseUrl2 = 'https://api.openweathermap.org/data/2.5/forecast?';
    //WHEN I search for a city
    searchForm.submit(function( event ) {
        //alert( "Handler for .submit() called." );
        event.preventDefault();
        console.log(event);
        // $(this) = THIS FORM THAT JUST SUBMITTED
        var formValues = $(this).serializeArray();
        var city = formValues[0].value;
        //HOW TO CREATE ELELMENT WITH JQUREY SELECTOR
        var searchTermDiv = $('<div class="past-search-term">');
        searchTermDiv.text(city);
        searchHistoryContainer.append(searchTermDiv);
        console.log(formValues, city);
        //REAL VALUE GOTTEN FROM FORM
        searchForCurrentCityWeather(city);

        });
        function searchForCurrentCityWeather(city) {
            //&appid={API key}
            var fullUrl = baseUrl + "q=" + city + "&appid=" +apiKey;
            console.log(fullUrl);
            //WHEN I view current weather conditions for that city
            //THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
            fetch(fullUrl).then(function (response){
                return response.json();
            })
            .then(function (data) {
                console.log(data);
                var cityName = data.name;
                var temp = data.main.temp;
                var humidity = data.main.humidity;
                var weather = data.weather;
                var wind =data.wind;
                console.log(temp, humidity, weather, wind);
                var cityNameDiv = $('<div class="city-name">');
                var temoDiv = $('<div class="temp-name">');
                var humidityDiv = $('<div class="humidity-name">');
                var weatherDiv = $('<div class="icon-name">');
                var windDiv = $('<div class="wind-name">');
                cityNameDiv.text(cityName);
                tempDiv.text("Temperature: " + temp);
                humidityDiv.text("Humidity: "+ humidity + "%"); 
                windDiv.text("Wind Speed: " + wind.speed + "MPH");

                currentWeatherContainer.append(cityNameDiv);
                currentWeatherContainer.append(tempDiv);
                currentWeatherContainer.append(humidityDiv);
                currentWeatherContainer.append(windDiv);
            });
        }
        function searchForFiveDayForecastWeather (city) {
            //WHEN I view future weather conditions for that city
            //THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity  
        }
});

