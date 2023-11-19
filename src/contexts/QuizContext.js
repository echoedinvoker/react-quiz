import { createContext, useContext, useEffect, useReducer } from "react";


const SECS_PER_QUESTION = 30

const initialState = {
  questions: [],
  // 'loading', 'error', 'ready', 'active', 'finished'
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null
}

function reduce(state, action) {
  const curQuestion = state.questions.at(state.index)

  switch (action.type) {
    case 'dataReceived':
      return { ...state, questions: action.payload, status: "ready" }
    case 'dataFailed':
      return { ...state, status: "error" }
    case 'start':
      return { ...state, status: "active", secondsRemaining: state.questions.length * SECS_PER_QUESTION }
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
    case 'restart':
      return {
        ...initialState,
        status: 'active',
        highscore: state.highscore,
        questions: state.questions,
        secondsRemaining: state.questions.length * SECS_PER_QUESTION
      }
    case 'tick':
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? 'finished' : state.status
      }
    default:
      throw new Error("Action unknown")
  }
}

const QuizContext = createContext()

function QuizProvider({ children }) {
  const [{ questions, status, index, answer, points, highscore, secondsRemaining }, dispatch] = useReducer(reduce, initialState)
  const numQuestions = questions.length
  const sumQuestionsPoints = questions.reduce((prev, curr) => prev + curr.points, 0)

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
  return <QuizContext.Provider value={{
    questions,
    status,
    index,
    secondsRemaining,
    answer,
    points,
    highscore,
    numQuestions,
    sumQuestionsPoints,
    dispatch
  }}>
    {children}
  </QuizContext.Provider>
}

function useQuiz() {
  const context = useContext(QuizContext)
  if (context === undefined)
    throw new Error('QuizContext was used outside the QuizProvider')
  return context
}
export { useQuiz, QuizProvider }
