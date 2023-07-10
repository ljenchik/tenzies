const RandomNumberButton = (props) => {
    return (
        <button 
        className={props.isHeld ? "random-number-button clicked" : "random-number-button"}
        onClick={props.onDiceClick}
        >{props.value}</button>
    )
}

export default RandomNumberButton;