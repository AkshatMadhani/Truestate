import { useState, useEffect } from 'react';
import { fetchFilterOptionsAPI } from '../Services/api';
export const useFilterData = () => {
  const [filterOptions, setFilterOptions] = useState({
    regions: [],
    genders: [],
    categories: [],
    tags: [],
    paymentMethods: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOptions = async () => {
      try {
        const data = await fetchFilterOptionsAPI();
        setFilterOptions(data);
      } catch (error) {
        console.error('Failed to load filter options:', error);
      } finally {
        setLoading(false);
      }
    };
    loadOptions();
  }, []);

  return { filterOptions, loading };
};