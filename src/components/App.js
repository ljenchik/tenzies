import "./style.css";
import RandomNumberButton from "./RandomNumberButton";
import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
//import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti';

function App() {
  const randomArray = () => {
    const numArray = Array.from({ length: 10 }, () =>
      Math.floor(Math.random() * 6 + 1)
    );
    let diceArray = [];
    for (let i = 0; i < numArray.length; i++) {
      diceArray.push({ value: numArray[i], isHeld: false, id: nanoid() });
    }
    return diceArray;
  };
  // const { width, height } = useWindowSize();
  const [numArray, setNumArray] = useState(randomArray());
  const [buttonText, setButtonText] = useState("Roll");
  const [clicked, setClicked] = useState(0);
  const [tenzies, setTenzies] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    let all = numArray.every(die => die.isHeld && die.value === numArray[0].value);
    if (all) {
      setTenzies(true);
      setButtonText("Reset");
      setMessage("Congratulations! You won!");
    }
  }, [numArray]);

  const handleClick = () => {
    for (let i = 0; i < numArray.length; i++) {
      if (!numArray[i].isHeld) {
        numArray[i].value = Math.floor(Math.random() * 6 + 1);
      }
    }
    setNumArray([...numArray]);
    setClicked(clicked + 1);
    if (buttonText === "Reset") {
      setNumArray(randomArray());
      setMessage("");
      setButtonText("Roll");
      setClicked(0);
      setTenzies(false);
    }
  };

  const holdDice = (id) => {
    const dieToHold = numArray.filter((die) => die.id === id)[0];
      dieToHold.isHeld = !dieToHold.isHeld;
      setNumArray([...numArray]);
  };



  return (
    <div className="main-container title">
      <p>Score: {clicked}</p>
      <div className="black-square">
        <div className="grey-square">
          <div className="title">Tenzies</div>
          <p className="instructions">
            Roll until all dice are the same. Click each die to freeze it at its
            current value between rolls.
          </p>
          <div className="random-number-buttons">
            {numArray.map((die) => (
              <RandomNumberButton
                value={die.value}
                key={die.id}
                isHeld={die.isHeld}
                onDiceClick={() => holdDice(die.id)}
              />
            ))}
          </div>
          <button className="roll" onClick={handleClick}>
            {buttonText}
          </button>
        </div>
      </div>
      {tenzies ? <Confetti
      // width={width}
      // height={height}
    /> : ""}
      <p>{message}</p>
    </div>
  );
}

export default App;
