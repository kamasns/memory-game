import React, {useEffect, useRef} from 'react'
import styles from './Rounds.module.css';

function Rounds(props) {
   const {completeRounds, gameAmount} = props;
   const refContainer = useRef(null);
   let tmp;

   const completeRound = () => {
      if(completeRounds === 0){
         tmp = null;
         refContainer.current.childNodes.forEach(el=>el.style.backgroundColor = '#fafafa')
      } else {
         tmp = completeRounds - 1;
         refContainer.current.childNodes[tmp].style.backgroundColor = 'green';
      }
   }

   useEffect(() => {
      completeRound();
   }, [completeRounds])

   function renderRounds() {
      const rounds = [];
      for (let i = 0; i < gameAmount; i++) {
         rounds.push(<span key={`round-${i}`} className={styles.roundCircle}></span>);
      }
      return rounds;
   }
   return <div ref={refContainer} className={styles.roundContainer}>{renderRounds()}</div>;
}

export default Rounds;