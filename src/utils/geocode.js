const request=require('request')
const mapbox_access_token = 'pk.eyJ1Ijoic2FqYWw2Njg5IiwiYSI6ImNrZTVsYnl1bDBrM2kycHJ6MnQyZ3k1ZjgifQ.pxVad7lo7WZWR_1Z2uVVaA'
const geocode = (address, callback) => {
  const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURI(address) + '.json?access_token=' + mapbox_access_token + '&limit=1'
  request({
    url,
    json: true
  }, (error, {body}) => {

    if (error) {
      callback('Unable to connect to location service!', undefined)
    } else if (body.features.length === 0) {
      callback('Unable to find location,Try another search!!', undefined)
    } else {
      const latitude = body.features[0].center[1]
      const longitude = body.features[0].center[0]
      callback(undefined,{
        latitude:latitude,
        longitude:longitude,
        location:body.features[0].place_name
      })
    }
  })
}
module.exports=geocode
