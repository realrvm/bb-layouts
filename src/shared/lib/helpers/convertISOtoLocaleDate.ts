export function convertISOtoLocaleDate(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString("ru-RU");
}
