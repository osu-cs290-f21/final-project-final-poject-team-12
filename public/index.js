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
const submitButton = document.getElementById("move-submit")
let isPlayer_O_Turn = false
var endGameFlag = false
var prevCell = null



function startGame() {
	isPlayer_O_Turn = false
	cellElements.forEach(cell => { //for each cell element
		cell.classList.remove('x')
		cell.classList.remove('o')
		cell.removeEventListener('click', handleCellClick)
		cell.addEventListener('click', handleCellClick)
	})
	setBoardHoverClass()
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
	endGameFlag = true
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
	var currClass = isPlayer_O_Turn ? 'x' : 'o' //currClass = 'x' or 'o'

	if (e.target.classList.contains('x') || e.target.classList.contains('o')) {
		//the cell is already taken, don't do anything
	} else { //cell is not taken, mark the cell and set clickedCell
		if (prevCell != null)
			prevCell.classList.remove(currClass)
		e.target.classList.add(currClass)
		prevCell = e.target
	} //remove currClass from our old clicked cell

}

function handleSubmitClick(e) {
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
	if(!userName || prevCell == null) {
			alert("You must enter your Username and make a move");
		} else {
		var req = new XMLHttpRequest()
    	var url = '/nextTurn'
    	req.open('POST', url)

		var context = {
			user: userName,
			board: boardElement.outerHTML,
			endGame: endGameFlag
    	}
    	var reqBody = JSON.stringify(context)

    	req.addEventListener('load', function (event) {
			if (event.target.status === 200) {
        	// insert username into DOM !!!NEEDS CURRENT TURN
      	} else {
        	alert("Error entering Username: ")
      	}
    	})

		req.setRequestHeader('Content-Type', 'application/json')
		console.log('req.body from client:', reqBody)
		req.send(reqBody)
		}
}

submitButton.addEventListener('click', submitClick)
