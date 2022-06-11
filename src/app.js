const path = require('path')
const express  = require('express')
const hbs = require('hbs')
const request = require('request')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//Define Paths for express config
const appDirectory = path.join(__dirname,'../public')
const viewspath = path.join(__dirname,'../templates/views')
const partialspath  = path.join(__dirname,'../templates/partials')

//setup static directory to serve
app.use(express.static(appDirectory))

//setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewspath)
hbs.registerPartials(partialspath)

app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather App',
        name: 'Anurag Singh'
    })
})
 
app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About me',
        name : 'Anurag Singh'
    })
})
 app.get('/help',(req,res)=>{
     res.render('help',{
         message: 'This is the help page for your queries!',
         title: 'Help',
         name: 'Anurag Singh' 
     })
 })

// app.get('',(req,res)=>{
//     res.send('<h1>Hello Express!</h1>')
// })

// app.get('/help',(req,res)=>{

//     res.send('Help Page')
// })

// app.get('/about',(req,res)=>{
//     res.send([{ 
//         name:'Anurag'
//     },{
//         name: 'Itisha'
//     }])
// })

app.get('/weather',(req,res)=>{
    if(!req.query.address)
    {
       return res.send({
           error: 'Enter correct address for weathe forecast!'
       })
    }
    geocode(req.query.address,(error,{latitude,longitude,place}={})=>{
        if(error)
        {
            return res.send({error})
        }

        forecast(latitude,longitude,(error,forecastData)=>{
               if(error)
               {
                   return res.send({error})
               }

               res.send({
                   forecast: forecastData,
                   location: place ,
                   address: req.query.address
               })
        })

    })


    // res.send({
    //          location: 'Philadelphia',
    //          temperature: 'It is 50 degree celcius.',
    //          address: req.query.address
    // })
})

app.get('/products',(req,res)=>{
    if(!req.query.search)
    {
       return  res.send({
            error: 'You must enter a search !'
        })
    }
    console.log(req.query.search)
    res.send({
        product: []
    })
})

app.get('/title',(req,res)=>{
    res.send('<h1>Weather Forecast</h1>')
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title: 'Help error',
        name: 'Anurag Singh',
        errormessage: 'Help page not found!'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title: '404',
        name: 'Anurag Singh',
        errormessage: 'Page not found!'
    })
})

// app.listen(3000,()=>{
//     console.log('Server is on port 3000!')
// })

app.listen(port,()=>{
    console.log('Server is on port '+port)
})
