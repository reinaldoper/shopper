

export interface Product {
  code: number;
  name: string;
  cost_price: number;
  sales_price: number;
  product_code: number;
  qty: number;
  product_id: number;
  new_price: number;
}

export interface Code {
  code: number;
}

export interface TObj {
  new_price: number;
  code: number;
  message: string;
  name: string;
  actual_price: number;
}

