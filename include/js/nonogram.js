var answerSheet;
var size;

function makeGameBoard(boardSize) {	
	
	//i is the number of the row, j is the number of the cell
	for(i = 0; i < boardSize; i++) {		
		var line = "";
		for(j = 0; j < boardSize; j++) {
			if(j == 0) line += "<tr>";			
			line += ("<td id=c_" + i + "_" + j + " onclick='flipBox(this)'></td>");
		}
		line += "</tr>";
		$("#gameBoard").append(line);
	}
	size = boardSize;
	answerSheet = createRows(boardSize,boardSize);
	answerSheet = checkEmpty(answerSheet); //Check if any rows or columns do not have any entries in them
	//populateRows(answerSheet);
	generateLabels(answerSheet);
}

//Return a multidimensional array of booleans with true representing cells that must be "on"
//	and false representing cells that must be "off" 
function createRows(numRows, rowLength) {
	var count;
	var countString;
	var rows = [];

	for(i = 0; i < numRows; i++) {
		count = 0;
		countString = "";

		//Create a new row, and then randomly add an on or off cell up to the length of the row
		rows.push(new Array()); 
		for(n = 0; n < rowLength; n++) {
			if(Math.random() > 0.5) 
				rows[i].push(true);
			else 
				rows[i].push(false);
		}
	}
	return rows;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//Checks to see if any rows or columns are empty and fixes it if that's the case
function checkEmpty(answerSheet) {
	var numOn;
	//Check for empty rows
	for(i = 0; i < answerSheet.length; i++) {
		numOn = 0;
		for(n = 0; n < answerSheet[i].length; n++) {
			if(answerSheet[i][n]) 
				numOn++;
		}
		if(numOn < 1) {
			chosenOne = getRandomInt(0, answerSheet[i].length - 1);
			answerSheet[i][chosenOne] = true;
		}
	}
	//Check for empty columns
	for(n = 0; n < answerSheet.length; n++) {
		numOn = 0;
		for(i = 0; i < answerSheet[n].length; i++) {
			if(answerSheet[n][i]) 
				numOn++;
		}
		if(numOn < 1) {
			chosenOne = getRandomInt(0, answerSheet.length - 1);
			answerSheet[n][chosenOne] = true;
		}
	}

	return answerSheet;
}

//Takes a 2D array, parses it, and populates the solved gameboard to make it easier to debug
function populateRows(rows) {
	for(i = 0; i < rows.length; i++) {
		for(n = 0; n < rows[i].length; n++){
			var cell = "#c_" + i + "_" + n;
			if(rows[i][n] == true)
				$(cell).append('<div class="on"/>');
		}
	}
}

function generateLabels(rows) {
	var label;
	var labelCount;

	//Generate row labels
	for(i = 0; i < rows.length; i++) {
		var cell;
		label = "";
		labelCount = 0;
		for(n = 0; n < rows[i].length; n++){
			cell = "#c_" + i + "_" + n;
			if(rows[i][n] == true)
				labelCount++;
			else if(labelCount > 0){
				label += labelCount;
				label += " ";
				labelCount = 0;
			}
		}
		if(labelCount > 0) 
			label += labelCount;
			
		$(cell).parent().prepend("<td>" + label + "</td>");
	}

	//Generate column labels
	var firstRow = $("<tr><td></td></tr>");
	for(n = 0; n < rows[0].length; n++) {
		label = "";
		labelCount = 0;

		for(i = 0; i < rows.length; i++) {
			if(rows[i][n] == true)
				labelCount++;
			else if (labelCount > 0) {
				label += labelCount;
				label += "<br>";
				labelCount = 0;
			}
		}
		if(labelCount > 0)
			label += labelCount;

		firstRow.append("<td>" + label + "</td>");
	}

	$("#gameBoard").prepend(firstRow);
}

function flipBox(caller) {
	var cell = $(caller);
	if(cell.children().length > 0) {
		cell.empty();
	}
	else {
		cell.append('<div class="on"/>');
	}
}

function solve() {
	var rows = [];
	for(i = 0; i < size; i++) {
		rows.push(new Array());
		for(n = 0; n < size; n++){
			var cell = "#c_" + i + "_" + n;
			if($(cell).children().length > 0) {
				rows[i].push(true);
			}
			else{
				rows[i].push(false);
			}
		}
	}
	var solved = true;
	for(i = 0; i < rows.length; i++) {
		for(n = 0; n < rows[i].length; n++) {
			if(rows[i][n] != answerSheet[i][n])
				solved = false;
		}
	}
	if(solved) window.alert("You did it!");
	else window.alert("Nope, keep trying");
}