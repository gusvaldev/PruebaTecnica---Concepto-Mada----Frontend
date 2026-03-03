import "./SearchBar.css";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const SearchBar = ({ value, onChange }: Props) => {
  return (
    <div className="search-bar">
      <input
        className="search-bar__input"
        type="text"
        placeholder="¿Que estas buscando?"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
