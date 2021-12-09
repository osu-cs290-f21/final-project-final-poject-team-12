var express = require('express')
var exphbs = require('express-handlebars');
var fs = require('fs')

var gameData = require('./gameData.json')

var app = express();
var port = process.env.PORT || 8000;

app.engine('handlebars', exphbs.engine({ defaultLayout: 'main'}))
app.set('view engine', 'handlebars');

var hbs = exphbs.create({});

hbs.handlebars.registerHelper('ifCond', function(v1, v2, options) {
  if(v1 === v2) {
    return options.fn(this);
  }
  return options.inverse(this);
});

app.use(express.json())

app.use(express.static('public'));

app.get('/', function (req, res, next) {
    if(gameData){
        res.status(200).render('gamePage', 
        {
            game: gameData
        })
    } else {
        next()
    }
})

app.get('/goodJob', function (req, res, next) {
	res.status(200).render('goodJob')
})

//next turn
//post username and the turn to .json file
app.post('/nextTurn', function(req, res, next) {
    var user = req.body.user
	var board = req.body.gameData
    //var move get move that just happened
    if(user) {
        //write data to database
        
        if (req.body.endGame) {
            gameData.users = []
            gameData.gameData = ["", "", "", "", "", "", "", "", ""]
        }
        else {
            gameData.users.push(user)
            gameData.gameData = board
        }
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
        res.status(400).send("Request needs user data")
    }
    res.status(200)
})

app.get('*', function (req, res, next) {
    res.status(404).render('404', {path:req.url})
})

app.listen(port, function () {
    console.log("Server listening on port", port)
})