var express = require('express')
var exphbs = require('express-handlebars');
var fs = require('fs')

var app = express();
var port = process.env.PORT || 8000;

app.engine('handlebars', exphbs.engine({ defaultLayout: null })); //change to main when handlebars is done
app.set('view engine', 'handlebars');

app.use(express.json())

app.use(express.static('public'));

app.get('/', function (req, res, next) {
    res.status(200).sendFile(__dirname + '/public/index.html') //change to render(homepage) when handlebars is done
})

//next turn
//post username and the turn to .json file
app.post('/nextTurn', function(req, res, next) {
    console.log("req.body", req.body)
    var user = req.body.user //input box for username
    //var move get move that just happened
    if(user && move) {
        //write data to database
        //push data
        fs.writeFile(
            __dirname + '/gameData.json',
            JSON.stringify(gameData, null, 2),
            function (err) {
                if (!err) {
                    res.status(200).send("Turn was stored successfully")
                } else {
                    res.status(500).send("Error storing to DB")
                }
            }
        )
    } else {
        res.status(400).send("Request needs user and move data")
    }
    next()
})

app.get('*', function (req, res, next) {
    res.status(404).sendFile(__dirname, + '404.html') //change to render after handlebars is set up
})

app.listen(port, function () {
    console.log("Server listening on port", port)
})