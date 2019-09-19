const request = require('request')

const forecast = (longitude, altitude, callback) => {
    const url = 'https://api.darksky.net/forecast/38a72ebbc3deef3c57447afb849785e5/' + encodeURIComponent(longitude) + ',' + encodeURIComponent(altitude) + '?units=si'
    
    request({ url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            const degrees = body.currently.temperature
            const chanceOfRain = body.currently.precipProbability
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + degrees + ' degrees out. There is a ' + chanceOfRain + '% chance of rain.')
        }
    })
}

module.exports = forecast