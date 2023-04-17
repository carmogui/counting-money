import { formatCurrency } from "src/helpers/currency";

interface Props {
  value: number;
  date: number;
}

export function Deposit({ value, date }: Props) {
  const formattedValue = formatCurrency(value);

  return (
    <div>
      <p>{date}</p>
      <p>-</p>
      <p>{formattedValue}</p>
    </div>
  );
}
