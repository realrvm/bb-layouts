type ProfileLoan = {
  id: number;
  sum: string;
  term: number;
  created_at: string;
};

export type ProfileResponseSchema = {
  id: number;
  phone_number: "string";
  loans: ProfileLoan[];
};
