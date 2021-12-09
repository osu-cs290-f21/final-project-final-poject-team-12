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
var boardElement = document.getElementById('board')
console.log("boardElement", boardElement)
const winningMessageElement = document.getElementById('winningMessage')
const winningMessageTextElement = document.getElementById('winningMessageText')
const submitButton = document.getElementById("move-submit")
let isPlayer_O_Turn = false
var endGameFlag = false
var clickedCell = null

//x icon class
var x = "<i class= 'fa fa-times'></i>"

//o icon class
var o = "<i class='far fa-circle'></i>"

startGame()

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

	if (e.target.classList.contains(x) || e.target.classList.contains(o)) {
		//the cell is already taken, don't do anything
	} else { //cell is not taken, mark the cell and set clickedCell
		if (clickedCell != null) {
			clickedCell.classList.remove(currClass)
		} //remove currClass from our old clicked cell

		clickedCell = e.target
		clickedCell.classList.add(currClass)
	}
}

function handleSubmitClick(e) {
	//get username
	//get clicked cell
	//send data to server
	clickedCell
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
	if(!userName || clickedCell == null) {
			alert("You must enter your Username and make a move");
		} else {
		var req = new XMLHttpRequest()
    	var url = '/nextTurn' //changed from /nextTurn
    	req.open('POST', url)

		var context = {
			user: {
				team: currClass,
				userName: userName
			},
			board: boardElement,
			//endGame: endGameFlag
    	}
			
    	var reqBody = JSON.stringify(context, null, 2)
		console.log("reqBody", reqBody)

    	req.addEventListener('load', function (event) {
      	if (event.target.status === 200) {
        	// insert username into DOM !!!NEEDS CURRENT TURN
			//var moveIndicator
			if (isPlayer_O_Turn){
				var moveIndicator = "far fa-circle"
			} else{
				var moveIndicator = "fas fa-times"
			}
			//add the X or O to the clicked cell
			clickedCell.innerHTML('<i class=' + moveIndicator + '></i>')
      	} else {
        	alert("Error entering Username: ")
      	}
    	})

    req.setRequestHeader('Content-Type', 'application/json')
    req.send(reqBody)
	}
}