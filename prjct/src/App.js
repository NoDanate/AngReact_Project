import React, {useState} from "react";
import './App.css';

function App() {
  const cardEmojies = [
    '🐶', '🐱', '🐭', '🐹', '🐰', '🦊',
    '🐻', '🐼', '🐨', '🐯', '🦁', '🐮',
    '🐷', '🐸', '🐵', '🐔', '🐧', '🐦'
  ];

  const matchAudio = new Audio('');
  const mismatchAudio = new Audio('');

  const [gridSize, setGridSize] = useState(4);

  const [cards, setCards] = useState([]);

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


  return (
      <div>

      </div>
  );
}

export default App;
