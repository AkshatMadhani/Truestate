const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'Invalid Date';
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  } catch {
    return 'Invalid Date';
  }
};

const formatCurrency = (amount) => {
  if (amount === null || amount === undefined) return '₹0';
  const num = Number(amount);
  if (isNaN(num)) return '₹0';
  return `₹${num.toLocaleString('en-IN', { maximumFractionDigits: 2 })}`;
};

const formatPhoneNumber = (phone) => {
  if (!phone) return 'N/A';
  const cleaned = String(phone).replace(/\D/g, '');
  if (cleaned.length === 10) {
    return `+91 ${cleaned.slice(0, 5)} ${cleaned.slice(5)}`;
  }
  return phone;
};

const TransactionsTable = ({ data, loading, onPageChange, metaData }) => {
  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-500 border-t-transparent mx-auto mb-4"></div>
        <p className="text-slate-600 text-lg font-medium">Loading transactions...</p>
        <p className="text-slate-400 text-sm mt-1">Please wait a moment</p>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center">
        <div className="text-6xl mb-4">📭</div>
        <p className="text-slate-700 text-lg font-medium">No transactions found</p>
        <p className="text-slate-500 text-sm mt-2">Try adjusting your filters or search query</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-slate-50 to-slate-100 border-b-2 border-slate-200">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Date</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Customer ID</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Customer Name</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Phone</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Gender</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Age</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Region</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Category</th>
              <th className="px-6 py-4 text-right text-xs font-bold text-slate-700 uppercase tracking-wider">Qty</th>
              <th className="px-6 py-4 text-right text-xs font-bold text-slate-700 uppercase tracking-wider">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {data.map((transaction, index) => (
              <tr key={transaction._id || index} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 text-sm text-purple-600 font-medium whitespace-nowrap">
                  {formatDate(transaction.Date)}
                </td>
                <td className="px-6 py-4 text-sm text-slate-500 font-mono whitespace-nowrap">
                  {transaction['Customer ID'] || 'N/A'}
                </td>
                <td className="px-6 py-4 text-sm text-slate-800 font-medium">
                  {transaction['Customer Name'] || 'N/A'}
                </td>
                <td className="px-6 py-4 text-sm text-slate-600 whitespace-nowrap">
                  {formatPhoneNumber(transaction['Phone Number'])}
                </td>
                <td className="px-6 py-4 text-sm">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    transaction.Gender === 'Male' 
                      ? 'bg-blue-100 text-blue-700' 
                      : 'bg-pink-100 text-pink-700'
                  }`}>
                    {transaction.Gender || 'N/A'}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">
                  {transaction.Age || 'N/A'}
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">
                  {transaction['Customer Region'] || 'N/A'}
                </td>
                <td className="px-6 py-4 text-sm">
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-700">
                    {transaction['Product Category'] || 'N/A'}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-slate-700 text-right font-semibold">
                  {transaction.Quantity || 0}
                </td>
                <td className="px-6 py-4 text-sm text-emerald-700 text-right font-bold whitespace-nowrap">
                  {formatCurrency(transaction['Final Amount'])}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {metaData && metaData.totalPages > 1 && (
        <div className="bg-slate-50 px-6 py-4 flex items-center justify-between border-t border-slate-200">
          <div className="text-slate-600 text-sm">
            Showing <span className="font-semibold text-slate-800">{((metaData.page - 1) * metaData.pageSize) + 1}</span> to <span className="font-semibold text-slate-800">{Math.min(metaData.page * metaData.pageSize, metaData.total)}</span> of <span className="font-semibold text-slate-800">{metaData.total.toLocaleString('en-IN')}</span> transactions
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => onPageChange(metaData.page - 1)}
              disabled={!metaData.hasPreviousPage}
              className="px-5 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 hover:border-slate-400 transition-all shadow-sm"
            >
              ← Previous
            </button>
            <span className="text-slate-600 text-sm font-medium px-3">
              Page <span className="text-purple-600 font-bold">{metaData.page}</span> of {metaData.totalPages}
            </span>
            <button
              onClick={() => onPageChange(metaData.page + 1)}
              disabled={!metaData.hasNextPage}
              className="px-5 py-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:from-purple-700 hover:to-purple-800 transition-all shadow-sm"
            >
              Next →
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionsTable;