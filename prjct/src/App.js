import React, {useState, useEffect, useRef} from "react";
import './App.css';
import mismatch from "./hitsound_2.mp3"
import match from "./super-mario-64-yahoo-sound.mp3"

const matchAudio = new Audio(match);
const mismatchAudio = new Audio(mismatch);

function App() {
  const cardEmojies = [
    '🐶', '🐱', '🐭', '🐹', '🐰', '🦊',
    '🐻', '🐼', '🐨', '🐯', '🦁', '🐮',
    '🐷', '🐸', '🐵', '🐔', '🐧', '🐦'
  ];

  const [gridSize, setGridSize] = useState(4);

  const [cards, setCards] = useState([]);

  const [disabled, setDisabled] = useState(false)

  const [flipped, setFlipped] = useState([]);

  const [solved, setSolved] = useState([]);

  const [flips, setFlips] = useState(0);

  const [gameStarted, setStart] = useState(false);

  const [darkMode, setDark] = useState(false);

  const [logedIn, setLog] = useState(false);

  const [username, SetUsername] = useState('');
  const [password, setPassword] = useState('');

  const [gameTime, setGameTime] = useState(0);

  const initGame = () => {
    const pairs = (gridSize * gridSize) / 2;
    console.log(gridSize);
    const selectedEmoji = cardEmojies.slice(0, pairs);

    const cardPairs = [...selectedEmoji, ...selectedEmoji];
    console.log(cardPairs);
    const suflCards = cardPairs
        .sort(() => Math.random() - 0.5)
        .map((emoji, index) => ({
          id: index,
          emoji,
          flipped: false
        }));

    console.log(suflCards);

    setCards(suflCards);
    setFlips(0);
    setGameTime(0);
    setStart(true);
    setFlipped([]);
    setSolved([]);
  }

  const handleCardClick = (id) => {
    console.log('id:' + id)
    if(disabled || flipped.includes(id) || solved.includes(id) || !gameStarted) return;
    console.log(flipped)
    const newFlipped = [...flipped, id];
    setFlipped(newFlipped);
    console.log(newFlipped);
    console.log(flipped)
    setFlips(flips + 1);

    if (newFlipped.length === 2){
      setDisabled(true);
      checkForMatch(newFlipped);
    }
  }

  const checkForMatch = (flippedCards) => {
    const [first, second] = flippedCards;
    const card1 = cards.find(card => card.id === first);
    const card2 = cards.find(card => card.id === second);
    console.log(card1)
    console.log(card2)

    if (card1.emoji === card2.emoji){
      setSolved([...solved, first, second]);
      setFlipped([]);
      setDisabled(false);

      matchAudio.play();
    }
    else{
      setTimeout(() => {
        setFlipped([]);
        setDisabled(false);
      }, 1000);
      mismatchAudio.play();
    }
  }

  useEffect(() => {
    let timer;
    if(gameStarted && solved.length<cards.length){
      timer = setInterval(() => {
        setGameTime(gameTime => gameTime + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [gameStarted, solved, cards]
  )



  return (
      <div className='memory-game'>
        <h1>Игра Память</h1>
        <div>
          <p>Размер сетки</p>
          <select
              value={gridSize}
              onChange={(e) => setGridSize(Number(e.target.value))}

          >
            <option value='4'>4x4</option>
            <option value='6'>6x6</option>
          </select>
        </div>
        <button onClick={initGame}>
          {gameStarted ? 'Игра начата' : 'Начать игру'}
        </button>
        <button onClick={''}>Выйти</button>

        <div className='game-stats'>
          <p>Время: {gameTime} ceк</p>
          <p>Количество переворотов: {flips}</p>
          <p>Найдено пар: {solved.length / 2} из {(gridSize * gridSize) / 2}</p>
        </div>

        <div className='game-section' style={{display:"grid", gridTemplateColumns: `repeat(${gridSize}, 1fr)`}}>
          {cards.map(card => (
              <div onClick = {() => handleCardClick(card.id)} key={card.id}  className={`card ${flipped.includes(card.id) || solved.includes(card.id) ? 'flipped' : ''}`}>
                {flipped.includes(card.id) || solved.includes(card.id) ? card.emoji : '?'}
              </div>

          ))}
        </div>
      </div>
  );
}

export default App;