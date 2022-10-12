export type OrderType = {
  id?: number;
  user_id: number;
  order_status: string;
  products: ProductsOrderType[];
};

export type OrderProductsType = {
  id?: number;
  user_id: number;
  order_status: string;
  products: ProductNumberType[];
};

export type UserType = {
  id?: number;
  userName?: string;
  password: string;
  firstName?: string;
  lastName?: string;
};

export type UserUpdatedType = {
  id?: number;
  userName?: string;
  firstName?: string;
  lastName?: string;
};

export type ProductType = {
  id?: number;
  product_name: string;
  price: number;
  category: string;
};

export type ProductUpdatedType = {
  id?: number;
  product_name?: string;
  price?: number;
  category?: string;
};

export type ProductsOrderType = {
  product_id: number;
  order_id: number;
  quantity: number;
};

export interface ProductNumberType extends ProductType {
  quantity?: number;
}

export type UserTestType = {
  id?: number;
  userName?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
};
