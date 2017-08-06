const printBoard = (board) => {
  console.log(board.map(row => row.join(' | ')).join('\n'));

};

const generatePlayerBoard = (numberOfRows, numberOfColumns) => {
  let board = [];
  for(let i = 0; i < numberOfRows; i++){
    let row = [];
    for(j = 0; j < numberOfColumns; j++){
      row.push([' ']);
    }
    board.push(row);
  }

  return board;
};

const generateBombBoard = (numberOfRows, numberOfColumns, numberOfBombs) => {
  let board = [];
    for(let i = 0; i < numberOfRows; i++){
      let row = [];
      for(j = 0; j < numberOfColumns; j++){
        row.push(null);
      }
      board.push(row);
    }
  let numberOfBombsPlaced = 0;

  while(numberOfBombsPlaced < numberOfBombs){
    let randomRowIndex = Math.floor(Math.random() * numberOfRows);
    let randomColumnIndex = Math.floor(Math.random() * numberOfColumns);
    if(board[randomRowIndex][randomColumnIndex] != 'B'){
        board[randomRowIndex][randomColumnIndex] = 'B';
        numberOfBombsPlaced++;
    }
    ///may end up with bombs placed on top of bombs, likely need if/else
  };

  return board;
};

const getNumberOfNeighbourBombs = (bombBoard, rowIndex, columnIndex) => {
  const neighbourOffsets = [
    [-1, -1],[-1, 0],[-1, 1],[0, -1],[0, 1],[1, -1], [1, 0], [1, 1]
  ];
  const numberOfRows = bombBoard.length;
  const numberOfColumns = bombBoard[0].length;
  let numberOfBombs = 0;

  neighbourOffsets.forEach(offset => {
    const neighbourRowIndex = rowIndex + offset[0];
    const neighbourColumnIndex = columnIndex + offset[1];

    if(neighbourRowIndex >= 0 &&
    neighbourRowIndex < numberOfRows &&
    neighbourColumnIndex >= 0 &&
    neighbourColumnIndex < numberOfColumns){
      if(bombBoard[neighbourRowIndex] == 'B' && bombBoard[neighbourColumnIndex] == 'B'){
        numberOfBombs++;
      }
    }
  });
  return numberOfBombs;
}

const flipTile = (playerBoard, bombBoard, rowIndex, columnIndex) => {
  if(playerBoard[rowIndex][columnIndex] !== ' '){
    console.log("This tile has already been flipped");
    return
  } else if(bombBoard[rowIndex][columnIndex] == 'B'){
    playerBoard[rowIndex][columnIndex] = 'B';
  } else {
    playerBoard[rowIndex][columnIndex] = getNumberOfNeighbourBombs(bombBoard, rowIndex, columnIndex);
  }
}


let playerBoard = generatePlayerBoard(3,3);
let bombBoard = generateBombBoard(3, 4, 5);


console.log('Player Board: ');
printBoard(playerBoard);
console.log('Bomb Board: ');
printBoard(bombBoard);
flipTile(playerBoard, bombBoard, -1, 0);
console.log("Updated Player board:");
printBoard(playerBoard);
