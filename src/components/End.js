import './End.css'

function End({ retry, score }) {
  return (
    <div className="end">
      <h1>Fim de jogo!</h1>
      <h2>
        Sua Pontuação foi: <span>{score}</span>
      </h2>
      <button onClick={retry}>Tentar de novo</button>
    </div>
  )
}

export default End
