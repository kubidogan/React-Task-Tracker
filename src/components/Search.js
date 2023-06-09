import { useState } from "react";

const Search = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className="search">
      <input
        className="search"
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={handleChange}
      />
    </div>
  );
};

export default Search;
