const path = require('path')
const express = require('express')
const hbs = require('hbs') //needed for partials
const { Http2ServerRequest } = require('http2')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

console.log(__dirname)
//console.log(__filename)
console.log(path.join(__dirname, '../public'))
const app = express()
const port = process.env.PORT || 3000
//set some express config values for handlebars
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, '../templates/views'))
hbs.registerPartials(path.join(__dirname, '../templates/partials'))

//set path for static files
app.use(express.static(path.join(__dirname, '../public')))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Russ'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        name: 'Russ'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Russ',
        helpText: 'This is some helpful text.'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({ error: 'Please submit an address to search.'})
    }
    debugger
    geocode(req.query.address, (error, {latitude, longitude, location}) => {
        if (error) {
            return console.log(error)
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return console.log(error)
            }
            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address
            })
          })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Page Not Found',
        helpText: 'Help article not located'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Page Not Found',
        helpText: 'No such page exists.'
    })
})

app.listen(port, () => {
    console.log('Server is up on port 3000.')
})