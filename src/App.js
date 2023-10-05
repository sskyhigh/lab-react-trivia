import React, { useEffect, useState } from "react";
import ResultCard from "./components/ResultCard";
import QuestionCard from "./components/QuestionCard";
import { shuffleArray } from "./lib/utils";
import rawTriviaQuestion from "./lib/data";

const triviaQuestion = rawTriviaQuestion.results[0];

function App() {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [questionData, setQuestionData] = useState(triviaQuestion);

  // rerenders component
  useEffect(() => {
    fetchPromise();
  }, []);

  const selectAnswer = (selection) => {
    setSelectedAnswer(selection);
  };

  // fetch questions API
  const fetchPromise = () => {
    // debugger;
    fetch("https://opentdb.com/api.php?amount=1&category=9&type=multiple")
      .then((response) => response.json())
      // sets the first questions in json
      .then((data) => {
        setQuestionData(data);
        console.log(data);
        setSelectedAnswer(null);
      });
    // resets the answer because
    // encountered a bug where the program
    // was not allowing me to continue playing
  };

  let card;

  if (selectedAnswer) {
    card = (
      <ResultCard
        correct={selectedAnswer === questionData.correct_answer}
        answer={questionData.correct_answer}
      />
    );
  } else {
    let options = [
      questionData.correct_answer,
      ...questionData.incorrect_answers,
    ];
    card = (
      <QuestionCard
        question={questionData.question}
        options={shuffleArray(options)}
        selectAnswer={selectAnswer}
      />
    );
  }

  return (
    <div className="w-100 my-5 d-flex justify-content-center align-items-center">
      <div style={{ maxWidth: "45%" }}>
        <h1 className="text-center">Trivia App</h1>
        <button className="btn btn-success" onClick={fetchPromise}>
          Next Question
        </button>
        {card}
      </div>
    </div>
  );
}

export default App;
