import { FormEvent, useState } from "react";

const ANNUAL_FEE = 13.6;
const MONTHLY_FEE = ANNUAL_FEE / 12 / 100;
const MONTHLY_TAX = 22.5 / 100;

export function TimeFeeCalculator() {
  const [result, setResult] = useState({
    withoutTaxes: 0,
    total: 0,
  });

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

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center rounded-lg shadow-md p-14 rounded-3xl"
    >
      <div className="flex flex-col gap-2">
        <div>
          <label htmlFor="start" className="flex">
            Start
          </label>
          <input
            id="start"
            name="start"
            type="number"
            className="p-2 border-solid border-2  rounded-lg focus:border-indigo-600"
          />
        </div>

        <div>
          <label htmlFor="value" className="flex">
            Value
          </label>
          <input
            id="value"
            name="value"
            type="number"
            className="p-2 border-solid border-2 focus:border-indigo-600 rounded-lg"
          />
        </div>

        <div>
          <label htmlFor="years" className="flex">
            Years
          </label>
          <input
            id="years"
            name="years"
            type="number"
            className="p-2 border-solid border-2 focus:border-indigo-600 rounded-lg"
          />
        </div>

        <button type="submit" className="p-2 bg-indigo-600 rounded-lg">
          submit
        </button>
      </div>

      <div>
        <p>Without taxes:</p>
        <span>{formatCurrency(result.withoutTaxes)}</span>

        <p>Result:</p>
        <span>{formatCurrency(result.total)}</span>

        <p>Per mounth:</p>
        <span>{formatCurrency(addTaxes(result.total) - result.total)}</span>
      </div>
    </form>
  );
}
