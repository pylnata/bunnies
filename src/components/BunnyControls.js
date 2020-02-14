import React from 'react'
import Control from './Control'

export default ({ amount, scale, rotation, itemsSelected }) => {
    return (
      <div className="bunny-inputs">
        <Control input={amount} />
        <Control input={scale} />
        <Control input={rotation} />
  
        <label>Selected Bunnies: {itemsSelected}</label>
      </div>
    );
  };
  