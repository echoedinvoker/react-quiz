import { useEffect, useReducer } from "react"
import Headers from "./Header"
import Main from "./Main"
import Loader from "./Loader"
import Error from "./Error"
import StartScreen from "./StartScreen"
import Question from "./Question"
import NextButton from "./NextButton"
import Progress from "./Progress"


const initialState = {
  questions: [],

  // 'loading', 'error', 'ready', 'active', 'finished'
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0
}

function reduce(state, action) {
  const curQuestion = state.questions.at(state.index)

  switch (action.type) {
    case 'dataReceived':
      return { ...state, questions: action.payload, status: "ready" }
    case 'dataFailed':
      return { ...state, status: "error" }
    case 'start':
      return { ...state, status: "active" }
    case 'newAnswer':
      return {
        ...state, answer: action.payload.select,
        points: curQuestion.correctOption === action.payload.select
          ? state.points + action.payload.points
          : state.points
      }
    case 'nextQuestion':
      return { ...state, index: state.index + 1, answer: null }
    case 'finish':
      return {
        ...state,
        status: "finished",
        highscore: state.points > state.highscore ? state.points : state.highscore
      }
    default:
      throw new Error("Action unknown")
  }
}

export default function App() {
  const [{ questions, status, index, answer, points, highscore }, dispatch] = useReducer(reduce, initialState)
  const numQuestions = questions.length
  const sumQuestionsPoints = questions.reduce((prev, curr) => prev + curr.points, 0)
  const percentage = (points / sumQuestionsPoints) * 100
  const isLastQuestion = index + 1 === numQuestions

  useEffect(function() {
    async function fetchQuiz() {
      try {
        const res = await fetch('http://localhost:9000/questions')
        const data = await res.json()
        dispatch({ type: 'dataReceived', payload: data })
      } catch (err) {
        dispatch({ type: 'dataFailed' })
      }
    }
    fetchQuiz()
  }, [])

  return <div className="app">
    <Headers />
    <Main>
      {status === 'loading' && <Loader />}
      {status === 'error' && <Error />}
      {status === 'ready' && <StartScreen numQuestions={numQuestions} dispatch={dispatch} />}
      {status === 'active' && <>
        <Progress numQuestions={numQuestions} index={index} sumQuestionsPoints={sumQuestionsPoints} answer={answer} points={points} />
        <Question question={questions[index]} dispatch={dispatch} answer={answer} />
        <NextButton dispatch={dispatch} answer={answer} type={!isLastQuestion ? 'nextQuestion' : 'finish'}>{
          !isLastQuestion ? 'Next' : 'Finish'
        }</NextButton>
      </>
      }
      {status === 'finished' && (
        <>
          <p className="result">You scored {points} out of {sumQuestionsPoints} ({Math.ceil(percentage)}%)</p>
          <p className="highscore">(Highscore: {highscore} points)</p>
          <button className="btn btn-ui">Restart Quiz</button>
        </>
      )}
    </Main>
  </div>
}
