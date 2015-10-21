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
	populateRows(createRows(5, 5));
}

//Return a multidimensional array of booleans with true representing cells that must be "on"
//	and false representing cells that must be "off" 
function createRows(numRows, rowLength) {
	var rows = new Array(new Array());
	for(i = 0; i < numRows; i++) {
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

//Takes a multidimensional array, parses it, and modifies the gameboard accordingly
function populateRows(rows) {
	for(i = 0; i < rows.length; i++) {
		for(n = 0; n < rows[i].length; n++){
			var cell = "#c_" + i + "_" + n;
			//console.log("Cell: " + cell + " Value: " + rows[i][n]);
			if(rows[i][n] == true)
				//$(cell).addClass("on");
			$(cell).append('<div class="on"/>');
		}
	}
}
