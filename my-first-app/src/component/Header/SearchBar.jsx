import React, { useState,  useRef } from "react";
import debounce from "lodash/debounce";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  // useRef ile debounce fonksiyonunu sadece bir kere oluştur
  const debouncedSearch = useRef(
    debounce((searchQuery) => {
      console.log("Debounced search triggered:", searchQuery);
      onSearch(searchQuery);
    }, 500)
  ).current;

  const handleInputChange = (value) => {
    setQuery(value);
    debouncedSearch(value); // Debounce ile API'yi tetikle
  };

  return (
    <div
      style={{
        display: "flex",
        gap: "10px",
        padding: "10px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        backgroundColor: "#fff",
      }}
    >
      <input
        type="text"
        placeholder="Search for a venue..."
        value={query}
        onChange={(e) => handleInputChange(e.target.value)}
        style={{
          flex: 1,
          padding: "10px",
          border: "1px solid #ccc",
          borderRadius: "4px",
        }}
      />
      <button
        onClick={() => onSearch(query)}
        style={{
          backgroundColor: "#EA6659",
          color: "#fff",
          padding: "10px",
          borderRadius: "4px",
          border: "none",
          cursor: "pointer",
        }}
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;

