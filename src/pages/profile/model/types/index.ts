type ProfileLoan = {
  id: number;
  expected_sum: string;
  term: number;
  created_at: string;
};

type IdentityDocument = {
  id: number;
  subclass: "internal_passport";
  user: number;
  first_name: string;
  patronymic: string;
  last_name: string;
  sex: "male" | "female";
  date_of_birth: string;
  series: string;
  number: string;
  place_of_birth: string;
  date_of_issue: string;
  name_of_issuer: string;
  subdivision_code: string;
};

export type ProfileResponseSchema = {
  id: number;
  phone_number: "string";
  loans: ProfileLoan[];
  identity_documents: IdentityDocument[];
};
