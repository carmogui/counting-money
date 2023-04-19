import { useState } from "react";
import { formatCurrency } from "src/helpers/currency";
import { depositsService } from "src/services";

interface Props {
  value: number;
  maxValue: number;
  date: number;
}

export function Deposit({ value, maxValue, date }: Props) {
  const formattedValue = formatCurrency(value);

  const height = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="10px"
      height="120px"
      viewBox={`0 0 200 ${maxValue}`}
    >
      <rect fill="currentColor" width="800" height={value} />
    </svg>
  );

  return (
    <div className="flex flex-col items-center">
      <div className="flex rotate-180 text-indigo-500">{height}</div>
      <p>{formattedValue}</p>
      <p>date: {date}</p>
    </div>
  );
}

export function DepositHistory() {
  const [deposits, setDeposits] = useState<
    {
      id: number;
      value: number;
      date: number;
    }[]
  >([]);

  async function requestDeposits() {
    const newDeposits = await depositsService.get();

    setDeposits(newDeposits);
  }

  const maxValue = deposits.reduce((acc, { value }) => {
    return value > acc ? value : acc;
  }, 0);
  const renderDeposits = deposits.map(({ value, date }) => (
    <Deposit value={value} maxValue={maxValue} date={date} />
  ));

  return (
    <div className="flex flex-col gap-4">
      <button
        onClick={requestDeposits}
        className="py-2 px-4 rounded-lg w-64 font-semibold text-white bg-indigo-500"
      >
        Request deposits
      </button>

      <div className="flex gap-8">
        {renderDeposits.length ? renderDeposits : "Empty list"}
      </div>
    </div>
  );
}
