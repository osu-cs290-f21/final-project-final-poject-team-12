// Erik Worked on This

// Change clicked space to current turn !!!NEEDS CURRENT TURN
function spaceClick(event){
	event.currentTarget.textContent = "O"
}

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


var space = document.getElementsByClassName('space')
for(var i = 0; i< space.length; i++) {
	space[i].addEventListener('click', spaceClick)
}

var submit = document.getElementById("move-submit")
submit.addEventListener('click', submitClick)