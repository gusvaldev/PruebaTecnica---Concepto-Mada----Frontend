import type { Products } from "../../interfaces/Products";
import "./ProductCard.css";

interface Props {
  product: Products;
}

const ProductCard = ({ product }: Props) => {
  return (
    <div className="product-card">
      <div className="product-card__header">
        <span className={`product-card__badge product-card__badge_tipo`}>
          {product.tipo}
        </span>
        <span className="product-card__price">
          ${product.precio.toLocaleString("es-MX")}
        </span>
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
    </div>
  );
};

export default ProductCard;
