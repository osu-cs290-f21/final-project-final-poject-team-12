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
const cellElements = document.querySelectorAll('#board td')
const boardElement = document.getElementById('board')
const winningMessageElement = document.getElementById('winningMessage')
const winningMessageTextElement = document.getElementById('winningMessageText')
const submitButton = document.getElementById("move-submit")
let isPlayer_O_Turn = false

startGame()

function startGame() {
	isPlayer_O_Turn = false
	cellElements.forEach(cell => { //for each ceell element
		cell.classList.remove('x')
		cell.classList.remove('o')
		cell.removeEventListener('click', handleCellClick)
		cell.addEventListener('click', handleCellClick, { once: true })
	})
	setBoardHoverClass()
	winningMessageElement.classList.remove('show')
}

function swapTurns() {
	isPlayer_O_Turn = !isPlayer_O_Turn
}

function setBoardHoverClass() {
	boardElement.classList.remove('x')
	boardElement.classList.remove('o')
	if (isPlayer_O_Turn) {
		boardElement.classList.add('o')
	} else {
		boardElement.classList.add('x')
	}
}

function isDraw() {
	var flag = true;
	cellElements.forEach(cell => {
		if (!cell.classList.contains('x') && !cell.classList.contains('o'))
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
	const cell = e.target
	const currentClass = isPlayer_O_Turn ? 'x' : 'o'
	cell.classList.add(currentClass)
	if (checkWin(currentClass)) {
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
	var tttBoard = document.getElementById('board')
	if(!userName) {
			alert("You must enter your Username");
		} else {
			
			var req = new XMLHttpRequest()
    	var url = '/nextTurn'
    	req.open('POST', url)

    	var tttObj = {
      	user: userName,
      	board: tttBoard
    	}
			
    	var reqBody = JSON.stringify(tttObj)

    	req.addEventListener('load', function (event) {
      	if (event.target.status === 200) {
        	// insert username into DOM !!!NEEDS CURRENT TURN
      	} else {
        	alert("Error entering Username: ")
      	}
    	})

    req.setRequestHeader('Content-Type', 'application/json')
    req.send(reqBody)
		}
}
