export type ReportsPlateSchema = {
  plate: string;
  uid: string;
  submitted_at: string;
  is_new: boolean;
  eta: string;
};

export type AutoDescrSchema = {
  uid?: string;
  make: {
    id?: number;
    name: string;
  };
  model: {
    id?: number;
    make_on_read?: {
      id: number;
      name: string;
    };
    name: string;
  };
  manufacture_year: number;
  body: string;
  vin: string;
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
  approved_at?: string;
  loaned_at?: string;
  sum: string;
  term: number;
  borrower?: number;
  vehicle?: 0;
};

export type ModelObjectRequest = {
  owner?: number;
  model: number;
  body?: string;
  vin?: string;
  manufacture_year: string;
  plate: string;
};

export type ModelObjectResponse = {
  id: number;
};
