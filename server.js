var express = require('express')
var exphbs = require('express-handlebars');
var fs = require('fs')

var gameData = require('./gameData.json')
console.log("gameData", gameData)

var app = express();
var port = process.env.PORT || 8000;

app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use(express.json())

app.use(express.static('public'));

//get root directory
app.get('/game', function (req, res, next) {
    console.log("req.params", req.params)
    if(gameData){
        console.log("Root Directory")
        res.status(200).render('gamePage', 
        {
            game: gameData
        })
    } else {
        next()
    }
})

//next turn
//post username and the board to .json file
//maybe path should be /nextTurn
app.post('/game', function(req, res, next) {
    console.log("req.body", req.body)
    var users = req.body.user //input box for username
    console.log("users", users)
    var board = req.body.board
    console.log("board", board)
    //var move get move that just happened
    //change to board and users
    if(users && board) {
        console.log("INSIDE POST IF")
        gameData[users].push({
            team: users.team,
            username: users.username
        })
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
        res.status(400).send("Request needs user and board data")
    }
    next()
})

//render 404 layout
app.get('*', function (req, res, next) {
    res.status(404).render('404', {
        path: req.url
    })
})

app.listen(port, function () {
    console.log("Server listening on port", port)
})