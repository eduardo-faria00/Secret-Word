import './StartScreen.css'

const StartScreen = ({startGame}) => {
  return (
    <div className='start'>
      <h1>Secret Word</h1>
      <p>Clique no botão para começar a jogar</p>
      <button className='btn-start' onClick={startGame}><span>Iniciar jogo</span></button>
    </div>
  )
}

export default StartScreen