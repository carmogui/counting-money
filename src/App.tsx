import { FormEvent, useEffect, useState } from "react";
import { Deposit } from "src/components";
import { depositsService } from "src/services";
import "./styles.scss";

const ANNUAL_FEE = 13;
const MONTHLY_FEE = ANNUAL_FEE / 12 / 100;
const MONTHLY_TAX = 22.5 / 100;

function App() {
  const [result, setResult] = useState({
    withoutTaxes: 0,
    total: 0,
  });
  const [deposits, setDeposits] = useState<any[]>([]);

  function addTaxes(total = 0, value = 0) {
    const fee = total * MONTHLY_FEE;
    const realFee = fee - fee * MONTHLY_TAX;

    return total + value + realFee;
  }

  function formatCurrency(value = 0) {
    return value.toLocaleString("pt-br", {
      style: "currency",
      currency: "BRL",
    });
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const start = Number(formData.get("start")) || 0;
    const value = Number(formData.get("value")) || 0;
    const years = Number(formData.get("years")) || 0;

    const withoutTaxes = value * years * 12 + start;
    const newResult = new Array(years * 12).fill(value).reduce(addTaxes, start);

    setResult({
      withoutTaxes,
      total: newResult,
    });
  }

  useEffect(() => {
    async function getDeposits() {
      const data = await depositsService.get();

      setDeposits(data);
    }

    getDeposits();
  }, []);

  const renderDeposits = deposits.map(({ value, date }) => (
    <Deposit value={value} date={date} />
  ));

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="top-wrapper">
        <label htmlFor="start">Start</label>
        <input id="start" name="start" type="number" />

        <label htmlFor="value">Value</label>
        <input id="value" name="value" type="number" />

        <label htmlFor="years">Years</label>
        <input id="years" name="years" type="number" />

        <button type="submit">submit</button>
      </div>

      <div>
        <p>Without taxes:</p>
        <span>{formatCurrency(result.withoutTaxes)}</span>

        <p>Result:</p>
        <span>{formatCurrency(result.total)}</span>

        <p>Per mounth:</p>
        <span>{formatCurrency(addTaxes(result.total) - result.total)}</span>
      </div>

      {renderDeposits}
    </form>
  );
}

export default App;
