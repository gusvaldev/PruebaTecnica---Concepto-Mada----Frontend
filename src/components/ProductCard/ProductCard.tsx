import type { Products } from "../../interfaces/Products";
import "./ProductCard.css";

interface Props {
  product: Products;
  onEdit: (product: Products) => void;
  onDelete: (id: Products["id"]) => void;
}

const ProductCard = ({ product, onEdit, onDelete }: Props) => {
  return (
    <div className="product-card">
      <div className="product-card__header">
        <span className="product-card__badge">{product.tipo}</span>
        <span className="product-card__price">${Number(product.precio)}</span>
      </div>

      <h3 className="product-card__name">{product.nombre}</h3>

      <div className="product-card__details">
        <div className="product-card__detail">
          <span className="product-card__label">Color</span>
          <span className="product-card__value">{product.color}</span>
        </div>
        <div className="product-card__detail">
          <span className="product-card__label">Talla</span>
          <span className="product-card__value">{product.talla}</span>
        </div>
      </div>

      <div className="product-card__actions">
        <button
          className="product-card__btn product-card__btn--edit"
          onClick={() => onEdit(product)}
        >
          Editar
        </button>
        <button
          className="product-card__btn product-card__btn--delete"
          onClick={() => onDelete(product.id)}
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
