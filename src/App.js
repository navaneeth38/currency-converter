import './App.css';
import {useEffect,useState} from 'react'
import CurrencyRow from './CurrencyRow';

const BASE_URL = 'https://api.exchangerate.host/latest'
function App() {

const [amount,setAmount]=useState(1)  
const [exchangeRate,setExchangeRate]= useState()
const [amountInCurrency,setAmountInCurrency]= useState(true)
const [currency,setCurrency]=useState([]) 
const [fromCurrency, setFromCurrency]=useState()
const [toCurrency, setToCurrency]=useState()

let toAmount, fromAmount

if(amountInCurrency){
  fromAmount = amount
  toAmount = amount * exchangeRate
}
else{
  toAmount = amount
  fromAmount = amount / exchangeRate
}

useEffect(()=>{
  fetch(BASE_URL)
  .then(res => res.json())
  .then(data =>{
    const firstCurrency = Object.keys(data.rates)[0]
    setCurrency([data.base, ...Object.keys(data.rates)])
    setFromCurrency(data.base)
    setToCurrency(firstCurrency)
    setExchangeRate(data.rates[firstCurrency])
  })
}
,[])

useEffect(()=>{
  if(fromCurrency !=null && toCurrency !=null){
fetch(`${BASE_URL}?base=${fromCurrency}&symbols=${toCurrency}`)
.then(res=>res.json())
.then(data=> setExchangeRate(data.rates[toCurrency]))
console.log(toCurrency,fromCurrency,exchangeRate)
}
},[fromCurrency,toCurrency])


function handleFromAmountChange(e){
  setAmount(e.target.value)
  setAmountInCurrency(true)
}
function handleToAmountChange(e){
  setAmount(e.target.value)
  setAmountInCurrency(false)
}

  return (
    <div className="App">
      <div className='card'>
      <h1>Currency Rate</h1>
      <CurrencyRow 
        currency={currency}
        selectCurrency={fromCurrency}
        onChangeCurrency={e=> setFromCurrency(e.target.value)}
        amount={fromAmount}
        onChangeAmount={handleFromAmountChange}
      />
      <div className='equals'>=</div>
      <CurrencyRow 
       currency={currency}
       selectCurrency={toCurrency}
       onChangeCurrency={e=> setToCurrency(e.target.value)}
       amount={toAmount}
       onChangeAmount={handleToAmountChange}
      />
    </div>
  </div>
  );
}

export default App;
