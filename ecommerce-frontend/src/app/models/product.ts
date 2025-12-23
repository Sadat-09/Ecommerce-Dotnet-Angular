export interface Product {
  id: number;
  name: string;
  description:  string;
  price: number;
  stock: number;
  categoryId: number;
  categoryName?:  string;
}

export interface CreateProductDto   {
  name: string;
  description:  string;
    price: number;
    stock: number;
    categoryId: number;
}

export interface UpdateProductDto {
  id: number;
  name:  string;
  description: string;
  price: number;
  stock: number;
  categoryId: number;
}