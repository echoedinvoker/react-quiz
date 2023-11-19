import { useQuiz } from "../contexts/QuizContext"

// export default function Progress({ numQuestions, index, sumQuestionsPoints, answer, points }) {
export default function Progress() {
  const { numQuestions, index, sumQuestionsPoints, answer, points } = useQuiz()

  return (
    <header className="progress">
      <progress max={numQuestions} value={index} />
      <p>Question <strong>{index + Number(answer !== null)}</strong> / {numQuestions}</p>
      <p><strong>{points}</strong> / {sumQuestionsPoints} points</p>
    </header>
  )
}
