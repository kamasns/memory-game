import { getIndices } from "../Helpers/helpers";
import styles from './GameBox.module.css';

function PlayerBox(props){
   const { gameOver, userInput, started, win, onClick } = props;

   function renderButtons() {
      const buttons = [];
      for (let i = 0; i < 16; i++) {
         buttons.push(
            <div key={`cell-${i}`} className={!started ? "disabled" : undefined}>
               {(gameOver || win) ? (
                  <div
                     className={`${styles.button}`}
                     style={{
                        backgroundColor:
                           userInput.indexOf(i + "") !== -1
                              ? i + "" === userInput[userInput.length - 1]
                              ? "red"
                              : "green"
                              : "#737373",
                     }}
                  >
                     {userInput.indexOf(i + "") !== -1
                        ? getIndices(userInput, i + "")
                        : ""}
                  </div>
               ) : (
                  <div className={`${styles.button}`} onClick={() => onClick(i + "")} />
               )}
            </div>
         );
      }
      return buttons;
   }
   return <div className={styles.box} >{renderButtons()}</div>;
}

export default PlayerBox;
