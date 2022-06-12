const request = require('request')

const forecast = (latitude,longitude,callback)=>{
    const url = 'https://api.openweathermap.org/data/2.5/weather?lat='+latitude+'&lon='+longitude+'&appid=c0864332745cf203cae5a1477a18604c&units=metric'
    request({ url,json: true},(error,{body})=>{
        if(error){
            callback('Unable to connect to the internet!')
        }else if(body.message){
            callback('Unable to find location!')
        }else{
                callback(undefined,'The weather report is: '+body.weather[0].description+ '. The temperature is '+body.main.temp+ ' degrees out. The daily high is '+body.main.temp_max+' and daily low is '+body.main.temp_min)
                
        
        }
    })
}

module.exports=forecast