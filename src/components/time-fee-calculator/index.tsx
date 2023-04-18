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
    <div className="flex gap-6 shadow-lg p-5 rounded-xl bg-white">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-2 w-72"
      >
        <div className="w-full">
          <label htmlFor="start" className="flex pl-2">
            Start
          </label>

          <input
            id="start"
            name="start"
            type="number"
            className="p-2 border-solid border-2  rounded-lg focus:border-indigo-600 w-full"
          />
        </div>

        <div className="w-full">
          <label htmlFor="value" className="flex pl-2">
            Value
          </label>

          <input
            id="value"
            name="value"
            type="number"
            className="p-2 border-solid border-2 focus:border-indigo-600 rounded-lg w-full"
          />
        </div>

        <div className="w-full">
          <label htmlFor="years" className="flex pl-2">
            Years
          </label>

          <input
            id="years"
            name="years"
            type="number"
            className="p-2 border-solid border-2 focus:border-indigo-600 rounded-lg w-full"
          />
        </div>

        <button
          type="submit"
          className="p-2 bg-indigo-700 rounded-lg text-white font-medium mt-4 w-full"
        >
          Calculate
        </button>
      </form>

      <div className="flex bg-indigo-700 w-1" />

      <div className="flex flex-col gap-2 w-72">
        <div className="flex flex-col">
          <p>Without taxes:</p>

          <span className="border-solid border-2 p-2 rounded-lg">
            {formatCurrency(result.withoutTaxes)}
          </span>
        </div>

        <div className="flex flex-col">
          <p>Result:</p>

          <span className="border-solid border-2 p-2 rounded-lg">
            {formatCurrency(result.total)}
          </span>
        </div>

        <div className="flex flex-col">
          <p>Per mounth:</p>

          <span className="border-solid border-2 p-2 rounded-lg">
            {formatCurrency(addTaxes(result.total) - result.total)}
          </span>
        </div>
      </div>
    </div>
  );
}
