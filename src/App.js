import { useEffect, useReducer } from "react"
import Headers from "./Header"
import Main from "./Main"


const initialState = {
  questions: [],

  // 'loading', 'error', 'ready', 'active', 'finished'
  status: "loading"
}

function reduce(state, action) {
  switch (action.type) {
    case 'dataReceived':
      return { ...state, questions: action.payload, status: "ready" }
    case 'dataFailed':
      return { ...state, status: "error" }
    default:
      throw new Error("Action unknown")
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reduce, initialState)

  useEffect(function() {
    async function fetchQuiz() {
      try {
        const res = await fetch('http://localhost:9000/questions')
        const data = await res.json()
        dispatch({ type: 'dataReceived', payload: data })
      } catch (err) {
        // console.error(err.message)
        dispatch({ type: 'dataFailed' })
      }
    }
    fetchQuiz()
  }, [])

  return <div>
    <Headers />
    <Main>
      <p>1/15</p>
      <p>question</p>
    </Main>
  </div>
}
