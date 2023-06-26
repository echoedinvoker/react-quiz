
export default function Progress({ numQuestions, index, sumQuestionsPoints, answer, points }) {
  return (
    <header className="progress">
      <progress max={numQuestions} value={index} />
      <p>Question <strong>{index + Number(answer !== null)}</strong> / {numQuestions}</p>
      <p><strong>{points}</strong> / {sumQuestionsPoints} points</p>
    </header>
  )
}
