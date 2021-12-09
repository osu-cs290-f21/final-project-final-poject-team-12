var spaces = document.getElementsByClassName('space')
var prevCell = null
var moveFlag = false

var endGameFlag = false

for (var i = 0; i < spaces.length; i++) {
	spaces[i].removeEventListener('click', spaceClick)
	spaces[i].addEventListener('click', spaceClick)
}

function Player_O_Turn() {
	if (countNumXO() % 2 == 1) {
		return true;
	} else
		return false
}

function spaceClick(event) {
	if (event.target.textContent.indexOf('X') != -1 || event.target.textContent.indexOf('O') != -1) {
		//the cell is taken, don't do anything
	} else {
		if (prevCell != null)
			prevCell.textContent = ''
		var currClass = 'X'
		if (Player_O_Turn())
			currClass = 'O'
		event.target.textContent = currClass
		prevCell = event.target
		moveFlag = true
	}

}

function countNumXO() {
	var count = 0
	for (var i = 0; i < spaces.length; i++) {
		if (spaces[i].textContent.indexOf('X') != -1 || spaces[i].textContent.indexOf('O') != -1)
			count++
	}
	return count
}

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
function checkWin(currentClass) {
	spaces = document.getElementsByClassName('space')
	var winFlag = false
	var JSsucksFlag = false
	WINNING_COMBINATIONS.forEach(combo => {
		winFlag = true
		combo.forEach(index => {
			if (spaces[parseInt(index)].textContent.indexOf(currentClass) == -1) {
				winFlag = false
			}
		})
		if (winFlag == true) {
			JSsucksFlag = true
		}
	})
	return JSsucksFlag
}

function showMessage() {

	var message = document.getElementById('message-container');
	var messageBackdrop = document.getElementById('message-backdrop');
  
	message.classList.remove('hidden');
	messageBackdrop.classList.remove('hidden');
  
  }

function hideMessage() {
	var message = document.getElementById('message-container')
	var messageBackdrop = document.getElementById('message-backdrop')

	message.classList.add('hidden')
	messageBackdrop.classList.add('hidden')
}


function submitClick() {
	var userName = document.getElementById('username-input').value.trim()
	var tttBoard = document.getElementsByClassName('space')
	var team = 'X'
	var check = 'O'
	if (Player_O_Turn()) {
		team = 'O'
		check = 'X'
	}
	//get variables we will be passing to server

	var message = document.getElementById('winning-message-text')
	message.textContent = 'Thanks for contributing to this game!'
	//check for a winner
	if (countNumXO() == 9) {
		endGameFlag = true
		message.textContent = 'Cats Game!'
	}
	if (checkWin(check) ) {
		endGameFlag = true
		message.textContent = check + 's win!'
	}
	
	var tttArr = []
	for(var i = 0; i < tttBoard.length; i++) {
		tttArr[i] = tttBoard[i].textContent
	}

	if(!userName || !moveFlag) {
			alert("You must enter your Username and make a move");
		} else {
			
		var req = new XMLHttpRequest()
    	var url = '/nextTurn'
    	req.open('POST', url)

    	var tttObj = {
			gameData: tttArr,
			endGame: endGameFlag,
      		user: {
				userName: userName,
				team: team
			}
    	}
			
    	var reqBody = JSON.stringify(tttObj)

//    	req.addEventListener('load', function (event) {
//      	if (event.target.status === 200) {
//        	location.href = "./goodJob";
//      	} else {
//        	alert("Error entering Username: ")
//      	}
//    	})
		req.setRequestHeader('Content-Type', 'application/json')
		req.send(reqBody)

		//show thanks4playing/winner/draw message
		//clear username input
		var clearInput = document.getElementById('username-input')
		clearInput.value = "";
		showMessage()
	}
	//check if win
	//if win true showMessage
}
var submit = document.getElementById("move-submit")
submit.addEventListener('click', submitClick)

