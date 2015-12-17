function buildMaze(width, height) {
  document.write("<html><style type=\"text/css\">.b { background:black;color:black} ");
  document.write(".w { color:white;background:white }</style><body>");
  var error = 0;
  if ( (parseInt(width) < 5) || (parseInt(height) > 20) ) {
      document.write("<p>The width entered ("+width+") must be between 5 and 20. Hit back to try again.</p>");
      error=1;
    }
  if ( (parseInt(height) < 5) || (parseInt(height) > 20) ) {
    document.write("<p>The height entered ("+height+") must be between 5 and 20. Hit back to try again.</p>");
    error=1;
    }
  if (error == 0) {
    var Maze = new Object();
    Maze.height = height;
    Maze.width = width;
    createMaze(Maze);
    displayMaze(Maze);
    }
  else document.write("<p>Use the browsers back button to try again.</p>");
  document.write("</body></html>");
}

function createMaze(Maze) {
  Maze.length = parseInt(Maze.height) * parseInt(Maze.width);
  Maze.visited = Maze.length - 1;
  Maze.currentX = 0; // Current x position in maze
  Maze.currentY = 0; // Current y position in maze
  Maze.choices = 2; // Number of directions available to move
  Maze.directions = 6 // Directions can move in 1 = North, 2 = East, 4 = South, 8 = West
  Maze.direction = 0; // Direction to move in (1 = north, 2 east, 3 south, 4 west)
  Maze.data = new Array( Maze.length ); // Actual maze data
  Maze.scanXstart = 0;
  Maze.scanYstart = 0;
for (i = 0; i < Maze.length; i++)
  Maze.data[i] = 0;
while (Maze.visited > 0) {
  if (parseInt(Maze.choices) == 0) {
    jumpToNewPos(Maze);
  }
  selectDirection(Maze);
  moveInDirection(Maze);
  investigateCurrentPosition(Maze);
  Maze.visited--;
  }
}

function jumpToNewPos(Maze) {
  for (y = Maze.scanYstart; y < Maze.height; y++) {
    for(x = Maze.scanXstart; x < Maze.width; x++) {
      Maze.currentX = x;
      Maze.currentY = y;
      investigateCurrentPosition(Maze);
        if ( (locationVisited( Maze, 0, 0 ) != 0) && (Maze.choices > 0) ) {
          Maze.scanXstart = x;
          return;
        }
      }
      Maze.scanXstart = 0;
      Maze.scanYstart = y+1;
    }
    document.write("<p>All locations visited and nowhere to go</p>");
    Maze.visited = 0;
}

function moveInDirection(Maze) {
  var offset = getOffset(Maze, Maze.currentX, Maze.currentY);
  if (Maze.direction == 1) {
    Maze.data[offset] |= 1;
    Maze.currentY--;
    offset = getOffset(Maze, Maze.currentX, Maze.currentY);
    Maze.data[offset] |= 4;
  }
else if (Maze.direction == 2) {
    Maze.data[offset] |= 2;
    Maze.currentX++;
    offset = getOffset(Maze, Maze.currentX, Maze.currentY);
    Maze.data[offset] |= 8;
}
else if (Maze.direction == 3) {
    Maze.data[offset] |= 4;
    Maze.currentY++;
    offset = getOffset(Maze, Maze.currentX, Maze.currentY);
    Maze.data[offset] |= 1;
}
else if (Maze.direction == 4) {
    Maze.data[offset] |= 8;
    Maze.currentX--;
    offset = getOffset(Maze, Maze.currentX, Maze.currentY);
    Maze.data[offset] |= 2;
}
else
    document.write("no direction selected : Maze.direction = "+Maze.direction+"<br>");
}


function investigateCurrentPosition(Maze) {
// Determine the number of directions we can move in and what they are
  Maze.directions = 0;
  Maze.choices = 0;
  Maze.direction = 0;
// Check north direction
  if ( (Maze.currentY > 0) && (!locationVisited(Maze, 0, -1)) ) {
    Maze.choices++;
    Maze.directions |= 1;
  }
// Check east direction
  if ( (Maze.currentX < (Maze.width-1)) && (!locationVisited(Maze, 1, 0)) ) {
    Maze.choices++;
    Maze.directions |= 2;
  }
// Check south direction
  if ( (Maze.currentY < (Maze.height-1)) && (!locationVisited(Maze, 0, 1)) ) {
    Maze.choices++;
    Maze.directions |= 4;
  }
// Check west direction
  if ( (Maze.currentX > 0) && (!locationVisited(Maze, -1, 0)) ) {
    Maze.choices++;
    Maze.directions |= 8;
  }
// document.write("("+Maze.currentX+","+Maze.currentY+") - choices = "+Maze.choices+" - directions = "+Maze.directions+"<br>");
}


function locationVisited(Maze, xdiff, ydiff) {
  if (Maze.data[ getOffset(Maze, Maze.currentX+xdiff, Maze.currentY + ydiff) ] != 0)
    return true;
  else
    return false;
}

function getOffset(Maze, x, y) {
  return ((Maze.width*y) + x);
}

function selectDirection(Maze) {
// Generate a number between 0 and Maze.choices - 1
// e.g. parseInt( Math.random() * 5 ) gives numbers between 0 and 4
  var dirList = new Array( Maze.choices );
  var pos = 0;
  if ((Maze.directions&1) != 0) {
    dirList[pos] = 1;
    pos++;
  }
  if ((Maze.directions&2) != 0) {
    dirList[pos] = 2;
    pos++;
  }
  if ((Maze.directions&4) != 0) {
    dirList[pos] = 3;
    pos++;
  }
  if ((Maze.directions&8) != 0) {
    dirList[pos] = 4;
    pos++;
  }
  if (pos != Maze.choices)
  document.write("Exits counted ("+pos+") is != exit choices ("+Maze.choices+"<br>");
  var pos = parseInt( Math.random() * Maze.choices );
  Maze.direction = dirList[pos];
}


function displayMaze(Maze) {
  document.write("<code><p>");
  var line = "";
  for (y = 0; y < Maze.height; y++) {
      line = "";
      for(x = 0; x < Maze.width; x++) {
        var offset = getOffset(Maze, x, y);
        if ( Maze.data[offset]&1 != 0 )
          line += "<span CLASS=\"b\">&nbsp</span><span CLASS=\"w\">#</span>";
        else
          line += "<span CLASS=\"b\">&nbsp&nbsp</span>";
    }
    line += "<span CLASS=\"b\">&nbsp</span>";
    document.write( line + "<br>");
    line = "";
    for(x = 0; x < Maze.width; x++) {
      var offset = getOffset(Maze, x, y);
      if ((Maze.data[offset]&8) != 0)
        line += "<span class=\"w\">##</span>";
      else
        line += "<span CLASS=\"b\">#</span><span CLASS=\"w\">#</span>";
      }
      line += "<span CLASS=\"b\">#</span>";
      document.write( line + "<br>");
    }
    for (x = 0; x < Maze.width; x++)
      document.write("<span CLASS=\"b\">##</span>");
      document.write("<span CLASS=\"b\">#</span><br></code></p>");
    }
