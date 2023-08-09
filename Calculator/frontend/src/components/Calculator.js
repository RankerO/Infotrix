import React, { useState } from "react";
import Display from "./Display";
import Buttons from "./Buttons";
import "./styles/Calculator.css";
import axios from "axios";
import { evaluate, round } from "mathjs";
import ListOfOperation from "./ListOfOperation";

function Calculator() {
  const [input, setInput] = useState("");
  const [answer, setAnswer] = useState("");

  //input
  const inputHandler = (event) => {
    if (answer === "Invalid Input!!") return;
    let val = event.target.innerText;
    let str = input + val;
    if (str.length > 14) return;

    if (answer !== "") {
      setInput(answer + val);
      setAnswer("");
    } else setInput(str);
    // setInput(str);
  };

  //Clear screen
  const clearInput = () => {
    setInput("");
    setAnswer("");
  };
  // calculate final answer
  const calculateAns = async() => {
    if (input === "") return;
    let result = 0;
    let finalexpression = input;
    //  finalexpression = input.replaceAll("^", "**");  //for eval()
    finalexpression = finalexpression.replaceAll("x", "*");
    finalexpression = finalexpression.replaceAll("÷", "/");
    try {
      result = evaluate(finalexpression); //mathjs
    } catch (error) {
      result =
        error.message === "Brackets are not balanced!"
          ? "Brackets are not balanced!"
          : "Invalid Input!!"; //error.message;
    }
    isNaN(result) ? setAnswer(result) : setAnswer(round(result, 3));
    if (result === "Invalid Input!!") return;
    const data = { operation: input + "=" + result };
    try {
      const response = await axios.post('http://localhost:5000/operation',data);
      console.log(response.data); // Process the response from the backend
    } catch (error) {
      console.error('Error sending data:', error);
    }
  };

  // remove last character
  const backspace = () => {
    if (answer !== "") {
      setInput(answer.toString().slice(0, -1));
      setAnswer("");
    } else setInput((prev) => prev.slice(0, -1));
  };

  return (
    <>
      <div className="container">
        <div className="main">
          <Display input={input} setInput={setInput} answer={answer} />
          <Buttons
            inputHandler={inputHandler}
            clearInput={clearInput}
            backspace={backspace}
            calculateAns={calculateAns}
          />
        </div>
        <div className="list">
          <ListOfOperation/>
        </div>
      </div>
    </>
  );
}

export default Calculator;
