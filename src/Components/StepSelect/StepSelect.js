import React from 'react';
import styles from './StepSelect.module.css';

function StepSelect(props){
   return (
      <div className={styles.formGroup}>
         <label htmlFor="select" >Wybierz ilość rund:</label>
         <select value={props.value} onChange={props.onChange} disabled={props.disabled}>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
            <option>7</option>
            <option>8</option>
            <option>9</option>
            <option>10</option>
         </select>
      </div>
   )
}

export default StepSelect;
