//node
const path = require('path')
//npm
const express = require('express')
//user made
const geocode = require('./geocode.js')
const weather = require('./weather.js')

const app = express()
const print = console.log



app.set('view engine', 'hbs')
app.use(express.static(path.join(__dirname,'../public')))

app.get('/weather', (req,res) => {
    print("here", req.query.location)
    //call geocode.coords with location name.
    //in the call back weather.findWeather with cooords.
    //in the call back just store that object here then just return it.
    // res.send({
    //     its : "sunny"
    // })
    geocode.coords(req.query.location, function(err,data){
        if(err === 1){
            print("Unable to connect. Check your internet connection")   
            } else if (err === 0){
            print("Invalid location")
            } else {
                // print(data.center[1], data.center[0])
                weather.findWeather(data.center[1],data.center[0], function(err,data){
                    if(err === 1){
                        print("Unable to connect.  Check your internet connection.")
                        } else if (err === 0){
                        print("invalid location ID")
                        } else {
                        // obj.temp = data.temperature;
                        // obj.feels_like = data.feels_like;
                            res.send(data)
                        // print(`The temperature is currently: ${data.temperature}, but it feels like: ${data.feels_like}`)
                        }
                })
            }
    })

    // res.send({
    // weather : "sunny"
    // })
})


app.get('', (req,res) => {
    res.render('index')
})

app.get('/help', (req,res) => {
    res.render('help',{
    message : "what is your query",
    })
})

// app.get('', (req,res) => {
// res.send("wasssssssssup")
// })

// app.get('/home', (req,res) => {
// res.send("at home")
// })

// app.get('/about', (req,res) => {
//     res.send({
//     name : "tuteja",
//     age: 21
//     })
// })

// app.get('/weather', (req,res) => {
// res.send("<h1>it's raining dolla bills out here</h1>")
// })

app.listen(3000,() => print("i love you 3000"))

//example.com
//exmaple.com/home
//example.com/about
//-----------------
//the route for the first one is ' '
//the route for the second one is '/home'
//the route for the third one is '/about'
//-----------------
//the get method takes the route and then a callback.  the callback has two
//arguments req and res. req is request, and res is response.