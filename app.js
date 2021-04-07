

const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static("public"));


app.get("/",function(req, res)
{
    res.sendFile("index.html");
})

app.post("/",function(req, res)
{

    const query = req.body.cityInput;
    const appId = "e7e203224b2bbd33aa31ed2d79d5e055";
    const unit = "metric";

    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+ appId + "&units=" + unit;

    https.get(url, function(response)
    {
        response.on("data", function(data)
        {
                const jsonData = JSON.parse(data);
                const temp = jsonData.main.temp;
                const weather = jsonData.weather[0].description;
                const icon = jsonData.weather[0].icon;
                const imageURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
                res.write("<h1>The temp in " + query + " is " + temp + " degree</h1>");
                res.write("<p>Thew weather is currently " + weather + "</p>" );
                res.write("<img src = "+ imageURL +" >");
                res.send();
        })
    })

})

app.listen(process.env.PORT || 3000, function()
{
    console.log("Started 3000");
})
