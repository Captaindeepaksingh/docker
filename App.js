import { useEffect, useState } from 'react';
import Axios from 'axios';
import CurrencyDropdown from 'react-currency-dropdown';
import { FlipCurrencyIcon } from 'react-icons/fi';
import 'react-currency-dropdown/style.css';
import './CurrencyConverter.css';

function CurrencyConverter() {
  const [exchangeRates, setExchangeRates] = useState([]);
  const [amount, setAmount] = useState(0);
  const [sourceCurrency, setSourceCurrency] = useState("USD");
  const [targetCurrency, setTargetCurrency] = useState("INR");
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [convertedAmount, setConvertedAmount] = useState(0);

  useEffect(() => {
    Axios.get(`https://example.com/api/exchange-rates/${sourceCurrency}.json`)
      .then((response) => {
        setExchangeRates(response.data[sourceCurrency]);
      })
  }, [sourceCurrency]);

  useEffect(() => {
    setCurrencyOptions(Object.keys(exchangeRates));
    convertCurrency();
  }, [exchangeRates]);

  function convertCurrency() {
    const exchangeRate = exchangeRates[targetCurrency];
    setConvertedAmount(amount * exchangeRate);
  }

  function swapCurrencies() {
    const tempSource = sourceCurrency;
    setSourceCurrency(targetCurrency);
    setTargetCurrency(tempSource);
  }

  return (
    <div className="CurrencyConverter">
      <div className="converter-heading">
        <h1>Currency Converter</h1>
      </div>
      <div className="converter-container">
        <div className="converter-section">
          <h3>Amount</h3>
          <input
            type="text"
            placeholder="Enter the amount"
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div className="converter-section">
          <h3>From</h3>
          <CurrencyDropdown
            options={currencyOptions}
            onChange={(e) => { setSourceCurrency(e.value) }}
            value={sourceCurrency}
            placeholder="From"
          />
        </div>
        <div className="converter-section">
          <FlipCurrencyIcon
            size="30px"
            onClick={() => { swapCurrencies() }}
          />
        </div>
        <div className="converter-section">
          <h3>To</h3>
          <CurrencyDropdown
            options={currencyOptions}
            onChange={(e) => { setTargetCurrency(e.value) }}
            value={targetCurrency}
            placeholder="To"
          />
        </div>
      </div>
      <div className="converter-result">
        <button onClick={() => { convertCurrency() }}>Convert</button>
        <h2>Converted Amount:</h2>
        <p>{amount + " " + sourceCurrency + " = " + convertedAmount.toFixed(2) + " " + targetCurrency}</p>
      </div>
    </div>
  );
}

export default CurrencyConverter;
