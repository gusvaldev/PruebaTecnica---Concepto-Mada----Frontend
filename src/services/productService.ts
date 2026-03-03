import type { Products } from "../interfaces/Products";

const BASE_URL = "http://localhost:3000/product";

export const productService = {
  getAll: async (): Promise<Products[]> => {
    const response = await fetch(BASE_URL);
    const data = await response.json();
    return data.products;
  },

  createProduct: async (product: Omit<Products, "id">): Promise<Products> => {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });

    const data = await response.json();
    return data.newProduct;
  },

  updateProduct: async (
    id: Products["id"],
    product: Partial<Products>,
  ): Promise<Products> => {
    console.log(id, product);
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });

    const data = await response.json();
    return data.updatedProduct;
  },

  deleteProduct: async (id: Products["id"]): Promise<void> => {
    await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
    });
  },
};
