import { useState } from 'react';

const TopFilterBar = ({ onFilterChange, activeFilters, filterOptions }) => {
  const [localFilters, setLocalFilters] = useState({
    region: activeFilters.region || '',
    gender: activeFilters.gender || '',
    ageMin: activeFilters.ageMin || '',
    ageMax: activeFilters.ageMax || '',
    category: activeFilters.category || '',
    tags: activeFilters.tags || '',
    paymentMethod: activeFilters.paymentMethod || '',
    dateFrom: activeFilters.dateFrom || '',
    dateTo: activeFilters.dateTo || ''
  });

  const handleFilterChange = (key, value) => {
    const updated = { ...localFilters, [key]: value };
    setLocalFilters(updated);
    onFilterChange(updated);
  };

  const handleClearFilters = () => {
    const cleared = {
      region: '',
      gender: '',
      ageMin: '',
      ageMax: '',
      category: '',
      tags: '',
      paymentMethod: '',
      dateFrom: '',
      dateTo: ''
    };
    setLocalFilters(cleared);
    onFilterChange(cleared);
  };

  const hasActiveFilters = Object.values(localFilters).some(v => v !== '');

  return (
    <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl shadow-sm border border-indigo-100 p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-indigo-700 text-sm font-bold flex items-center gap-2">
          <span>🔧</span>
          <span>FILTERS</span>
        </h3>
        {hasActiveFilters && (
          <button
            onClick={handleClearFilters}
            className="text-purple-600 text-sm hover:text-purple-700 font-medium transition-colors flex items-center gap-1 px-3 py-1 rounded-lg hover:bg-white"
          >
            <span>✕</span>
            <span>Clear All</span>
          </button>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-3">
        <select 
          value={localFilters.region}
          onChange={(e) => handleFilterChange('region', e.target.value)}
          className="bg-white text-slate-700 px-4 py-2.5 rounded-lg text-sm border border-indigo-200 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 cursor-pointer transition-all"
        >
          <option value="">🌍 All Regions</option>
          {filterOptions.regions?.map(region => (
            <option key={region} value={region}>{region}</option>
          ))}
        </select>

        <select 
          value={localFilters.gender}
          onChange={(e) => handleFilterChange('gender', e.target.value)}
          className="bg-white text-slate-700 px-4 py-2.5 rounded-lg text-sm border border-indigo-200 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 cursor-pointer transition-all"
        >
          <option value="">👥 All Genders</option>
          {filterOptions.genders?.map(gender => (
            <option key={gender} value={gender}>{gender}</option>
          ))}
        </select>

        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder="Min Age"
            value={localFilters.ageMin}
            onChange={(e) => handleFilterChange('ageMin', e.target.value)}
            className="bg-white text-slate-700 px-3 py-2.5 rounded-lg text-sm border border-indigo-200 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 w-full transition-all"
            min="0"
            max="120"
          />
          <span className="text-indigo-400 font-bold">-</span>
          <input
            type="number"
            placeholder="Max Age"
            value={localFilters.ageMax}
            onChange={(e) => handleFilterChange('ageMax', e.target.value)}
            className="bg-white text-slate-700 px-3 py-2.5 rounded-lg text-sm border border-indigo-200 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 w-full transition-all"
            min="0"
            max="120"
          />
        </div>

        <select 
          value={localFilters.category}
          onChange={(e) => handleFilterChange('category', e.target.value)}
          className="bg-white text-slate-700 px-4 py-2.5 rounded-lg text-sm border border-indigo-200 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 cursor-pointer transition-all"
        >
          <option value="">📦 All Categories</option>
          {filterOptions.categories?.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>

        <select 
          value={localFilters.tags}
          onChange={(e) => handleFilterChange('tags', e.target.value)}
          className="bg-white text-slate-700 px-4 py-2.5 rounded-lg text-sm border border-indigo-200 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 cursor-pointer transition-all"
        >
          <option value="">🏷️ All Tags</option>
          {filterOptions.tags?.map(tag => (
            <option key={tag} value={tag}>{tag}</option>
          ))}
        </select>

        <select 
          value={localFilters.paymentMethod}
          onChange={(e) => handleFilterChange('paymentMethod', e.target.value)}
          className="bg-white text-slate-700 px-4 py-2.5 rounded-lg text-sm border border-indigo-200 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 cursor-pointer transition-all"
        >
          <option value="">💳 All Payment Methods</option>
          {filterOptions.paymentMethods?.map(method => (
            <option key={method} value={method}>{method}</option>
          ))}
        </select>

        <div className="flex items-center gap-2 col-span-2">
          <input
            type="date"
            value={localFilters.dateFrom}
            onChange={(e) => handleFilterChange('dateFrom', e.target.value)}
            className="bg-white text-slate-700 px-3 py-2.5 rounded-lg text-sm border border-indigo-200 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 flex-1 transition-all"
          />
          <span className="text-indigo-400 font-bold">to</span>
          <input
            type="date"
            value={localFilters.dateTo}
            onChange={(e) => handleFilterChange('dateTo', e.target.value)}
            className="bg-white text-slate-700 px-3 py-2.5 rounded-lg text-sm border border-indigo-200 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 flex-1 transition-all"
          />
        </div>
      </div>
    </div>
  );
};

export default TopFilterBar;