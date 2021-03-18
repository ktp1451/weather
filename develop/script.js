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
    var iconBaseUrl = 'http://openweathermap.org/img/w/';
    var searchHistory = [];

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
        searchHistory.push(city);
        localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
        searchTermDiv.text(city);
        searchHistoryContainer.append(searchTermDiv);
        console.log(formValues, city);
        //REAL VALUE GOTTEN FROM FORM
        searchForCurrentCityWeather(city);
        searchForFiveDayForecastWeather(city);
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
                var iconUrl = iconBaseUrl + weather[0].icon + '.png';
                var wind =data.wind;
                console.log(temp, humidity, weather, wind);
                var cityNameDiv = $('<div class="city-name">');
                var tempDiv = $('<div class="temp-name">');
                var humidityDiv = $('<div class="humidity-name">');
                var weatherImg = $('<img class="icon-name" />');
                var windDiv = $('<div class="wind-name">');
                cityNameDiv.text(cityName);
                weatherImg.attr('src', iconUrl);
                tempDiv.text("Temperature: " + temp);
                humidityDiv.text("Humidity: "+ humidity + "%"); 
                windDiv.text("Wind Speed: " + wind.speed + "MPH");
                currentWeatherContainer.append(cityNameDiv);
                currentWeatherContainer.append(weatherImg);
                currentWeatherContainer.append(tempDiv);
                currentWeatherContainer.append(humidityDiv);
                currentWeatherContainer.append(windDiv);
            });
        }
        function searchForFiveDayForecastWeather (city) {
            var forecastUrl = baseUrl2 + "q=" + city + "&appid=" +apiKey;
            fetch(forecastUrl).then(function(responseFromOpenWeatherMapUnProcessed){
                return responseFromOpenWeatherMapUnProcessed.json()
            }).then(function(data) { 
                console.log('Five Day Forecast', data);
                //Empty Array to colect five days of data
                for (var i = 0; i < data.list.length; i++) {
                    //isThreeOClock > -1 if the time stored in this variable contains 15:00:00
                    var isThreeOClock = data.list[i].dt_txt.search('15:00:00');
                    var cityName = data.city.name;
                    if (isThreeOClock > -1) {
                        var forecast = data.list[i];
                        var temp = forecast.main.temp;
                        var humidity = forecast.main.humidity;
                        var weather = forecast.weather;
                        var iconUrl = iconBaseUrl + weather[0].icon + '.png';
                        var wind = forecast.wind;
                        var day = moment(forecast.dt_txt).format('dddd, MMMM Do');
                        console.log(forecast, temp, humidity, weather, wind, day);
                        var rowDiv = $('<div class="col-2">');
                        var dayDiv = $('<div class="day-name">');
                        var tempDiv = $('<div class="temp-name">');
                        var humidityDiv = $('<div class="humidity-name">');
                        var weatherImg = $('<img class="icon-name" />');
                        var windDiv = $('<div class="wind-name">');
                        weatherImg.attr('src', iconUrl);
                        dayDiv.text(day);
                        tempDiv.text("Temperature: " + temp);
                        humidityDiv.text("Humidity: "+ humidity + "%"); 
                        windDiv.text("Wind Speed: " + wind.speed + "MPH");
                        //COMBINE ALL VALUES INTO ONE DIV BEFORE PUTTING INTO MAIN CONTAINER
                        rowDiv.append(dayDiv);
                        rowDiv.append(weatherImg);
                        rowDiv.append(tempDiv);
                        rowDiv.append(humidityDiv);
                        rowDiv.append(windDiv);
                    }
                }
            });
            //WHEN I view future weather conditions for that city
            //THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity  
        }
        function retrieveSearchHistory() {
            if (localStorage.getItem('searchHistory'))
            searchHistory = JSON.parse(localStorage.getItem('searchHistory'));
            for (var i =0; i <searchHistory.length; i++) {
                var searchTermDiv = $('<div class="past-search-term">');
                searchTermDiv.text(searchHistory[i]);
                searchHistoryContainer.append(searchTermDiv);
                
            }
        }
        retrieveSearchHistory();

});

