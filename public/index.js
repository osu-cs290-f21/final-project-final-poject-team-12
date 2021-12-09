const WINNING_COMBINATIONS = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6]
]
var cellElements = document.querySelectorAll('#board td')
console.log("CellElements", cellElements)
var boardElement = document.getElementById('board')
console.log("boardElement", boardElement)
var winningMessageElement = document.getElementById('winningMessage')
var winningMessageTextElement = document.getElementById('winningMessageText')
var submitButton = document.getElementById("move-submit")
var userNameInput = document.getElementById('username-input')

let isPlayer_O_Turn = false
var endGameFlag = false
var clickedCell = null
var userName = ""

//x icon class
var faX = '<i class= "fa fa-times"></i>'
var x = 'x'

//o icon class
var faO = '<i class= "far fa-circle"></i>'
var o = 'o'

var currClass = isPlayer_O_Turn ? x : o //currClass = x or o

startGame()

userNameInput.addEventListener(('change', handleUsernameEntered))


function startGame() {
	isPlayer_O_Turn = false
	cellElements.forEach(cell => { //for each ceell element
		cell.classList.remove(x)
		cell.classList.remove(o)
		cell.removeEventListener('click', handleCellClick)
		cell.addEventListener('click', handleCellClick)
	})
	setBoardHoverClass()
	winningMessageElement.classList.remove('show')
}

function swapTurns() {
	isPlayer_O_Turn = !isPlayer_O_Turn
}

function setBoardHoverClass() {
	boardElement.classList.remove(x)
	boardElement.classList.remove(o)
	if (isPlayer_O_Turn) {
		boardElement.classList.add(o)
	} else {
		boardElement.classList.add(x)
	}
}

function isDraw() {
	var flag = true;
	cellElements.forEach(cell => {
		if (!cell.classList.contains(x) && !cell.classList.contains(o))
			flag = false
	})
	return flag
}

function endGame(draw) {
	if (draw) {
		winningMessageTextElement.innerText = 'Draw!'
	} else {
		winningMessageTextElement.innerText = '${ isPlayer_O_Turn ? "O" : "X" } Wins!'
	}
	endGameFlag = true
	winningMessageElement.classList.add('show')
}

function checkWin(currentClass) {
	var winFlag = false
	var JSsucksFlag = false
	WINNING_COMBINATIONS.forEach(combo => {
		winFlag = true
		combo.forEach(index => {
			if (!cellElements[parseInt(index)].classList.contains(currentClass)) {

				winFlag = false
			}
		})
		console.log(winFlag)
		if (winFlag == true) {
			JSsucksFlag = true
		}
	})
	return JSsucksFlag
}

function handleCellClick(e) {
	var currClass = isPlayer_O_Turn ? x : o //currClass = x or o
	console.log("currClass", currClass)
	console.log("clickedCell", clickedCell)

	if (e.target.classList.contains(x) || e.target.classList.contains(o)) {
		//the cell is already taken, don't do anything
	} else { //cell is not taken, mark the cell and set clickedCell
		if (clickedCell != null) {
			clickedCell.classList.remove(currClass)
		} //remove currClass from our old clicked cell

		clickedCell = e.target
		clickedCell.classList.add(currClass)
		if (clickedCell.classList.contains(x)) {
			clickedCell.innerHTML = faX
		}
		if(clickedCell.classList.contains(o)) {
			clickedCell.innerHTML = faO
		}
	}
}

function handleUsernameEntered(event) {
	// grabs the userName text and inserts it into userName variable
	userName = event.currentTarget.value;
}

function handleSubmitClick(e) {
	//get username
	//get clicked cell
	//send data to server
	clickedCell
	if (checkWin(currClass)) {
		endGame(false)
	} else if (isDraw()) {
		endGame(true)
	} else {
		swapTurns()
		setBoardHoverClass()
	}
}

// Erik Worked on This

// Change clicked space to current turn !!!NEEDS CURRENT TURN
function submitClick() {
	var userName = document.getElementById('username-input').value.trim()
	console.log("userName", userName)
	if(!userName || clickedCell == null) {
			alert("You must enter your Username and make a move");
		} else {
		var req = new XMLHttpRequest()
    	var url = '/game' //changed from nextTurn
    	req.open('POST', url)

        
        if (isPlayer_O_Turn) {
            var userTeam = o
        } else {
            var userTeam = x
        }
		console.log("userTeam", userTeam)

		var context = {
            board: boardElement,
            users: {
                team: userTeam,
                userName: userName
            }
			//user: userName,
			//board: boardElement,
			//endGame: endGameFlag
    	}
			
    	var reqBody = JSON.stringify(context, null, 2)
        console.log("reqBody", reqBody)
        console.log("Context", context)

    	req.addEventListener('load', function (event) {
      	if (event.target.status === 200) {
        	// insert username into DOM !!!NEEDS CURRENT TURN
			boardElement = context.board //try to update board dom elem
      	} else {
        	alert("Error entering Username: ")
      	}
    	})

    req.setRequestHeader('Content-Type', 'application/json')
    req.send(reqBody)
		}
}

submitButton.addEventListener('click', submitClick)