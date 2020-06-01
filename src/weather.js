//to get weather information given the coordinates.
const request = require('request')
const print = console.log
const url = "http://api.weatherstack.com/current?access_key=bdf8211a5c68eec1720a51187ed90f77&query="
function getWeather(lat,long,callback){
    var newUrl = url + lat.toString(10) + "," + long.toString(10)
    request({url : newUrl, json : true}, function(err, resp, body){
        if(err){
        callback(1,undefined)
        } else if(resp.body.error){
        callback(0,undefined)
        } else {
        //{resp1.body.current.temperature
            resp.body.current.observation_time = resp.body.location.localtime;
            callback(undefined, resp.body.current)
        }
    })
}

function weatherCallback(err, data){
    if(err === 1){
    print("Unable to connect.  Check your internet connection.")
    } else if (err === 0){
    print("invalid location ID")
    } else {
    print(`The temperature is currently: ${data.temperature}, but it feels like: ${data.feels_like}`)
    }
}

// getWeather(40.7128, 74.0060, weatherCallback)
module.exports = {findWeather: getWeather, weatherCB : weatherCallback}