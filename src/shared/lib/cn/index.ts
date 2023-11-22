export const cn = (
  className: string,
  mods: Record<string, boolean | undefined> = {},
  additional: (string | undefined)[] = [],
): string => {
  const modsKeys: string[] = Object.entries(mods).reduce(
    (prev: string[], [key, value]) => {
      return value ? [...prev, key] : prev;
    },
    [],
  );

  return [className, ...additional.filter(Boolean), ...modsKeys]
    .join(" ")
    .trim();
};
