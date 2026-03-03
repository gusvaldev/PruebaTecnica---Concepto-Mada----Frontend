import { useState, useEffect } from "react";
import { useProducts } from "../../hooks/useProducts";
import FilterBar from "../FilterBar/FilterBar";
import ProductCard from "../ProductCard/ProductCard";
import SearchBar from "../SearchBar/SearchBar";
import type { Products } from "../../interfaces/Products";
import "./Dashboard.css";

const initialForm: Omit<Products, "id"> = {
  nombre: "",
  color: "",
  tipo: "Zapato",
  talla: "",
  precio: 0,
};

const Dashboard = () => {
  const {
    filteredProducts,
    totalProducts,
    loading,
    error,
    search,
    setSearch,
    filter,
    setFilter,
    createProduct,
    deleteProduct,
    updateProduct,
  } = useProducts();

  const [editingProduct, setEditingProduct] = useState<Products | null>(null);
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    if (editingProduct) {
      setForm({
        nombre: editingProduct.nombre,
        color: editingProduct.color,
        tipo: editingProduct.tipo,
        talla: editingProduct.talla,
        precio: Number(editingProduct.precio),
      });
    } else {
      setForm(initialForm);
    }
  }, [editingProduct]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "precio" ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProduct) {
      await updateProduct(editingProduct.id, form);
      setEditingProduct(null);
    } else {
      await createProduct(form);
    }
    setForm(initialForm);
  };

  const handleEdit = (product: Products) => {
    setEditingProduct(product);
  };

  const handleDelete = async (id: Products["id"]) => {
    await deleteProduct(id);
  };

  const handleCancel = () => {
    setEditingProduct(null);
    setForm(initialForm);
  };

  return (
    <div className="dashboard">
      <header className="dashboard__header">
        <h1 className="dashboard__title">Dashboard</h1>
      </header>

      <div className="dashboard__body">
        <aside className="dashboard__sidebar">
          <h2 className="dashboard__form-title">
            {editingProduct ? "Editar Producto" : "Agrega nuevos productos"}
          </h2>

          <form onSubmit={handleSubmit} className="dashboard__form">
            <div className="form__field">
              <label htmlFor="nombre">Nombre</label>
              <input
                id="nombre"
                name="nombre"
                type="text"
                value={form.nombre}
                onChange={handleChange}
                placeholder="Ej. Nike Air Force"
                required
              />
            </div>

            <div className="form__field">
              <label htmlFor="color">Color</label>
              <input
                id="color"
                name="color"
                type="text"
                value={form.color}
                onChange={handleChange}
                placeholder="Ej. Negro"
                required
              />
            </div>

            <div className="form__field">
              <label htmlFor="tipo">Tipo</label>
              <select
                id="tipo"
                name="tipo"
                value={form.tipo}
                onChange={handleChange}
              >
                <option value="Zapato">Zapato</option>
                <option value="Bolsa">Bolsa</option>
              </select>
            </div>

            <div className="form__field">
              <label htmlFor="talla">Talla</label>
              <input
                id="talla"
                name="talla"
                type="text"
                value={form.talla}
                onChange={handleChange}
                placeholder="Ej. 8MX"
                required
              />
            </div>

            <div className="form__field">
              <label htmlFor="precio">Precio</label>
              <input
                id="precio"
                name="precio"
                type="number"
                value={form.precio}
                onChange={handleChange}
                min="0"
                step="0.01"
                required
              />
            </div>

            <div className="form__actions">
              {editingProduct && (
                <button
                  type="button"
                  className="form__btn form__btn--cancel"
                  onClick={handleCancel}
                >
                  Cancelar
                </button>
              )}
              <button type="submit" className="form__btn form__btn--submit">
                {editingProduct ? "Actualizar" : "Crear producto"}
              </button>
            </div>
          </form>
        </aside>

        <main className="dashboard__main">
          <div className="dashboard__controls">
            <SearchBar value={search} onChange={setSearch} />
            <FilterBar value={filter} onChange={setFilter} />
          </div>

          {loading && (
            <p className="dashboard__state-text">Cargando productos...</p>
          )}
          {error && (
            <p className="dashboard__state-text dashboard__state--error">
              {error}
            </p>
          )}
          {!loading && !error && filteredProducts.length === 0 && (
            <p className="dashboard__state-text">
              No se encontraron productos.
            </p>
          )}
          {!loading && !error && filteredProducts.length > 0 && (
            <div className="dashboard__grid">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
