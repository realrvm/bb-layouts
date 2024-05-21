export function formatNumber(num: string | number) {
  return new Intl.NumberFormat("ru-RU").format(+num);
}
