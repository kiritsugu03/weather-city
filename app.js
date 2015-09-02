var requestPromise = require('request-promise');
var opener = require('opener');

var arguments = process.argv.slice(2);
var apiquery1 = "http://api.openweathermap.org/data/2.5/weather?q=";

for (var i = 0; i < arguments.length ; i++) {
	apiquery1 += arguments[i];
};

requestPromise(apiquery1).then(function(body) {
  var output = JSON.parse(body);
	var temperature = output.main.temp;
	var weather =  output.weather;

	console.log("City: " + output.name);
	console.log("Temperature: " + temperature);
	console.log("Sky Condition: ");
	for (var i = 0; i < weather.length; i++) {
		console.log("\t      " + weather[i].description);
	};

  var apiquery2 = encodeURI("http://ajax.googleapis.com/ajax/services/search/images?v=1.0&q="
  + output.name + " " + weather[0].main + " " + weather[0].description);
  return getWeatherImage(apiquery2);
}).catch(console.error);

function getWeatherImage(apiquery2) {
  requestPromise(apiquery2).then(function(body) {
    var output = JSON.parse(body);
    var url = output.responseData.results[0].url;
    opener(url);
  })
}
