import { Months } from "@/shared/lib/types";

export type ProfileLoan = {
  id: number;
  borrower: number;
  status: string;
  created_at: string;
  loaned_at: null;
  loaned_until: null;
  expected_sum: string;
  expected_term: Months;
  appointed_sum: string;
  appointed_term: number;
  vehicle: null;
  appointer: null;
};

export type ProfileLoansSchema = {
  count: number;
  next: null;
  previous: null;
  results: ProfileLoan[];
};

type IdentityDocument = {
  id: number;
  subclass: "internal_passport";
  citizenship: string;
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

export type ProfileIdentitySchema = {
  count: 1;
  next: null;
  previous: null;
  results: IdentityDocument[];
};

export type ProfileResponseSchema = {
  id: number;
  phone_number: "string";
};

export type ProfileResponsePaymentsSheduleResultsSchema = {
  id: number;
  sum: string;
  body: string;
  percents: string;
  commission: string;
  debt_balance: string;
  scheduled_at: string;
  paid_at: null;
};

export type ProfileResponsePaymentsScheduleSchema = {
  count: number;
  next: null;
  previous: null;
  results: ProfileResponsePaymentsSheduleResultsSchema[];
};

type ProfileVehicleResultsSchema = {
  id: number;
  vehicle: {
    id: number;
    vin: string;
    body: string;
    plate: string;
    market_price: string;
    manufacture_year: string;
    owner: number;
    model: {
      id: number;
      name: string;
      make: {
        id: number;
        name: string;
      };
    };
  };
  name: string;
  category: string;
  engine_model_number: string;
  engine_power: string;
  engine_volume: string;
  engine_type: string;
  frame_number: string;
  body_number: string;
  body_color: string;
  eco_class: string;
  max_weight: string;
  free_weight: string;
  manufacturer: string;
  approval_type: string;
  exporter_country: string;
  customs_series: string;
  customs_burdens: string;
  owner_full_name: string;
  registration_address: string;
  passport_office: string;
  passport_office_address: string;
  passport_date: string;
  loan: number;
};

export type ProfileVehicleSchema = {
  count: number;
  next: null;
  previous: null;
  results: ProfileVehicleResultsSchema[];
};

export type ActiveLoansResponseResultsSchema = {
  id: number;
  borrower?: number;
  status?: string;
  created_at?: string;
  loaned_at?: string;
  loaned_until: string;
  expected_sum: string;
  expected_term?: Months;
  appointed_sum: string;
  appointed_term?: Months;
  vehicle?: number;
  appointer?: number;
};

export type ActiveLoansResponseSchema = {
  count?: number;
  next?: boolean;
  previous?: boolean;
  results: ActiveLoansResponseResultsSchema[];
};
