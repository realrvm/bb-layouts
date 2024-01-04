// TODO Временная функция для стилизации. Удалить!!!
export function colorRequests(res: string) {
  const variants: Record<string, string> = {
    Одобрена: "green",
    Рассматривается: "orange",
    "Не завершена": "grey",
    "Не одобрена": "red",
  };

  return variants[res];
}
