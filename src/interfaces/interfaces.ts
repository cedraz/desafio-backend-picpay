export interface User {
  name: string;
  document: string;
  email: string;
  password: string;
  balance: number;
  type: string;
}

export interface Transaction {
  amount: number;
  payerId: number;
  receiverId: number;
  DateTime: Date;
}

export interface Set {
  headers: object | undefined;
  status: number | undefined;
}
