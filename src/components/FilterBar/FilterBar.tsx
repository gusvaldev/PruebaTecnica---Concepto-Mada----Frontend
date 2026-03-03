import "./FilterBar.css";

type FilterType = "Todos" | "Zapato" | "Bolsa";

interface Props {
  value: FilterType;
  onChange: (value: FilterType) => void;
}

const FILTERS: FilterType[] = ["Todos", "Zapato", "Bolsa"];

const FilterBar = ({ value, onChange }: Props) => {
  return (
    <div className="filter-bar">
      {FILTERS.map((filter) => (
        <button
          key={filter}
          className={`filter-bar__btn ${value === filter ? "filter-bar__btn--active" : ""}`}
          onClick={() => onChange(filter)}
        >
          {filter}
        </button>
      ))}
    </div>
  );
};

export default FilterBar;
