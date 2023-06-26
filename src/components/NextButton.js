export default function NextButton({ children, dispatch, answer, type }) {
  if (answer === null) return

  return <button className="btn btn-ui" onClick={() => dispatch({ type: type })}>
    {children}
  </button>
}
