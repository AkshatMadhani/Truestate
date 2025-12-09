const formatCurrency = (amount) => {
  if (amount === null || amount === undefined) return '₹0';
  const num = Number(amount);
  if (isNaN(num)) return '₹0';
  return `₹${num.toLocaleString('en-IN', { maximumFractionDigits: 2 })}`;
};

const StatsCards = ({ salesData }) => {
  const totalUnits = salesData.reduce((sum, item) => sum + (item.Quantity || 0), 0);
  const totalAmount = salesData.reduce((sum, item) => sum + (item['Final Amount'] || 0), 0);
  const totalDiscount = salesData.reduce((sum, item) => sum + ((item['Total Amount'] || 0) - (item['Final Amount'] || 0)), 0);
  const totalTransactions = salesData.length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <div className="text-blue-600 text-sm font-semibold uppercase tracking-wide">Total Units Sold</div>
          <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center text-white text-xl">
            📦
          </div>
        </div>
        <div className="text-blue-900 text-4xl font-bold">{totalUnits.toLocaleString('en-IN')}</div>
        <div className="text-blue-600 text-sm mt-2">Units across all transactions</div>
      </div>

      <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-6 border border-emerald-200 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <div className="text-emerald-600 text-sm font-semibold uppercase tracking-wide">Total Revenue</div>
          <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center text-white text-xl">
            💰
          </div>
        </div>
        <div className="text-emerald-900 text-3xl font-bold">
          {formatCurrency(totalAmount)}
        </div>
        <div className="text-emerald-600 text-sm mt-2">{totalTransactions.toLocaleString('en-IN')} transactions</div>
      </div>

      <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-6 border border-amber-200 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <div className="text-amber-600 text-sm font-semibold uppercase tracking-wide">Total Discount</div>
          <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center text-white text-xl">
            🏷️
          </div>
        </div>
        <div className="text-amber-900 text-3xl font-bold">
          {formatCurrency(totalDiscount)}
        </div>
        <div className="text-amber-600 text-sm mt-2">Savings for customers</div>
      </div>
    </div>
  );
};

export default StatsCards;