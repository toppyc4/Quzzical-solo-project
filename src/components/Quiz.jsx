import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import Question from "./Question";
import "./Quiz.css";

const Quiz = () => {
  const [questionsArr, setQuestionsArr] = useState([]);
  const [isGAMEOVER, setIsGAMEOVER] = useState(false);
  const [scoreCount, setScoreCount] = useState(0);

  const allQuestionAnswered = questionsArr.every(
    (question) => question.selectedChoice !== ""
  );

  // get questions from server
  const getQuestionFromServer = () => {
    fetch("https://opentdb.com/api.php?amount=5")
      .then((res) => res.json())
      .then((data) =>
        setQuestionsArr(
          data.results.map((question) => {
            return {
              ...question,
              id: nanoid(),
              selectedChoice: "",
            };
          })
        )
      );
  };

  useEffect(() => {
    getQuestionFromServer();
  }, []);

  // count score
  useEffect(() => {
    if (questionsArr.length !== 0 && allQuestionAnswered) {
      let score = 0;
      questionsArr.forEach((question) => {
        if (question.selectedChoice === question.correct_answer) {
          score++;
        }
      });

      function calculateScore(question) {
        if (questionsArr.selectedChoice === questionsArr.correct_answer) {
          score++;
        }
      }
      setScoreCount(score);
    }
  }, [isGAMEOVER]);

  // Handle seleting choice
  function handleSelectChoice(questionId, choice) {
    if (!isGAMEOVER) {
      setQuestionsArr((prevQuestionsArr) =>
        prevQuestionsArr.map((question) =>
          question.id === questionId
            ? { ...question, selectedChoice: choice }
            : question
        )
      );
    }
    console.log(questionId);
    console.log(choice);
  }

  // handle check answer
  const checkAnswer = () => {
    if (allQuestionAnswered) {
      setIsGAMEOVER(true);
      setQuestionsArr((prevQuestionArr) =>
        prevQuestionArr.map((question) => ({ ...question, showAnswer: true }))
      );
    }
    console.log("check answer");
  };

  // handle new game
  const resetGame = () => {
    getQuestionFromServer();
    setIsGAMEOVER(false);
    setScoreCount(0);
    console.log("New Game");
  };

  const quizEl = questionsArr.map((q) => (
    <Question
      key={q.id}
      id={q.id}
      question={q.question}
      correctAnswer={q.correct_answer}
      incorrectAnswers={q.incorrect_answers}
      difficulty={q.difficulty}
      category={q.category}
      selectedChoice={q.selectedChoice}
      handleSelectChoice={handleSelectChoice}
      showAnswer={q.showAnswer}
    />
  ));

  return (
    <div className="container">
      {quizEl}
      {isGAMEOVER ? (
        <div className="GAMEOVER-btn-and-text-div">
          <span>You got {scoreCount}/5 Congratulation!!</span>
          <button onClick={resetGame}>Play again</button>
        </div>
      ) : (
        <button onClick={checkAnswer}>Check answers</button>
      )}
    </div>
  );
};

export default Quiz;
