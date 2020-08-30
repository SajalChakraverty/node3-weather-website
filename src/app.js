const path=require('path')
const express=require('express')
const hbs= require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')
const app=express()
const port=process.env.PORT || 3000
const publicDirectoryPath=path.join(__dirname,'../public')
const viewPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')
app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialsPath)
app.use(express.static(publicDirectoryPath)) 
app.get('',(req,res) => {
    res.render('index',{
        title: 'Weather',
        name: 'Sajal'
    })
})
app.get('/about',(req,res) => {
    res.render('about',{
        title: 'About the Creator',
        name: 'Sajal'
    })
})
app.get('/help',(req,res) => {
    res.render('help',{
        helpText: 'Some helpful Text',
        title:'Help',
        name: 'Sajal'
    })
})
app.get('/weather', (req,res) => {
    if(!req.query.address){
        return res.send({
            error: 'You Must Provide an adresss'
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location} ={}) => {
        if(error){
            return res.send({error})
        }
        forecast(latitude,longitude,(error,forecastData) => {
            if(error){
                return res.send({error})
            }
            res.send({
                forecast : forecastData,
                location,
                address : req.query.address
            })
        })
    })
})
app.get('/products',(req,res) => {
    if(!req.query.search){
        return res.send({
            error: 'You Must Provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})
app.get('/help/*',(req,res)=> {
    res.render('404',{
        title:'404',
        name: 'Sajal',
        errorMessage: ' Help Article Not Found'
    })

})
app.get('*',(req,res)=> {
    res.render('404',{
        title:'404',
        name: 'Sajal',
        errorMessage: 'Page Not Found'
    })

})
app.listen(port, () => {
        console.log('Server is up on port '+ port)
})