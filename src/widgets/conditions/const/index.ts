const borrower = [
  { content: "Собственник автомобиля", id: 1 },
  { content: "Возраст от 18 до 55 лет", id: 2 },
  { content: "С любой кредитной историей", id: 3 },
];

const auto = [
  { content: "Машина в исправном состоянии", id: 1 },
  { content: "Не имеет ограничений", id: 2 },
  { content: "Старше 2000г.", id: 3 },
];

const docs = [
  { content: "Паспорт", id: 1 },
  { content: "ПТС", id: 2 },
  { content: "Банковская карта", id: 3 },
];

export const conditional_btns = [
  { borrower: "Для заемщика" },
  { auto: "Для автомобиля" },
  { docs: "Для документов" },
];

export const cards = { borrower, auto, docs };
