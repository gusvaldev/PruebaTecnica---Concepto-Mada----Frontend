import { useEffect, useState } from "react";
import type { Products } from "../interfaces/Products";
import { productService } from "../services/productService";

type FilterType = "Todos" | "Zapato" | "Bolsa";

export const useProducts = () => {
  const [products, setProducts] = useState<Products[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<FilterType>("Todos");

  useEffect(() => {
    productService
      .getAll()
      .then(setProducts)
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.nombre
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesFilter = filter === "Todos" || product.tipo === filter;
    return matchesSearch && matchesFilter;
  });

  const createProduct = async (product: Omit<Products, "id">) => {
    try {
      const newProduct = await productService.createProduct(product);
      console.log("Nuevo producto", newProduct);
      const updatedProducts = [...products, newProduct];
      setProducts(updatedProducts);
      return { success: true, product: newProduct };
    } catch (error) {
      return { success: false, error: "Error al crear el producto" };
    }
  };

  const updateProduct = async (
    id: Products["id"],
    product: Partial<Products>,
  ) => {
    try {
      const updatedProduct = await productService.updateProduct(id, product);
      console.log(updatedProduct);
      setProducts(products.map((p) => (p.id === id ? updatedProduct : p)));
      return { success: true, product: updatedProduct };
    } catch (error) {
      return { success: false, error: "Error al actualizar el producto" };
    }
  };

  const deleteProduct = async (id: Products["id"]) => {
    try {
      await productService.deleteProduct(id);
      setProducts(products.filter((p) => p.id !== id));
      return { success: true };
    } catch (error) {
      return { success: false, error: "Error al eliminar el producto" };
    }
  };

  return {
    filteredProducts,
    totalProducts: products.length,
    loading,
    error,
    search,
    setSearch,
    filter,
    setFilter,
    createProduct,
    updateProduct,
    deleteProduct,
  };
};
