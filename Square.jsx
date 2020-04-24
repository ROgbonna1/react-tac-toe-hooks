const Square = ({ position, mark, handleClick }) => {
  return (
    <div className="square" onClick={() => handleClick(position)}>
      {mark}
    </div>
  );
};
