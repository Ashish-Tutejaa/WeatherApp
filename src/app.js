//node
const path = require('path')
//npm
const express = require('express')
const hbs = require('hbs')
//user made
const geocode = require('./geocode.js')
const weather = require('./weather.js')
//consts
const app = express()
const print = console.log
const partials = path.join(__dirname, './partial-views');
const viewsPath = path.join(__dirname, './views')


hbs.registerPartials(partials)
app.set('view engine', 'hbs')
app.set('views', viewsPath)
app.use(express.static(path.join(__dirname,'../public')))

app.get('/weather', (req,res) => {

    if(!req.query.location)
        {
        res.send({err_message : "you must provide a search term."})    
        }
    else
        {
            print("here", req.query.location)
            geocode.coords(req.query.location, function(err,data){
                if(err === 1){
                    res.send({err_message : "Unable to connect to server, please check your internet connection!"})   
                    } else if (err === 0){
                    res.send({err_message : "No location found."}) 
                    } else {
                        print(data.center[1], data.center[0])
                        weather.findWeather(data.center[1],data.center[0], function(err,data){
                            if(err === 1){
                                res.send({err_message : "Unable to connect to server, please check your internet connection!"})   

                                } else if (err === 0){
                                    res.send({err_message : "No location found."}) 

                                } else {
                                    res.send(data)
                                }
                        })
                    }
            })
        }
   

    // res.send({
    // weather : "sunny"
    // })
})


app.get('', (req,res) => {
    res.render('index',{
        title : "Home"
    })
})

app.get('/home', (req,res) => {
    res.render('index',{
    title : "Home"
    })
})

app.get('/help', (req,res) => {
    res.render('help',{
    title : "Help!",
    message : "what is your query"
    })
})

app.get('/about', (req, res) => {
    res.render('about',{
        title : "About Me"
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