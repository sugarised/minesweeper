class Game {
  constructor(numberOfRows, numberOfColumns, numberOfBombs){
    this._board = new Board(numberOfRows, numberOfColumns, numberOfBombs);
  }

  playMove(rowIndex, columnIndex){
    this._board.flipTile(rowIndex, columnIndex);

    if (this._board.playerBoard[rowIndex][columnIndex] === 'B') {
      console.log("Game Over");
      this._board.print(this._board.playerBoard);
    } else if (this._board.hasSafeTiles()) {
      console.log("You've won!");
    } else {
      console.log("Current Board:");
      this._board.print(this._board.playerBoard);
    }
  }
};

class Board {
  constructor(numberOfRows, numberOfColumns, numberOfBombs) {
    this._numberOfBombs = numberOfBombs;
    this._numberOfTiles = numberOfColumns * numberOfRows;
    this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
    this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
  }
    get playerBoard(){
      return this._playerBoard;
    }

    flipTile(rowIndex, columnIndex){
      if(this._playerBoard[rowIndex][columnIndex] !== ''){
        console.log("This tile has already been flipped");
        return
      } else if(this._bombBoard[rowIndex][columnIndex] == 'B'){
        this._playerBoard[rowIndex][columnIndex] = 'B';
      } else {
        this._playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighbourBombs(rowIndex, columnIndex);
      }
      this._numberOfTiles--;
    };


    getNumberOfNeighbourBombs(rowIndex, columnIndex) {
      const neighbourOffsets = [
        [-1, -1],[-1, 0],[-1, 1],[0, -1],[0, 1],[1, -1], [1, 0], [1, 1]
      ];
      const numberOfRows = this._bombBoard.length;
      const numberOfColumns = this._bombBoard[0].length;
      let numberOfBombs = 0;

      neighbourOffsets.forEach(offset => {
        const neighbourRowIndex = rowIndex + offset[0];
        const neighbourColumnIndex = columnIndex + offset[1];

        if(neighbourRowIndex >= 0 &&
        neighbourRowIndex < numberOfRows &&
        neighbourColumnIndex >= 0 &&
        neighbourColumnIndex < numberOfColumns){
          if (bombBoard[neighborRowIndex][neighborColumnIndex] === 'B'){
            numberOfBombs++;
          }
        }
      });
      return numberOfBombs;
    };

    hasSafeTiles(){
      return this._numberOfTiles !== this._numberOfBombs;
    }

    print(board) {
     return board.map(row => row.join(" | ")).join("\n");
    };

    static generatePlayerBoard(numberOfRows, numberOfColumns){
      let board = [];
      for(let i = 0; i < numberOfRows; i++){
        let row = [];
        for(let j = 0; j < numberOfColumns; j++){
          row.push(" ");
        }
        board.push(row);
      }

      return board;
    };

    static generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs){
      let board = [];
        for(let i = 0; i < numberOfRows; i++){
          let row = [];
          for(let j = 0; j < numberOfColumns; j++){
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
    }


}


const g = new Game(3, 3, 3);
g.playMove(0,0);
