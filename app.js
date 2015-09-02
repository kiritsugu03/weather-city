#! /usr/bin/env node

var arguments = process.argv.slice(2);

var http = require('http');
var https = require('https');
var request = require('request');
var opener = require('opener');

var apiquery1 = "http://api.openweathermap.org/data/2.5/weather?q=";

for (var i = 0; i < arguments.length ; i++) {
	apiquery1 += arguments[i];
};

request(apiquery1, function(err, res, body) {
	if (err) {
		console.log(err);
	}

	var output = JSON.parse(body);
	var temperature = output.main.temp;
	var weather =  output.weather;

	console.log("City: " + output.name);
	console.log("Temperature: " + temperature);
	console.log("Sky Condition: ");
	for (var i = 0; i < weather.length; i++) {
		console.log("\t      " + weather[i].description);
	};

	var apiquery2 = "http://ajax.googleapis.com/ajax/services/search/images?v=1.0&q="  + output.name + weather[0].main;

	request(apiquery2, function(err, res, body){
		if (err) {
			console.log(err);
		}

		var output = JSON.parse(body);
		console.log(output.responseData.results[0].url);
		opener(output.responseData.results[0].url)
	});

	
});


