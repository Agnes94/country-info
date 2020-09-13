import React, { useEffect, useState } from 'react';
import { CurrencyInput } from 'Components/CurrencyInput'

const URL = 'https://free.currconv.com/api/v7/convert?compact=ultra&apiKey=c6f15ce60765fe470ecb'

export const CurrencyExchange = props => {

  const {
    currencyOfCountry
  } = props

  const [fromCurrency, setFromCurrency] = useState()
  const [exchangeRate, setExchangeRate] = useState()
  const [amount, setAmount] = useState(1)
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(false)

  let toAmount, fromAmount
  if (amountInFromCurrency) {
    fromAmount = amount
    toAmount = amount * exchangeRate
  }

  useEffect(() => {
    const currencyExchangeQuery = `SEK_${currencyOfCountry}`;
    fetch(`${URL}&q=${currencyExchangeQuery}`)
      .then(res => res.json())
      .then(data => {
        setExchangeRate(data[currencyExchangeQuery])
      })
  }, [])


  const handleFromAmountChange = (e) => {
    setAmount(e.target.value)
    setAmountInFromCurrency(true)
  }

  return (
    <>
      <h1>Convert</h1>
      <CurrencyInput
        selectedCurrency={fromCurrency}
        onChangeCurrency={e => setFromCurrency(e.target.value)}
        onChangeAmount={handleFromAmountChange}
        amount={fromAmount}
      />
      <div className="equals">=</div>

      <input type="number"
        value={toAmount}
      />
      {currencyOfCountry}
    </>
  );
}