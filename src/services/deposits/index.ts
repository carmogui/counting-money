const data = [
  {
    id: 1,
    value: 100,
    date: 1,
  },
  {
    id: 2,
    value: 100,
    date: 2,
  },
];

async function get() {
  return data;
}

export const depositsService = {
  get,
};
