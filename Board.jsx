const { useState } = React;

const Board = () => {
  const [board, setBoard] = useState([...Array(9).fill('')]);
  const [currentPlayer, setCurrentPlayer] = useState('X');

  const getWinner = () => {
    const winningCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const combo of winningCombos) {
      const marks = combo.map((position) => board[position])
      if (marks.every((mark) => mark === 'X') ||
          marks.every((mark) => mark === 'O')) {
        return marks[0];
      }
    }

    return null;
  };

  const winner = getWinner();

  const handleClick = (position) => {
    if (winner) {
      alert(`${winner} wins!`);
    } else {
      setBoard((oldBoard) => {
        const newBoard = [...oldBoard];
        newBoard[position] = currentPlayer;
        return newBoard;
      });

      setCurrentPlayer(() => (currentPlayer === 'X' ? 'O' : 'X'));
    }
  };


  return (
    <div className="game">
      { winner
        && <h1 className="winner"> {winner} Wins! </h1>}
      <div className="board">
        {
          board.map((_, index) => (
            <Square
              key={index}
              position={index}
              handleClick={handleClick}
              mark={board[index]}
            />
          ))
        }
      </div>
    </div>
  );
};
