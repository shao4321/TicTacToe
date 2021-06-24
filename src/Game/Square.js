const SquareButton = (props) => {
  const radius = "10px";

  const assignBorderRadius = () =>
    props.id === 0
      ? `${radius} 0 0 0`
      : props.id === 6
      ? `0 0 0 ${radius}`
      : props.id === 2
      ? `0 ${radius} 0 0`
      : props.id === 8
      ? `0 0 ${radius} 0`
      : "0";

  return (
    <button
      className="square"
      style={{
        backgroundColor: `${props.win && "#c0be2d"}`,
        borderRadius: assignBorderRadius(),
      }}
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
};

const Square = (props) => {
  return props.winline && props.winline.indexOf(props.id) !== -1 ? (
    <SquareButton {...props} win={true} />
  ) : (
    <SquareButton {...props} />
  );
};

export default Square;
