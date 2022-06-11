const request = require('request')


const geoCode = (address,callback)=>{
    const geoCodeurl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address +'.json?access_token=pk.eyJ1IjoiYW51cmFnMTQwOSIsImEiOiJjbDNwZDNqMXYweDdzM2NsOG9veGpubWd2In0.kbf-Eav3SkbCD9N7-xkMaA'
    request({url: geoCodeurl,json: true},(error,{body})=>{
         if(error)
         {
            callback('Unable to connect to internet!')
         }else if(body.features.length===0){
            callback('Unable to find location! Try another search.')
         }else{
            callback(undefined,{
                 latitude: body.features[0].center[1],
                 longitude: body.features[0].center[0],
                 place: body.features[0].place_name

            })
         }
    })
}

module.exports=geoCode