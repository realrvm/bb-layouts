export type ReportsPlateSchema = {
  plate: string;
  uid: string;
  submitted_at: string;
  is_new: boolean;
  eta: string;
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
