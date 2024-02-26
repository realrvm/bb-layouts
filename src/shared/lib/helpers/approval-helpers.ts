export type GetMap = {
  help_text: string;
  value: number;
};

/**
 *  Returns the color for the given approval level.
 *
 *  @param {string} approval - The approval level to get the color for.
 *  @param {CSSModuleClasses} styles - The styles containing the color classes.
 *  @returns {string} The color for the given approval level.
 */
export function getProbabilityOfApprovalColor(
  approval: string,
  styles: CSSModuleClasses,
): string {
  switch (approval) {
    case "very high":
    case "очень высокая":
      return styles["approval-high"];
    case "high":
    case "высокая":
      return styles["approval-high"];
    case "average":
    case "средняя":
      return styles["approval-average"];
    case "initial":
      return styles["approval-initial"];
    default:
      return styles["approval-low"];
  }
}

/**
 *  Returns the probability of approval based on the given approval string.
 *
 *  @param {string} approval - The approval string to be evaluated.
 *  @returns {string} The probability of approval.
 */
export function getProbabilityOfApproval(approval: string): string {
  switch (approval) {
    case "very high":
    case "очень высокая":
      return "Очень высокая";
    case "high":
    case "высокая":
      return "Высокая";
    case "average":
    case "средняя":
      return "Средняя";
    default:
      return "Низкая";
  }
}

/**
 *  Creates a map of help texts based on the given data array.
 *
 *  @param {GetMap} data - The array of GetMap objects containing help texts and values.
 *  @returns {Record<number | string, string>} The map of help texts.
 */
export function getMap(data: GetMap[]) {
  return data.reduce((prev, next) => {
    const { help_text, value } = next;

    return { ...prev, [value]: help_text };
  }, {});
}

/**
 *  Returns the help text for a given value and data.
 *
 *  @param {number} val - The value to find help text for.
 *  @param {GetMap} data - The data containing the help text.
 *  @returns {string} The help text for the given value.
 */
export function getHelpText(val: number, data: GetMap[]): string {
  if (!val) return "initial";
  const obj: Record<number | string, string> = getMap(data);
  const points: number[] = Object.keys(obj)
    .map(Number)
    .sort((a, b) => a - b)
    .reduceRight((acc, point, i, arr) => {
      if (val <= point) {
        acc.push(point);
        return acc;
      }
      if (i === arr.length - 1) {
        acc.push(arr[i + 1]);
      }
      return acc;
    }, [] as number[]);

  if (points.length === 0) return "low";
  return obj[points[points.length - 1]];
}

/**
 * Calculates the percentage of price in sum
 * @param {string} sum - Desired loan amount
 * @param {string} price - Market price of the car
 * @returns {number} - percent
 */
export function calcPercents(sum: string, price: string): number {
  if (!sum) return 0;
  const amount = price.replace(/\D/g, "");

  const approvalPercents = (Number(amount) / Number(sum || "1")) * 100;

  return approvalPercents < 100 ? approvalPercents : 100;
}
