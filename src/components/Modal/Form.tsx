import { useState, useEffect } from "react";
import type { Products } from "../../interfaces/Products";
import "./Form.css";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (product: Omit<Products, "id">) => void;
  product?: Products | null;
}

const initialForm: Omit<Products, "id"> = {
  nombre: "",
  color: "",
  tipo: "Zapato",
  talla: "",
  precio: 0,
};

const ProductForm = ({ isOpen, onClose, onSubmit, product }: Props) => {
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    if (product) {
      setForm({
        nombre: product.nombre,
        color: product.color,
        tipo: product.tipo,
        talla: product.talla,
        precio: Number(product.precio),
      });
    } else {
      setForm(initialForm);
    }
  }, [product, isOpen]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "precio" ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="Form-overlay" onClick={onClose}>
      <div className="Form" onClick={(e) => e.stopPropagation()}>
        <div className="Form__header">
          <h2>{product ? "Editar Producto" : "Nuevo Producto"}</h2>
          <button className="Form__close" onClick={onClose}>
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="Form__form">
          <div className="Form__field">
            <label htmlFor="nombre">Nombre</label>
            <input
              id="nombre"
              name="nombre"
              type="text"
              value={form.nombre}
              onChange={handleChange}
              required
            />
          </div>

          <div className="Form__field">
            <label htmlFor="color">Color</label>
            <input
              id="color"
              name="color"
              type="text"
              value={form.color}
              onChange={handleChange}
              required
            />
          </div>

          <div className="Form__field">
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

          <div className="Form__field">
            <label htmlFor="talla">Talla</label>
            <input
              id="talla"
              name="talla"
              type="text"
              value={form.talla}
              onChange={handleChange}
              required
            />
          </div>

          <div className="Form__field">
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

          <div className="Form__actions">
            <button
              type="button"
              onClick={onClose}
              className="Form__btn Form__btn--cancel"
            >
              Cancelar
            </button>
            <button type="submit" className="Form__btn Form__btn--submit">
              {product ? "Actualizar" : "Crear"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
