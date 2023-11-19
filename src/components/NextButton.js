import { useQuiz } from "../contexts/QuizContext"

// export default function NextButton({ children, dispatch, answer, type }) {
export default function NextButton({ children, type }) {
  const { dispatch, answer } = useQuiz()
  if (answer === null) return

  return <button className="btn btn-ui" onClick={() => dispatch({ type: type })}>
    {children}
  </button>
}
