function makeGameBoard(boardSize) {	
	
	//i is the number of the row, j is the number of the cell
	for(i = 0; i < boardSize; i++) {		
		var line = "";
		for(j = 0; j < boardSize; j++) {
			if(j == 0) line += "<tr>";			
			line += ("<td id=c_" + i + "_" + j + "></td>");
		}
		line += "</tr>";
		$("#gameBoard").append(line);
	}
	var answerSheet = createRows(boardSize,boardSize);
	populateRows(answerSheet);
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

	for(i = 0; i < rows.length; i++) {
		label = "";
		labelCount = 0;
		for(n = 0; n < rows[i].length; n++){
			var cell = "#c_" + i + "_" + n;
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
}