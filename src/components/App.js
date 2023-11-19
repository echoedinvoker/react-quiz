import Headers from "./Header"
import Main from "./Main"
import Loader from "./Loader"
import Error from "./Error"
import StartScreen from "./StartScreen"
import Question from "./Question"
import NextButton from "./NextButton"
import Progress from "./Progress"
import Finish from "./Finish"
import Footer from "./Footer"
import Timer from "./Timer"
import { useQuiz } from "../contexts/QuizContext"


export default function App() {
  const { status, index, numQuestions } = useQuiz()
  const isLastQuestion = index + 1 === numQuestions

  return <div className="app">
    <Headers />
    <Main>
      {status === 'loading' && <Loader />}
      {status === 'error' && <Error />}
      {status === 'ready' && <StartScreen />}
      {status === 'active' && <>
        <Progress />
        <Question />
        <Footer>
          <Timer />
          <NextButton type={!isLastQuestion ? 'nextQuestion' : 'finish'}>{
            !isLastQuestion ? 'Next' : 'Finish'
          }</NextButton>
        </Footer>
      </>
      }
      {status === 'finished' && <Finish />}
    </Main>
  </div>
}


