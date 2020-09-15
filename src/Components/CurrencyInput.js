import React from "react";

export const CurrencyInput = (props) => {
  const { onChangeAmount, amount } = props;

  return (
    <div>
      <input
        type="number"
        className="currency-input"
        value={amount}
        onChange={onChangeAmount}
      />
      <span>SEK</span>
    </div>
  );
};
