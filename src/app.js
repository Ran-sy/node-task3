const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const path = require("path");
const hbs = require('hbs')

app.set('view engine', 'hbs')

const publicDirectory = path.join(__dirname, "../public")
const viewsDirectory = path.join(__dirname ,"../template/views")
const partialDirectory = path.join(__dirname, "../template/partials")

app.use(express.static(publicDirectory))
hbs.registerPartials(partialDirectory);

app.set("views", viewsDirectory)

app.get('/', (req, res)=>{
    res.render('index', {
        headerTitle: "HOME",
        title: "HOME",
        desc: "dynamic home page"
    })
})
// for static pages use app.send
// for dynamic pages use app.render

// app.get('/data', (req, res)=>{
//     res.send("<h2>title</h2> <button>Send Data</button>")
// })
// app.get('/about', (req, res)=>{
//     res.render('about', {
//         headerTitle: "ABOUT",
//         title: "ABOUT US",
//         desc: "this is about us dynamic page"
//     })
// })
// app.get('/team', (req, res)=>{
//     res.render('team', {
//         headerTitle: "TEAM",
//         title: "OUR TEAM",
//         desc: "this is team dynamic page"
//     })
// })
//////////////////////////////////

const geocode = require('./tools/geocode');
const forcast = require('./tools/weather');

app.get('/weather', (req, res)=>{
    if(!req.query.address){
        return res.send({
            error: "you must provide address"
        })
    }else{
        geocode(req.query.address, (error, data)=>{
            if(error)return res.send({error})
            else{
            forcast(data.longtitude, data.latitude, (error, forcastData)=>{
                if(error) return res.send({error})
                else{
                    res.send({
                        forcast: forcastData, 
                        location: req.query.address
                    })
                }
            })
            }
        })
        // console.log(`location: ${req.query.address}`);
        // console.log(`forcast: cold`)
        // res.send({
        //     address: req.query.address,
        //     forcast: 'cold'
        // })
    }
})

//////////////////////////////////
app.get('*', (req, res)=>{
    res.send('ERROR 404: page not found')
})

app.listen(port, ()=>{
    console.log(`Listening to port ${port}`)
})