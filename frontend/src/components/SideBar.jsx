const Sidebar = () => {
  const menuItems = [
    { icon: '📊', label: 'Dashboard', active: true, badge: null },
    { icon: '👥', label: 'Leads', active: false, badge: '600' },
    { icon: '📋', label: 'Nexus', active: false, badge: null },
    { icon: '🏢', label: 'Properties', active: false, badge: '4000' },
    { icon: '📥', label: 'Intake', active: false, badge: null },
    { icon: '📝', label: 'Requirements', active: false, badge: '500' },
    { icon: '📈', label: 'QC Dashboard', active: false, badge: '100' },
    { icon: '⚙️', label: 'Services', active: false, badge: null },
  ];

  return (
    <div className="w-64 bg-white h-screen fixed left-0 top-0 border-r border-slate-200 flex flex-col shadow-sm">
      <div className="p-6 flex items-center gap-3 border-b border-slate-200">
        <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-md">
          V
        </div>
        <span className="text-slate-800 text-xl font-bold">Vault</span>
      </div>

      {/* User Profile */}
      <div className="p-4 border-b border-slate-200 bg-slate-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center text-white font-semibold shadow-sm">
            VR
          </div>
          <span className="text-slate-700 text-sm font-medium">Akshat Madhani</span>
        </div>
      </div>

      <div className="p-6 bg-gradient-to-br from-purple-50 to-indigo-50 border-b border-slate-200">
        <h2 className="text-slate-800 text-lg font-bold leading-tight">Sales Management System</h2>
      </div>

      <nav className="flex-1 overflow-y-auto p-4 space-y-1">
        {menuItems.map((item, index) => (
          <div
            key={index}
            className={`flex items-center justify-between px-4 py-3 rounded-lg cursor-pointer transition-all ${
              item.active 
                ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-md' 
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-lg">{item.icon}</span>
              <span className="text-sm font-medium">{item.label}</span>
            </div>
            {item.badge && (
              <span className={`text-xs px-2 py-0.5 rounded-full ${
                item.active 
                  ? 'bg-white/20 text-white' 
                  : 'bg-slate-200 text-slate-600'
              }`}>
                {item.badge}
              </span>
            )}
          </div>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-200 bg-slate-50">
        <button className="w-full px-4 py-2 text-sm text-slate-600 hover:text-slate-800 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-2 justify-center">
          <span>⚙️</span>
          <span>Settings</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;