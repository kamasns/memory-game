import {useState, useEffect} from "react";
import {getIndices} from "../Helpers/helpers";
import styles from './GameBox.module.css';

function initCells() {
   const cells = {};
   for (let i = 0; i < 16; i++) {
      cells[i.toString()] = {id: i, backgroundColor: "#000"};
   }
   return cells;
}

function GameBox(props) {
   const {win, sequence, gameOver, started} = props;
   const [cells, setCells] = useState(() => initCells());


   useEffect(() => {
      for (let i = 0; i < sequence.length; i++) {
         showCell(sequence[i], i);
      }
   }, [sequence, win]);

   function showCell(s, index) {
      const color = win ? '#000' : '#ff0000';

      setTimeout(() => {
         setCells((cells) => ({
            ...cells,
            [s]: {...cells[s], backgroundColor: color},
         }));
      }, 500 * (index + 1));

      setTimeout(() => {
         setCells((cells) => ({
            ...cells,
            [s]: {...cells[s], backgroundColor: "#000"},
         }));
      }, 500 * (index + 2));
   }

   function renderButtons() {
      const buttons = [];
      for (let i = 0; i < 16; i++) {
         if (win) {
            let currentSequence = [...sequence];
            currentSequence.pop();

            buttons.push(
               <div
                  key={`challenge-cell-${i}`}
                  className={!started ? "disabled" : undefined}
               >
                  <div className={`${styles.button} computer`}
                       style={{
                          backgroundColor:
                             currentSequence.indexOf(i + "") !== -1 ? "green" : "#737373",
                       }}
                  >
                     {currentSequence.indexOf(i + "") !== -1
                        ? getIndices(currentSequence, i + "")
                        : ""}
                  </div>
               </div>
            );
         } else {

            buttons.push(
               <div
                  key={`challenge-cell-${i}`}
                  className={!started ? "disabled" : undefined}
               >
                  {gameOver ? (
                     <div
                        className={`${styles.button} computer`}
                        style={{
                           backgroundColor:
                              sequence.indexOf(i + "") !== -1 ? "green" : "#737373",
                        }}
                     >
                        {(sequence.indexOf(i + "") !== -1
                           ? getIndices(sequence, i + "")
                           : "")}
                     </div>
                  ) : (
                     <div
                        className={`${styles.button} computer`}
                        style={{backgroundColor: cells[i + ""].backgroundColor}}
                     />
                  )}
               </div>
            );
         }
      }
      return buttons;
   }

   return <div className={`${styles.box} ${styles.computerBox}`}>{renderButtons()}</div>;
}

export default GameBox;
