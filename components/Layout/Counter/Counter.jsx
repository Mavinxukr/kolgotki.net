import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Counter.scss';

const Counter = ({ classNameForCounter, count }) => {
  const [countProducts, setCountProducts] = useState(0);

  return (
    <div className={`${classNameForCounter} ${styles.counterProducts}`}>
      <button
        onClick={() => setCountProducts(countProducts - 1)}
        className={styles.buttonChangeCount}
        type="button"
        disabled={countProducts === 0}
      >
        -
      </button>
      <p className={styles.countProductIndicator}>{countProducts}</p>
      <button
        onClick={() => setCountProducts(countProducts + 1)}
        className={styles.buttonChangeCount}
        type="button"
        disabled={countProducts === count || count === null}
      >
        +
      </button>
    </div>
  );
};

Counter.propTypes = {
  classNameForCounter: PropTypes.string,
  count: PropTypes.number,
};

export default Counter;
