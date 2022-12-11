import React from 'react'

function CurrencyRow(props) {
const {currency,selectCurrency,onChangeCurrency,amount,onChangeAmount} = props

  return (
    <div>
      <input type="number" className='input' value={amount} onChange={onChangeAmount}/>
      <select value={selectCurrency} onChange={onChangeCurrency}>
        {currency.map(option =>(
          <option key={option} value={option}>{option}</option>
        ))}
        
      </select>
    </div>
  )
}

export default CurrencyRow
