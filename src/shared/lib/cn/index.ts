export type Mods = Record<string, boolean | string | undefined>;

export const cn = (
  className: string,
  mods: Record<string, boolean | undefined | string> = {},
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
