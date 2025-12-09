const API_BASE_URL = import.meta.env.VITE_API_URL ;

console.log('API Base URL:', API_BASE_URL); 

export const fetchTransactionsAPI = async (params = {}) => {
  const queryString = new URLSearchParams();
  
  const paramMapping = {
    searchTerm: 'search',
    page: 'page',
    sortBy: 'sortBy',
    sortOrder: 'sortDir',
    limit: 'pageSize',
    region: 'regions',
    gender: 'genders',
    ageMin: 'ageMin',
    ageMax: 'ageMax',
    category: 'categories',
    tags: 'tags',
    paymentMethod: 'paymentMethods',
    dateFrom: 'dateFrom',
    dateTo: 'dateTo'
  };

  Object.entries(params).forEach(([key, value]) => {
    const backendKey = paramMapping[key] || key;
    
    if (value !== undefined && value !== null && value !== '') {
      if (Array.isArray(value) && value.length > 0) {
        queryString.set(backendKey, value.join(','));
      } else if (!Array.isArray(value)) {
        queryString.set(backendKey, value);
      }
    }
  });

  try {
    const url = `${API_BASE_URL}/transactions?${queryString.toString()}`;
    console.log('Fetching transactions from:', url);
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    console.log('Transactions response:', result);
    
    if (!result.success) {
      throw new Error(result.error || 'Failed to fetch transactions');
    }
    
    return {
      data: result.data || [],
      meta: result.meta || null
    };
  } catch (error) {
    console.error('API Error fetching transactions:', error);
    throw error;
  }
};

export const fetchFilterOptionsAPI = async () => {
  try {
    const url = `${API_BASE_URL}/filter-options`;
    console.log('Fetching filter options from:', url);
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    console.log('Filter options response:', result);
    
    if (!result.success) {
      throw new Error(result.error || 'Failed to fetch filter options');
    }
    
    return result.data || {
      regions: [],
      genders: [],
      categories: [],
      tags: [],
      paymentMethods: []
    };
  } catch (error) {
    console.error('API Error fetching filter options:', error);
    return {
      regions: [],
      genders: [],
      categories: [],
      tags: [],
      paymentMethods: []
    };
  }
};