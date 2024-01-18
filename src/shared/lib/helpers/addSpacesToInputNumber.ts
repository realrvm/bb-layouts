/**
 * The function replaces punctuation marks with spaces
 * @param {number} num -
 * @returns {string}
 */
export function getWithSpaces(num: number): string {
  return num.toLocaleString().replace(/[,. ]/g, " ");
}
