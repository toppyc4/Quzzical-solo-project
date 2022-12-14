import { useState } from "react";
import "./App.css";
// import images from "./imgsFile/imgs";
import Quiz from "./components/Quiz";

function App() {
  const [quizzing, setQuizzing] = useState(false);

  function startQuiz() {
    setQuizzing((prevState) => !prevState);
    console.log("start Quiz");
  }

  return (
    <main>
      {/* fuck this: <img src={images.topYELLOWblob1} alt="" /> */}
      {quizzing ? (
        <Quiz />
      ) : (
        <div className="intro-div">
          <h1>Quizzical</h1>
          <span>test your knowledge, googling is acceptible</span>
          <br />
          <button onClick={startQuiz}>Start Quiz</button>
        </div>
      )}
    </main>
  );
}

export default App;
