import { useProducts } from "../../hooks/useProducts";
import FilterBar from "../FilterBar/FilterBar";
import ProductCard from "../ProductCard/ProductCard";
import SearchBar from "../SearchBar/SearchBar";
import "./Dashboard.css";

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
  } = useProducts();

  return (
    <div className="dashboard">
      <header className="dashboard__header">
        <div>
          <h1 className="dashboard__title">Dashboard</h1>
        </div>
      </header>

      <div className="dashboard__controls">
        <SearchBar value={search} onChange={setSearch} />
        <FilterBar value={filter} onChange={setFilter} />
      </div>

      {loading && (
        <div className="dashboard__state">
          <p className="dashboard__state-text">Cargando productos...</p>
        </div>
      )}

      {error && (
        <div className="dashboard__state dashboard__state--error">
          <p className="dashboard__state-text">Error: {error}</p>
        </div>
      )}

      {!loading && !error && filteredProducts.length === 0 && (
        <div className="dashboard__state">
          <p className="dashboard__state-text">No se encontraron productos.</p>
        </div>
      )}

      {!loading && !error && filteredProducts.length > 0 && (
        <div className="dashboard__grid">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
