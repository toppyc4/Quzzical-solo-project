import { useState, useEffect } from "react";
import { decode } from "html-entities";
import { nanoid } from "nanoid";
import "./Question.css";

const Question = (props) => {
  const [sortChoicesArr, setSortedChoicesArr] = useState(true);

  useEffect(() => {
    setSortedChoicesArr(false);
  }, []);

  const correctChoiceClassName = `${
    props.selectedChoice === props.correctAnswer ? "selected-choice" : "choice"
  } 
  ${props.showAnswer && "choice-correct"}`;

  const correctChoiceEl = (
    <div
      key={nanoid()}
      className={correctChoiceClassName}
      onClick={() => props.handleSelectChoice(props.id, props.correctAnswer)}
    >
      {decode(`correctA: ${props.correctAnswer}`)}
    </div>
  );

  const incorrectChoicesEl = props.incorrectAnswers.map((choice) => {
    const incorrectChoiceClassName = `${
      props.selectedChoice === choice ? "selected-choice" : "choice"
    } 
    ${
      props.showAnswer && props.selectedChoice === choice && "choice-incorrect"
    }`;

    return (
      <div
        key={nanoid()}
        className={incorrectChoiceClassName}
        onClick={() => props.handleSelectChoice(props.id, choice)}
      >
        {decode(choice)}
      </div>
    );
  });

  incorrectChoicesEl.push(correctChoiceEl);

  const choicesEl = sortChoicesArr
    ? incorrectChoicesEl.sort(() => Math.random() - 0.5)
    : incorrectChoicesEl;

  //   const choiceEl = shuffleChoicesArr.map((choice) => {
  //     <div key={nanoid()} className="choice-div">
  //       {choice}
  //     </div>;
  //   });

  return (
    <div className="question-div">
      <h3>{decode(props.question)}</h3>
      <div className="choices-div">{choicesEl}</div>
    </div>
  );
};

export default Question;
