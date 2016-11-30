var size = 50;

// var cells = new Array(size).fill(new Array(size).fill(false));
var cells = createCells();

function createCells() {
  var cells = [];

  for (var i = 0; i < size; i++) {

    cells.push([]);

    for (var j = 0; j < size; j++) {
      cells[i].push(false);
    }
  }

  return cells;
}
cells[0][2] = true;
cells[1][2] = true;
cells[1][0] = true;
cells[2][1] = true;
cells[2][2] = true;


function draw(){
  for(var i = 0; i<cells.length; i++) {
    console.log(cells[i].map(function(cell) {
      if(cell) {
        return "X";
      }
      return "."
    })
    .join(' '))
  }
}

function drawNeighbours(){
  for(var i = 0; i<cells.length; i++) {
    console.log(cells[i].map(function(cell, j) {
      // return "[" + i + ", " + j + "]";
      return neighbours(i, j);
    })
    .join(' '))
  }
}

// Returns number of populated surrounding cells.
function neighbours(x, y) {
  var count = 0;
  for (var i = -1; i <= 1; i++) {
    for (var j = -1; j <= 1; j++) {
      if (i === 0 && j === 0)
        continue;

      var currentX = x + i;
      var currentY = y + j;

      var currentCell = getCell(currentX, currentY);

      if (currentCell)
        count++;
    }
  }
  return count;
}

// function getCell(x, y) {
//   var row = cells[x];
//   if (row === undefined)
//     return undefined;
//   else {
//     return row[y];
//   }
// }

function getCell(x, y) {
  if (x < 0)
    x += size;
  if (y < 0)
    y += size;
  if (x >= size)
    x -= size;
  if (y >= size)
    y -= size;
  return cells[x][y];
}

// function update() {
//   for (var i = 0; i < cells.length; i++) {
//     for (var j = 0; j < cells[i].length; j++) {
//       var n = neighbours(i, j);
//       var cell = cells[i][j];
//
//       if (cell) {
//         // If alive.
//
//         // var newCell = n > 1 && n < 4;
//         // cells[i][j] = newCell;
//
//         if (n > 1 && n < 4) {
//           cells[i][j] = true;
//         } else {
//           cells[i][j] = false;
//         }
//
//       }
//       else {
//         // If dead.
//         if (n === 3)
//           cells[i][j] = true;
//       }
//     }
//
//   }
// }

// function update() {
//   cells = cells.map((row, i) => {
//     return row.map((cell, j) => {
//       var n = neighbours(i, j);
//       if (cell) {
//         return n > 1 && n < 4;
//       } else {
//         return n === 3;
//       }
//     })
//   });
// }

function update() {
  cells = cells.map((row, i) => {
    return row.map((cell, j) => {
      return updateCell(i, j);
    })
  });
}

function updateCell(x, y) {
  var n = neighbours(x, y);
  if (cells[x][y]) {
    return n > 1 && n < 4;
  } else {
    return n === 3;
  }
}

//update();
//console.log("Cells:")
//draw();

// console.log("Neighbours:")
// drawNeighbours();
//
// console.log("before")
// draw();
// console.log("after")
// update();
// draw();

setInterval(function() {
  console.log()
  console.log();
  draw();
  update();
}, 250)
