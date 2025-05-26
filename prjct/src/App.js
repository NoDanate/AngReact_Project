import React, {useState} from "react";
import './App.css';

const matchAudio = new Audio('');
const mismatchAudio = new Audio('');

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

    const selectedEmoji = cardEmojies.slice(0, pairs);

    const cardPairs = [...selectedEmoji, ...selectedEmoji];
    const suflCards = cardPairs
        .sort(() =>Math.random() - 0.5)
        .map((emodji, index) =>({
          id: index,
          emodji,
          flipped:false
        }));

    setCards(suflCards);
    setFlips(0);
    setGameTime(0);
    setStart(true);
    setFlipped([]);
    setSolved([]);
  }

  const handleCardClick = (id) => {
    if(disabled || flipped.includes(id) || solved.includes(id) || !gameStarted) return;

    const newFlipped = [...flipped, id];
    setFlipped(newFlipped);

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

    if (card1.emodji === card2.emodji){
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



  return (
      <div className='memory-game'>
        <h1>Игра Память</h1>
        <div>
          <p>Размер сетки</p>
          <select
              value={gridSize}
              onChange={(e) => setGridSize(e.target.value)}

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
          <p>Время: </p>
          <p>Количество переворотов: {flips}</p>
          <p>Найдено пар: {solved.length / 2} из {(gridSize * gridSize) / 2}</p>
        </div>

        <div className='game-section' style={{gridTemplateColumns: `repeat(${gridSize}), 1fr`}}>
          {cards.map(card => (
              <div onClick={handleCardClick} key={card.id} className={`card ${flipped.includes(card.id) || solved.includes(card.id) ? 'flipped' : ''}`}>
                {flipped.includes(card.id) || solved.includes(card.id) ? card.emodji : '?'}
              </div>
          ))}
        </div>
      </div>
  );
}

export default App;