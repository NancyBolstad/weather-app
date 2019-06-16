const openWeatherAppId = 'c1dbe31bfb317d8a3c885c734bbeb4c9',
openWeatherUrl = 'http://api.openweathermap.org/data/2.5/forecast'

const prepareData = function(units) {
// Replace loading image
let cityName = $('#city-name').val()
// Make ajax call, callback
if (cityName && cityName != ''){
  cityName = cityName.trim()
  getData(openWeatherUrl, cityName, openWeatherAppId, units)
}
else {
  alert('Please enter the city name')
}
}
$(document).ready(function(){
$('.btn-metric').click(function() {
  prepareData('metric')
})
$('.btn-imperial').click(function() {
  prepareData('imperial')
})

})
function getData (url, cityName, appId, units) {
const request = $.ajax({
  url: url,
  dataType: "jsonp",
  data: {q: cityName, appid: appId, units: units},
  jsonpCallback: "fetchData",
  type: "GET"
}).fail(function(error){
  console.error(error)
  alert('Error sending request')
})
}
function fetchData (forecast) {
console.log(forecast)
let html = '',
  cityName = forecast.city.name,
  country = forecast.city.country

html += `<h3> Weather Forecast for ${cityName}, ${country}</h3>`
forecast.list.forEach(function(forecastEntry, index, list){
  html += `<p>${forecastEntry.dt_txt}:${forecastEntry.main.temp}</p>`
})

$('#log').html(html)
}