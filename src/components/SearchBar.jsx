import React from 'react';

const SearchBar = ({ search, setSearch, placeholder }) => {
  return (
    <input
      type="text"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      placeholder={placeholder}
      className="w-full px-4 py-2 rounded-md shadow border border-gray-300 "
    />
  );
};

export default SearchBar;
