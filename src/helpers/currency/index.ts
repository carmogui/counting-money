export function formatCurrency(value: number = 0) {
  return value.toLocaleString("pt-br", { style: "currency", currency: "BRL" });
}
