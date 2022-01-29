const request = require('postman-request')

const forecast = ( latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=4693a4132ae138bc0f906fd37946b0d7&query=' + longitude + ',' + latitude

    request({url, json: true}, (error, { body }) => {
        if (error) {
            callback('There was an error connecting to the service;', undefined)
        } else if (body.error) {
            callback(body.error)
        } else {
            const current = body.current
            console.log(current)
            callback(undefined, current.weather_descriptions[0] + '. It is currenty ' + current.temperature + ' degrees. It feels like ' + current.feelslike + ' degrees. The humidity is ' + current.humidity + '%.')    
        }
    })
}

module.exports = forecast