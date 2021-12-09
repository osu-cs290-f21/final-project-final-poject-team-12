var express = require('express')
var bodyParser = require('body-parser')
var exphbs = require('express-handlebars');
var fs = require('fs')

var gameData = require('./gameData')

var app = express();
var jsonParser = bodyParser.json()
var port = process.env.PORT || 8000;


app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use(express.json())
app.use(express.static('public'));


app.get('/game', function (req, res, next) {
    console.log('what')
    res.status(200).render('gamePage', {
        board: gameData.board
    })
})


app.post('/nextTurn', jsonParser, function(req, res, next) {
    var user = req.body.user 
    var board = req.body.board
    var endGame = req.body.endGame

    if (user && board) {
        if(!endGame)
            gameData.users.push(user)
        else
            gameData.users = []
        gameData.board = board
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
    res.status(200)
})

app.get('*', function (req, res, next) {
    res.status(404).sendFile(__dirname, + '404.html') //change to render after handlebars is set up
})

app.listen(port, function () {
    console.log("Server listening on port", port)
})