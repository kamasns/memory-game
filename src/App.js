import React, {useEffect, useState} from "react";
import './App.css';
import Button from './Components/Button/Button';
import StepSelect from "./Components/StepSelect/StepSelect";
import Rounds from "./Components/Rounds/Rounds";
import GameBox from "./Components/GameBox/GameBox";
import PlayerBox from "./Components/GameBox/PlayerBox";

function App() {
   const [gameAmount, setGameAmount] = useState(5);
   const handleSelect = (e) => setGameAmount(parseInt(e.target.value));
   const [challenge, setChallenge] = useState([]);
   const [userInput, setUserInput] = useState([]);
   const [round, setRound] = useState(0);
   const [win, setWin] = useState(false);
   const [gameOver, setGameOver] = useState(false);
   const [started, setStarted] = useState(false);


   const prepareGame = () => {
      setChallenge([]);
      setUserInput([]);
      setRound(0);
      setGameOver(false);
      setWin(false);
      setStarted(false);
   }
   const handleReset = () => {
      prepareGame();
      setGameAmount(5);
   }
   const handleStart = () => {
      prepareGame();
      setStarted(true);
   }

   function handleClick(id) {
      setUserInput((userInput) => userInput.concat(id));
   }

   useEffect(() => {
      if (gameOver || win) {
         setStarted(false);
      }
   }, [gameOver, win]);

   useEffect(() => {
      if (!started || win) {
         return;
      }

      function generateNext() {
         let next;
         do {
            next = Math.round(Math.random() * 15);
         } while (
            next === +challenge[challenge.length - 1]
            );

         setChallenge((challenge) => challenge.concat(next + ""));
      }

      for (let i = 0; i < userInput.length; i++) {
         if (userInput[i] !== challenge[i]) {
            setGameOver(true);
         }
      }
      if (userInput.join(",") === challenge.join(",")) {
         setUserInput([]);
         if (challenge.length !== 0) {
            setRound((round) => round + 1);
         }
         if (started) {
            generateNext();
         }
      }

      if (round === gameAmount) {
         setWin(true);
      }

   }, [userInput, challenge, started, round, win, gameAmount]);

   return (
      <div className="App">
         <StepSelect disabled={started} value={gameAmount} onChange={handleSelect}/>

         <div className='gameInfo'>
            {gameOver && <span className="gameover">Koniec gry, doszedłeś do: {round} rundy</span>}
            {win && <span className="win">Wygrałeś!!!</span>}
         </div>

         <Rounds completeRounds={round} gameAmount={gameAmount}/>
         <div className='gameWrapper'>
            <GameBox
               sequence={challenge}
               gameOver={gameOver}
               started={started}
               win={win}
            />
            <PlayerBox
               onClick={handleClick}
               gameOver={gameOver}
               userInput={userInput}
               started={started}
               win={win}
            />
         </div>
         <Button onClick={handleStart} name='Start'/>
         <Button onClick={handleReset} name='Reset'/>
      </div>
   );
}

export default App;
