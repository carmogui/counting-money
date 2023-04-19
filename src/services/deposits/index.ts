const data = [
  {
    id: 1,
    value: 1800,
    date: 1,
  },
  {
    id: 2,
    value: 1200,
    date: 2,
  },
  {
    id: 3,
    value: 2100,
    date: 3,
  },
  {
    id: 4,
    value: 2500,
    date: 4,
  },
  {
    id: 5,
    value: 3200,
    date: 5,
  },
  {
    id: 6,
    value: 2800,
    date: 6,
  },
];

async function get() {
  return data;
}

export const depositsService = {
  get,
};
