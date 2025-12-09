import { useState, useEffect, useCallback } from 'react';
import { fetchTransactionsAPI } from '../Services/api';
export const useTransactionData = () => {
  const [salesData, setSalesData] = useState([]);
  const [metaData, setMetaData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [queryParams, setQueryParams] = useState({
    searchTerm: '',
    page: 1,
    sortBy: 'date',
    sortOrder: 'desc',
    limit: 10,
    region: '',
    gender: '',
    ageMin: '',
    ageMax: '',
    category: '',
    tags: '',
    paymentMethod: '',
    dateFrom: '',
    dateTo: ''
  });

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const result = await fetchTransactionsAPI(queryParams);
        setSalesData(result.data || []);
        setMetaData(result.meta || null);
      } catch (err) {
        setError(err.message);
        setSalesData([]);
        setMetaData(null);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [queryParams]);

  const updateFilters = useCallback((updates) => {
    setQueryParams(prev => ({
      ...prev,
      ...updates,
      page: updates.page !== undefined ? updates.page : 1
    }));
  }, []);

  return { salesData, metaData, loading, error, queryParams, updateFilters };
};