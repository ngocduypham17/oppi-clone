import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  decrement,
  increment,
  incrementAsync, incrementByAmount,
  selectCount,
} from '../../reducers/reduxCounter';

export default function ReduxCounter() {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();
  const [incrementAmount, setIncrementAmount] = useState('2');

  return (
    <div style={{ marginTop: 100 }}>
      <div>
        <button
          type="button"
          style={{ marginRight: 20 }}
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Substact
        </button>
        <span>{count}</span>
        <button
          type="button"
          style={{ marginLeft: 20 }}
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Add
        </button>
      </div>
      <div>
        <input
          aria-label="Set increment amount"
          value={incrementAmount}
          onChange={e => setIncrementAmount(e.target.value)}
        />
        <button
          type="button"
          onClick={() => dispatch(incrementByAmount(Number(incrementAmount) || 0))}
        >
          Add Amount
        </button>
        <button
          type="button"
          onClick={() => dispatch(incrementAsync(Number(incrementAmount) || 0))}
        >
          Add Async
        </button>
      </div>
    </div>
  );
}
