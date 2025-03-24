export interface Fund {
    id: number;
    name: string;
    color: string;
    holdings: {
      stock: string;
      weight: number;
    }[];
  }
  
  export interface Investment {
    user_name: string;
    current_value: number;
    initial_value: number;
    best_performing_scheme: string;
    best_performance_change: string;
    worst_performing_scheme: string;
    worst_performance_change: string;
    performance_history: {
      date: string;
      value: number;
    }[];
    sector_allocations: {
      name: string;
      amount: number;
      percentage: string;
      bgcolor: string;
    }[];
  }
  
  export interface InvestmentState {
    investments: Investment[];
    funds: Fund[];
    selectedUser: string;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
  }