//Get the coordinates of a location. 
const print = console.log
const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"
const access_key = ".json?access_token=pk.eyJ1IjoidHV0amFlIiwiYSI6ImNrYXJ1a21kNjBtZHEyc3ByejBxaXp6MDcifQ.JfSQZwlk98FkqPuyYQRgrw"
const request = require('request')

function findCoords(place, callback){
    var place = encodeURIComponent(place)
    var curUrl = url + place + access_key
    request({url : curUrl, json : true}, function(err, resp, body){
        if(err){
        callback(1,undefined);
        }else if(resp.body.features.length === 0){
        callback(0,undefined)
        }else{
        callback(undefined,resp.body.features[0])
        }
    })
}
 
function geoCallback(err, data){
    if(err === 1){
    print("Unable to connect. Check your internet connection")   
    } else if (err === 0){
    print("Invalid location")
    } else {
    print(data.center[1], data.center[0])
    }
}

// findCoords('New York', geoCallback)
// findCoords('New Delhi', geoCallback)

module.exports = {coords : findCoords, geocodeCallback : geoCallback}