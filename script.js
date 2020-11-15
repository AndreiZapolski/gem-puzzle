var moves = 0;
var table; 
var rows; 
var columns;
var textMoves;
var arrayForBoard;

function start()
{
  var button = document.getElementById("newGame");
  button.addEventListener( "click", startNewGame, false );
  textMoves = document.getElementById("moves");
  table = document.getElementById("table");
  rows = 4;
  columns = 4;
  startNewGame();
}

function startNewGame()
{
  var arrayOfNumbers = new Array();
  var arrayHasNumberBeenUsed;
  var randomNumber = 0;
  var count = 0;
  moves = 0;
  rows = document.getElementById("rows").value;
  columns = document.getElementById("columns").value;
  textMoves.innerHTML = moves;
  // Create the proper board size.
  arrayForBoard = new Array(rows);
  for (var i = 0; i < rows; i++)
  {
    arrayForBoard[i] = new Array(columns);
  }
  // Set up a temporary array for
  // allocating unique numbers.
  arrayHasNumberBeenUsed = new Array( rows * columns );
  for (var i = 0; i < rows * columns; i++)
  {
    arrayHasNumberBeenUsed[i] = 0;
  }
 
  // Assign random numbers to the board.
  for (var i = 0; i < rows * columns; i++)
  {
    randomNumber = Math.floor(Math.random()*rows * columns);
    // If our random numer is unique, add it to the board.
    if (arrayHasNumberBeenUsed[randomNumber] == 0) 
    {
      arrayHasNumberBeenUsed[randomNumber] = 1;
      arrayOfNumbers.push(randomNumber);
    }
    else // Our number is not unique. Try again.
    {
      i--;
    }
  }
  
  // Assign numbers to the game board.
  count = 0;
  for (var i = 0; i < rows; i++)
  {
    for (var j = 0; j < columns; j++)
    {
      arrayForBoard[i][j] = arrayOfNumbers[count];
      
      count++;
    }
  }
  showTable();
}

function showTable()
{
  var outputString = "";
  for (var i = 0; i < rows; i++)
  {
    outputString += "<tr>";
    for (var j = 0; j < columns; j++)
    {
      if (arrayForBoard[i][j] == 0)
      {
	outputString += "<td class=\"blank\"> </td>";
      }
      else
      {
	outputString += "<td class=\"tile\" onclick=\"moveThisTile(" + i + ", " + j + ")\">" + arrayForBoard[i][j] + "</td>";
      }
    } // end for (var j = 0; j < columns; j++)
    outputString += "</tr>";
  } // end for (var i = 0; i < rows; i++)
  
  table.innerHTML = outputString;
}

function moveThisTile( tableRow, tableColumn)
{
  if (checkIfMoveable(tableRow, tableColumn, "up") ||
      checkIfMoveable(tableRow, tableColumn, "down") ||
      checkIfMoveable(tableRow, tableColumn, "left") ||
      checkIfMoveable(tableRow, tableColumn, "right") )
  {
    incrementMoves();
  }
  else
  {
    alert("ERROR: Cannot move tile!\nTile must be next to a blank space.");
  }
    
  if (checkIfWinner())
  {
    alert("Congratulations! You solved the puzzle in " + moves + " moves.");
    startNewGame();
  }
}

function checkIfMoveable(rowCoordinate, columnCoordinate, direction)
{
  // The following variables an if else statements
  // make the function work for all directions.
  rowOffset = 0;
  columnOffset = 0;
  if (direction == "up")
  {
    rowOffset = -1;
  }
  else if (direction == "down")
  {
    rowOffset = 1;
  }
  else if (direction == "left")
  {
    columnOffset = -1;
  }
  else if (direction == "right")
  {
    columnOffset = 1;
  }  
  
  // Check if the tile can be moved to the spot.
  // If it can, move it and return true.
  if (rowCoordinate + rowOffset >= 0 && columnCoordinate + columnOffset >= 0 &&
    rowCoordinate + rowOffset < rows && columnCoordinate + columnOffset < columns
  )
  {
    if ( arrayForBoard[rowCoordinate + rowOffset][columnCoordinate + columnOffset] == 0)
    {
      arrayForBoard[rowCoordinate + rowOffset][columnCoordinate + columnOffset] = arrayForBoard[rowCoordinate][columnCoordinate];
      arrayForBoard[rowCoordinate][columnCoordinate] = 0;
      showTable();
      return true;
    }
  }
  return false; 
}

function checkIfWinner()
{
  var count = 1;
  for (var i = 0; i < rows; i++)
  {
    for (var j = 0; j < columns; j++)
    {
      if (arrayForBoard[i][j] != count)
      {
	if ( !(count === rows * columns && arrayForBoard[i][j] === 0 ))
	{
	  return false;
	}
      }
      count++;
    }
  }
  
  return true;
}

function incrementMoves()
{
  moves++;
  if (textMoves) // This is nessessary.
  {
    textMoves.innerHTML = moves;
  }
}

//ТАЙМЕР
window.onload = () => {
  StartStop();
}

//объявляем переменные
var base = 60;
var clocktimer, dateObj, dh, dm, ds, ms;
var readout = '';
var h = 1,
  m = 1,
  tm = 1,
  s = 0,
  ts = 0,
  ms = 0,
  init = 0;

//функция для очистки поля
function ClearСlock() {
  clearTimeout(clocktimer);
  h = 1;
  m = 1;
  tm = 1;
  s = 0;
  ts = 0;
  ms = 0;
  init = 0;
  readout = '00:00:00';
  document.MyForm.stopwatch.value = readout;
}

//функция для старта секундомера
function StartTIME() {
  var cdateObj = new Date();
  var t = (cdateObj.getTime() - dateObj.getTime()) - (s * 1000);
  if (t > 999) {
    s++;
  }
  if (s >= (m * base)) {
    ts = 0;
    m++;
  } else {
    ts = parseInt((ms / 100) + s);
    if (ts >= base) {
      ts = ts - ((m - 1) * base);
    }
  }
  if (m > (h * base)) {
    tm = 1;
    h++;
  } else {
    tm = parseInt((ms / 100) + m);
    if (tm >= base) {
      tm = tm - ((h - 1) * base);
    }
  }
  ms = Math.round(t / 10);
  if (ms > 99) {
    ms = 0;
  }
  if (ms == 0) {
    ms = '00';
  }
  if (ms > 0 && ms <= 9) {
    ms = '0' + ms;
  }
  if (ts > 0) {
    ds = ts;
    if (ts < 10) {
      ds = '0' + ts;
    }
  } else {
    ds = '00';
  }
  dm = tm - 1;
  if (dm > 0) {
    if (dm < 10) {
      dm = '0' + dm;
    }
  } else {
    dm = '00';
  }
  dh = h - 1;
  if (dh > 0) {
    if (dh < 10) {
      dh = '0' + dh;
    }
  } else {
    dh = '00';
  }
  readout = dh + ':' + dm + ':' + ds;
  document.MyForm.stopwatch.value = readout;
  clocktimer = setTimeout("StartTIME()", 1);
}

//Функция запуска и остановки
function StartStop() {
  if (init == 0) {
    ClearСlock();
    dateObj = new Date();
    StartTIME();
    init = 1;
  } else {
    clearTimeout(clocktimer);
    init = 0;
  }
}
//

window.addEventListener( "load", start, false ); // This event listener makes the function start() execute when the window opens. 