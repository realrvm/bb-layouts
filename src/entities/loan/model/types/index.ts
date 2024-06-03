import { ApplicationStatus } from "@/shared/lib/enums";
import { Months } from "@/shared/lib/types";

export type LoanSchema = {
  expected_term: Months;
  expected_sum: string;
};

type LoansResultPayments = {
  id: number;
  sum: string;
  scheduled_at: string;
  paid_at: string;
};

type LoansResult = {
  id: number;
  payments: LoansResultPayments[];
  created_at: string;
  approved_at: string;
  loaned_at: string;
  sum: string;
  term: number;
  borrower: number;
  vehicle: number;
};

export type LoansSchema = {
  count: number;
  next: string;
  previous: string;
  results: LoansResult[];
};

type LoansResponsePayments = {
  id: number;
  sum: string;
  scheduled_at: string;
  paid_at: string;
};

export type LoansResponseSchema = {
  id: string;
  payments: LoansResponsePayments[];
  created_at: string;
  approved_at: string;
  loaned_at: string;
  sum: string;
  term: number;
  borrower: number;
  vehicle: 0;
};

export type LoansRequestSchema = {
  appointed_sum: number;
  appointed_term: Months;
};

export type ExpectedLoansRequestSchema = {
  expected_sum: string;
  expected_term: Months;
};

export type LastLoanSchema = {
  id: number;
  borrower: number;
  status: ApplicationStatus;
  created_at: string;
  loaned_at: string;
  loaned_until: string;
  expected_sum: string;
  expected_term: number;
  appointed_sum: string;
  appointed_term: number;
  vehicle: number;
  appointer: number;
};
