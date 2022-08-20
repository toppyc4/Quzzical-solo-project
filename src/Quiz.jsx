import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import Question from "./Question";
import "./Quiz.css";

const Quiz = () => {
  const [quizArr, setQuizArr] = useState([]);

  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5")
      .then((res) => res.json())
      .then((data) => setQuizArr(data.results));
  }, []);

  const quizEl = quizArr.map((q) => (
    <Question
      key={nanoid()}
      question={q.question}
      correctAnswer={q.correct_answer}
      incorrectAnswers={q.incorrect_answers}
      difficulty={q.difficulty}
      category={q.category}
    />
  ));

  return (
    <div className="container">
      {quizEl}
      <button>Check answers</button>
    </div>
  );
};

export default Quiz;
