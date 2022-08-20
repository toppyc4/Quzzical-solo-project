import React from "react";
import { decode } from "html-entities";
import { nanoid } from "nanoid";
import "./Question.css";

const Question = (props) => {
  const correctChoiceEl = (
    <div key={nanoid()} className="choice">
      <p>{decode(`correctA: ${props.correctAnswer}`)}</p>
    </div>
  );

  const incorrectChoicesEl = props.incorrectAnswers.map((choice) => (
    <div key={nanoid()} className="choice">
      {decode(choice)}
    </div>
  ));

  incorrectChoicesEl.push(correctChoiceEl);

  let sortedChoicesEl = incorrectChoicesEl.sort(() => Math.random() - 0.5);

  //   const choiceEl = shuffleChoicesArr.map((choice) => {
  //     <div key={nanoid()} className="choice-div">
  //       {choice}
  //     </div>;
  //   });

  return (
    <div className="question-div">
      <h3>{decode(props.question)}</h3>
      <div className="choices-div">{sortedChoicesEl}</div>
    </div>
  );
};

export default Question;
