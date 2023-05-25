const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");

})

app.post('/', (req, res) => {

    const query = req.body.cityName;
    const apiKey = "83529608a8daca0e84d989015344e5e9";
    const units = "metric"
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + units;
    https.get(url, (response) => {
        console.log(response.statusCode);

        response.on("data", (data) => {
            const weather = JSON.parse(data);
            const temp = weather.main.temp;
            const description = weather.weather[0].description
            const name = weather.name
            const icon = weather.weather[0].icon
            const iconURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png"

            res.write("<h1>The temperature in " + name + " is " + temp + " degrees Celsius</h1>")
            res.write("<h2>The weather is currently " + description + "</h2>")
            res.write("<img src=" + iconURL + ">");


            
            res.send();
        })
    });
})                                              

app.listen(3000, function(){
    console.log('Server running');
});





