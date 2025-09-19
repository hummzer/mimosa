export interface Trade {
  id: string;
  userId: string;
  symbol: string;
  signal: string;
  timestamp: string;
}

export interface User {
  id: string;
  name?: string | null;
  email?: string | null;
  password?: string | null;
  subscription?: { status: string } | null;
}