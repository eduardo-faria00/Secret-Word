import { useState, useRef } from 'react'
import './Game.css'

function Game({verify, pickedWord, pickedCategory, letters, guessedLetters, wrongLetters, guesses, score}) {
    const [letter, setLetter] = useState('')

    const inputRef = useRef(null)

    const handleSubmit = (e) => {
        e.preventDefault()

        verify(letter)
        setLetter('')

        inputRef.current.focus()
    }

  return (
    <div className='game'>
        <p className='points'>
            <span>Pontuação: {score}</span>
        </p>
        <h1>Adivinhe a palavra</h1>
        <h3 className='tip'>Dica: <span>{pickedCategory}</span></h3>
        <p>tentativas restantes: {guesses}</p>
        <div className="wordContainer">
            {letters.map((letter, index)=>(
                guessedLetters.includes(letter) ? (
                    <span key={index} className='letter'>{letter}</span>
                ) : (
                    <span key={index} className='blankSquare'></span>
                )
            ))}
        </div>
        <div className="letterContainer">
            <form onSubmit={handleSubmit}>
                <input type="text" name='letter' maxLength='1' required onChange={(e)=> setLetter(e.target.value)} value={letter} ref={inputRef}/>
                <button><span>jogar!</span></button>
            </form>
        </div>
        <div className="wrongLetters">
            <p>Letras digitadas:</p>
            {wrongLetters.map((letter, index) => (
                <span key={index}>{letter}, </span>
            ))}
        </div>
    </div>
  )
}

export default Game