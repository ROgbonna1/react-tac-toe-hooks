const { useState } = React;

const Square = ({
  position, currentPlayer, setCurrentPlayer, board, setBoard, winner,
}) => {
  const [mark, setMark] = useState('');

  const handleClick = () => {
    setMark(currentPlayer);

    setBoard(() => {
      board[position] = currentPlayer;
      return [...board];
    });

    setCurrentPlayer(() => (currentPlayer === 'X' ? 'O' : 'X'));
  };

  return (
    <div className="square" onClick={winner ? null : handleClick}>
      {mark}
    </div>
  );
};

const Board = () => {
  const [board, setBoard] = useState([...Array(9).keys()]);
  const [currentPlayer, setCurrentPlayer] = useState('X');

  const getWinner = () => {
    const winningCombos = ['012', '345', '678', '036', '147', '258', '048', '246'];

    const xSpots = board.reduce((combo, mark, index) => {
      if (mark === 'X') combo += index;
      return combo;
    }, '');

    const oSpots = board.reduce((combo, mark, index) => {
      if (mark === 'O') combo += index;
      return combo;
    }, '');

    if (winningCombos.includes(xSpots)) {
      return 'X';
    }

    if (winningCombos.includes(oSpots)) {
      return 'O';
    }
  };

  const winner = getWinner();

  return (
    <div className="game">
      { winner
        && <h1 className="winner">{winner} Wins!</h1>}
      <div className="board">
        {
          board.map((_, index) => (
            <Square
              key={index.toString()}
              position={index}
              currentPlayer={currentPlayer}
              setCurrentPlayer={setCurrentPlayer}
              board={board}
              setBoard={setBoard}
              winner={winner}
            />
          ))
        }
      </div>
    </div>
  );
};

ReactDOM.render(<Board />, document.querySelector('.container'));
