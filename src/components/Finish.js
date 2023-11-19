import { useQuiz } from "../contexts/QuizContext"

export default function Finish() {
  const { points, sumQuestionsPoints, highscore, dispatch } = useQuiz()
  const percentage = (points / sumQuestionsPoints) * 100
  return (
    <>
      <p className="result">You scored {points} out of {sumQuestionsPoints} ({Math.ceil(percentage)}%)</p>
      <p className="highscore">(Highscore: {highscore} points)</p>
      <button className="btn btn-ui" onClick={() => dispatch({ type: 'restart' })}>Restart Quiz</button>
    </>

  )
}
