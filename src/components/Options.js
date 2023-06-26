export default function Options({ question, dispatch, answer }) {
  const hasAnswer = answer !== null

  return (
    <div className="options">
      {question.options.map((option, index) => <button
        className={`
          btn btn-option 
          ${answer === index ? 'answer' : ''} 
          ${hasAnswer ? question.correctOption === index ? 'correct' : 'wrong' : ''}
        `}
        key={option}
        disabled={hasAnswer}
        onClick={() => dispatch({
          type: 'newAnswer', payload: {
            select: index,
            points: question.points
          }
        })}
      >{option}</button>)}
    </div>
  )
}
