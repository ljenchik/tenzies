import "./style.css";
import RandomNumberButton from "./components/RandomNumberButton";
import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";

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

  const [numArray, setNumArray] = useState(randomArray());
  const [buttonText, setButtonText] = useState("Roll");

  const [clicked, setClicked] = useState(0);

  const [tenzies, setTenzies] = useState(false);
  const [message, setMessage] = useState("");

  const bestScore = localStorage.getItem("Best score in Tenzies");
  
  const bestTime = localStorage.getItem("Best time in Tenzies");

  const { width, height } = useWindowSize();

  const [timer, setTimer] = useState(0);

  let interval;
  useEffect(() => {
    //Implementing the setInterval method
    interval = setInterval(() => {
      setTimer(timer + 1);
    }, 1000);

    //Clearing the interval
    return () => {
      clearInterval(interval);
    };
  }, [timer]);

  useEffect(() => {
    let all = numArray.every(
      (die) => die.isHeld && die.value === numArray[0].value
    );

    if (all) {
      setTenzies(true);
      setButtonText("Reset");
      setMessage("Congratulations!");
      setTimer(timer);

      if (bestScore) {
        if (clicked < bestScore) {
          localStorage.setItem(
            "Best score in Tenzies",
            JSON.stringify(clicked)
          );
        }
      } else {
        localStorage.setItem("Best score in Tenzies", JSON.stringify(clicked));
      }

      if (bestTime) {
        if (timer < bestTime) {
          localStorage.setItem(
            "Best time in Tenzies",
            JSON.stringify(timer)
          );
        }
      } else {
        localStorage.setItem("Best time in Tenzies", JSON.stringify(timer));
      }
      clearInterval(interval);
    }
  }, [timer, numArray]);

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
      setTimer(0);
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
      {bestScore ? <p className="score-text">Best score: {bestScore}</p> : ""}
      {bestTime ? <p className="score-text">Best time: {bestTime}</p> : ""}

      <p className="score-text">Your score: {clicked}</p>
      <p className="score-text">Your time: {timer}</p>

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
      {tenzies ? <Confetti width={width} height={height} /> : ""}
      <p>{message}</p>
    </div>
  );
}

export default App;
