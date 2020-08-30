const request = require('request')

const forecast = (latitude, longitude, callback) => {
  const apiKey = '00f22de67cd34196a3526e585985e6e2'
  const url = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
  request({
    url,
    json: true
  }, (error, {body}) => {
    if (error) {
      callback('Unable to connect forecast service!', undefined)
    } else if (body.name == undefined) {
      console.log('Unable to find location!')
    } else {
      callback(undefined,`Current temperature is ${body.main.temp},Cloud coverage is ${body.clouds.all}%`)
    }
  })
}

module.exports =  forecast