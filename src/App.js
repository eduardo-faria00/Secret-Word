// css
import './App.css'
//components
import StartScreen from './components/StartScreen'
import Game from './components/Game'
import End from './components/End'
//hooks
import { useCallback, useEffect, useState } from 'react'
// datas
import { wordList } from './data/words'

const stages = [
  { id: 1, name: 'start' },
  { id: 2, name: 'game' },
  { id: 3, name: 'end' }
]

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name)
  const [words] = useState(wordList)
  const [pickedWord, setPickedWord] = useState('')
  const [pickedCategory, setPickedCategory] = useState('')
  const [letters, setLetters] = useState([])
  const [guessedLetters, setGuessedLetters] = useState([])
  const [wrongLetters, setWrongLetters] = useState([])
  const [guesses, setGuesses] = useState(3)
  const [score, setScore] = useState(0)
  //================================================================================

  const pickWordAndCategory = useCallback(() => {
    // get a random category
    const categories = Object.keys(words)
    const category = categories[Math.floor(Math.random() * categories.length)]
    // get a random word
    const word =
      words[category][Math.floor(Math.random() * words[category].length)]

    return { word, category }
  }, [words])
  //================================================================================

  const startGame = useCallback(() => {
    clearStates()
    const { word, category } = pickWordAndCategory()
    // get letters from word
    let wordLetter = word.toLowerCase().split('')

    setPickedWord(word)
    setPickedCategory(category)
    setLetters(wordLetter)

    setGameStage(stages[1].name)
  }, [pickWordAndCategory])
  //================================================================================

  const verifyLetter = letter => {
    const normalizeLetter = letter.toLowerCase()

    if (
      guessedLetters.includes(normalizeLetter) ||
      wrongLetters.includes(normalizeLetter)
    ) {
      return
    }

    if (letters.includes(normalizeLetter)) {
      setGuessedLetters(prevGuessedLetters => [
        ...prevGuessedLetters,
        normalizeLetter
      ])
    } else {
      setWrongLetters(prevWrongLetters => [
        ...prevWrongLetters,
        normalizeLetter
      ])

      setGuesses(prevGuesses => prevGuesses - 1)
    }
  }
  //================================================================================

  const clearStates = () => {
    setGuessedLetters([])
    setWrongLetters([])
  }
  //================================================================================

  useEffect(() => {
    if (guesses <= 0) {
      clearStates()
      setGameStage(stages[2].name)
    }
  }, [guesses])

  useEffect(() => {
    const uniqueLetters = [...new Set(letters)]

    if (guessedLetters.length === 0) return

    if (guessedLetters.length === uniqueLetters.length) {
      setScore(prevScore => (prevScore += 100))
      startGame()
    }
  }, [guessedLetters, letters, startGame])
  //================================================================================

  const retry = () => {
    setScore(0)
    setGuesses(3)

    setGameStage(stages[0].name)
  }
  //================================================================================

  return (
    <div className="App">
      {gameStage === 'start' && <StartScreen startGame={startGame} />}
      {gameStage === 'game' && (
        <Game
          verify={verifyLetter}
          pickedWord={pickedWord}
          pickedCategory={pickedCategory}
          letters={letters}
          guessedLetters={guessedLetters}
          wrongLetters={wrongLetters}
          guesses={guesses}
          score={score}
        />
      )}
      {gameStage === 'end' && <End retry={retry} score={score} />}
    </div>
  )
}

export default App
