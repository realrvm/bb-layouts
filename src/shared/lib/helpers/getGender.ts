export function getGender(gender: "male" | "female" | undefined): string {
  if (!gender) return "Еще не определился";

  const genders: Record<"male" | "female", string> = {
    male: "Мужской",
    female: "Женской",
  };

  return genders[gender];
}
