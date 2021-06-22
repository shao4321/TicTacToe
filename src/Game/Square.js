const Square = (props) => {
  const wonSquare = (
    <button
      className="square"
      style={{ backgroundColor: "yellow" }}
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
  const unWonSquare = (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
  return props.winline && props.winline.indexOf(props.id) !== -1
    ? wonSquare
    : unWonSquare;
};

export default Square;
