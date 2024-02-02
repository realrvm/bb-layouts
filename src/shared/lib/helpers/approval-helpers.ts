type GetMap = {
  help_text: string;
  value: number;
};

export function getProbabilityOfApprovalColor(
  approval: string,
  styles: CSSModuleClasses,
): string {
  switch (approval) {
    case "very high":
      return styles["approval-high"];
    case "high":
      return styles["approval-high"];
    case "average":
      return styles["approval-average"];
    default:
      return styles["approval-low"];
  }
}

export function getProbabilityOfApproval(approval: string): string {
  switch (approval) {
    case "very high" || "очень высокая":
      return "Очень высокая";
    case "high" || "высокая":
      return "Высокая";
    case "average" || "средняя":
      return "Средняя";
    default:
      return "Низкая";
  }
}

function getMap(data: GetMap[]) {
  return data.reduce((prev, next) => {
    const { help_text, value } = next;

    return { ...prev, [value]: help_text };
  }, {});
}

export function getHelpText(val: number, data: GetMap[]): string {
  const obj: Record<number | string, string> = getMap(data);
  const points: number[] = Object.keys(obj)
    .map(Number)
    .sort((a, b) => a - b);

  if (val <= points[0]) return obj[points[0]];
  if (val > points[0] && val <= points[1]) return obj[points[1]];
  if (val > points[1] && val <= points[2]) return obj[points[2]];
  return "low";
}

/**
 * Calculates the percentage of price in sum
 * @param {string} sum - Desired loan amount
 * @param {string} price - Market price of the car
 * @returns {number} - percent
 */
export function calcPercents(sum: string, price: string): number {
  const amount = price.replace(/\D/g, "");

  return (Number(amount) / Number(sum || "1")) * 100;
}
