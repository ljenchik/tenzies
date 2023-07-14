const RandomNumberButton = (props) => {

  const dots = [];
  for (let i = 0; i < props.value; i++) {
    dots.push(i);
  }

  return (
    <button
      className={
        props.isHeld ? "random-number-button clicked" : "random-number-button"
      }
      onClick={props.onDiceClick}
    >
        <div className="dot-container">
        <div className="face">
        {dots.map(() => (
          <span className="pip"></span>
        ))}
      </div>
        </div>
     
    </button>
  );
};

export default RandomNumberButton;
