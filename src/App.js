import { useState, useEffect, useRef } from "react";
import { Block } from "./Block";
import "./index.scss";

function App() {
  const [fromCurrnecy, setFromCurrency] = useState("RUB");
  const [toCurrnecy, setToCurrency] = useState("USD");
  const [fromPrice, setFromprice] = useState(0);
  const [toPrice, setToprice] = useState(1);
  // const [rates, setRetas] = useState({});
  const rates = useRef({});
  useEffect(() => {
    fetch("https:/cdn.cur.su/api/latest.json")
      .then((res) => res.json())
      .then((json) => {
        // setRetas(json.rates);
        rates.current = json.rates;
        console.log(rates.current);
        onChangeToPrice(1);
      });
  }, []);
  const onChangeFromPrice = (value) => {
    const price = value / rates[fromCurrnecy];
    const result = price * rates[toCurrnecy];
    setFromprice(value);
    setToprice(result);
  };
  const onChangeToPrice = (value) => {
    const rusult = (rates[fromCurrnecy] / rates[toCurrnecy]) * value;
    setFromprice(rusult);
    setToprice(value);
  };
  useEffect(() => {
    onChangeFromPrice(fromPrice);
  }, [fromCurrnecy]);
  useEffect(() => {
    onChangeToPrice(toPrice);
  }, [toCurrnecy]);
  return (
    <div className="App">
      <Block
        value={fromPrice}
        currency={fromCurrnecy}
        onChangeCurrency={setFromCurrency}
        onChangeValue={onChangeFromPrice}
      />
      <Block
        value={toPrice}
        currency={toCurrnecy}
        onChangeCurrency={setToCurrency}
        onChangeValue={onChangeToPrice}
      />
    </div>
  );
}

export default App;
