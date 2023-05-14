interface productInfo {
  name: string;
}

export interface Product {
  code: number;
  name?: productInfo;
  cost_price: number;
  sales_price: number;
  product_code: number;
  qty: number;
}

export interface Code {
  code: number;
}

