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
//port
const port = process.env.PORT || 3000

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


app.listen(port,() => print("listening!"))
