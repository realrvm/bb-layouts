export function getStatusState(status: string): string[] {
  const statuses = {
    loan_sum_selected: ["Не завершена", "not-completed"],
    car_data_selected: ["Не завершена", "not-completed"],
    car_evaluated: ["Рассматривается", "under-consideration"],
    approved: ["Одобрена", "approved"],
    data_check: ["Одобрена", "approved"],
    agent_work: ["Одобрена", "approved"],
    active: ["Активная", "active-application"],
    refused: ["Не одобрена", "refused"],
  };

  return statuses[status];
}
