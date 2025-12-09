import SearchBar from './components/Searchbar';
import Sidebar from './components/SideBar';
import TopFilterBar from './components/FilterPanel';
import StatsCards from './components/StatsCard';
import TransactionsTable from './components/TransactionTable';
import { useTransactionData } from './hooks/useTransaction';
import { useFilterData } from './hooks/useFilterData';

function App() {
  const { salesData, metaData, loading, error, queryParams, updateFilters } = useTransactionData();
  const { filterOptions, loading: filtersLoading } = useFilterData();

  const handleSearch = (searchTerm) => {
    updateFilters({ searchTerm });
  };

  const handleSortChange = ({ sortBy, sortOrder }) => {
    updateFilters({ sortBy, sortOrder });
  };

  const handleFilterChange = (filters) => {
    updateFilters(filters);
  };

  const handlePageChange = (newPage) => {
    updateFilters({ page: newPage });
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Sidebar />
      
      <div className="flex-1 ml-64 overflow-x-hidden">
        <div className="max-w-[1800px] mx-auto p-6">
          <div className="mb-6">
            <h1 className="text-slate-800 text-3xl font-bold">Transaction Dashboard</h1>
            <p className="text-slate-600 mt-1">Manage and analyze your sales transactions</p>
          </div>

          <div className="mb-4">
            <SearchBar
              onSearch={handleSearch}
              onSortChange={handleSortChange}
              currentSort={{
                sortBy: queryParams.sortBy,
                sortOrder: queryParams.sortOrder
              }}
            />
          </div>

          <div className="mb-6">
            <TopFilterBar
              onFilterChange={handleFilterChange}
              activeFilters={queryParams}
              filterOptions={filterOptions}
            />
          </div>

          {!loading && salesData.length > 0 && (
            <div className="mb-6">
              <StatsCards salesData={salesData} />
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
              <p className="text-red-600">Error: {error}</p>
            </div>
          )}

          <TransactionsTable
            data={salesData}
            loading={loading}
            onPageChange={handlePageChange}
            metaData={metaData}
          />
        </div>
      </div>
    </div>
  );
}

export default App;