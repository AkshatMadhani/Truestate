import { useState } from 'react';

const SearchBar = ({ onSearch, onSortChange, currentSort }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl shadow-sm border border-purple-100 p-4">
      <div className="flex items-center gap-4">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search by customer name or phone number..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full bg-white text-slate-700 py-3 px-4 pl-12 rounded-lg text-sm border border-purple-200 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all placeholder:text-slate-400"
          />
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400 text-xl">
            🔍
          </span>
        </div>

        <select
          value={`${currentSort.sortBy}-${currentSort.sortOrder}`}
          onChange={(e) => {
            const [sortBy, sortOrder] = e.target.value.split('-');
            onSortChange({ sortBy, sortOrder });
          }}
          className="bg-white text-slate-700 px-4 py-3 rounded-lg text-sm border border-purple-200 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 cursor-pointer min-w-[220px] transition-all"
        >
          <option value="date-desc">📅 Date (Newest First)</option>
          <option value="date-asc">📅 Date (Oldest First)</option>
          <option value="quantity-desc">📦 Quantity (High to Low)</option>
          <option value="quantity-asc">📦 Quantity (Low to High)</option>
          <option value="customerName-asc">👤 Customer Name (A-Z)</option>
          <option value="customerName-desc">👤 Customer Name (Z-A)</option>
        </select>
      </div>
    </div>
  );
};

export default SearchBar;