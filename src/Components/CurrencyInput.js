import React from 'react'

export const CurrencyInput = props => {

  const {
    onChangeAmount,
    amount
  } = props

  return (
    <div>
      <input type="number" className="input" value={amount} onChange={onChangeAmount} /> SEK
    </div>
  )

}