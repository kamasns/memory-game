import React from 'react';
import PropTypes from 'prop-types';
import styles from './Button.module.css';

const propTypes = {
   name: PropTypes.string.isRequired,
   onClick: PropTypes.func.isRequired
};

function Button(props) {
   const { onClick, name } = props;

   return (
      <button className={styles.btn} onClick={onClick}>{name}</button>
   );
}

Button.propTypes = propTypes;

export default Button;
