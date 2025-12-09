import sales from "../services/sales.js";
const parseArrayParam = (param) => {
  if (!param) return [];
  if (Array.isArray(param)) return param;
  return param.split(',').map(s => s.trim()).filter(Boolean);
};

const parseNumber = (param, defaultValue = null) => {
  if (!param) return defaultValue;
  const num = Number(param);
  return isNaN(num) ? defaultValue : num;
};

export const getTransactions = async (req, res) => {
  try {
    const {
      search,
      regions,
      genders,
      ageMin,
      ageMax,
      categories,
      tags,
      paymentMethods,
      dateFrom,
      dateTo,
      sortBy = 'date',
      sortDir = 'desc',
      page = 1,
      pageSize = 10,
    } = req.query;

    const filters = {
      search: search || '',
      regions: parseArrayParam(regions),
      genders: parseArrayParam(genders),
      ageMin: parseNumber(ageMin),
      ageMax: parseNumber(ageMax),
      categories: parseArrayParam(categories),
      tags: parseArrayParam(tags),
      paymentMethods: parseArrayParam(paymentMethods),
      dateFrom: dateFrom || null,
      dateTo: dateTo || null,
    };

    const validatedPage = Math.max(1, parseInt(page) || 1);
    const validatedPageSize = Math.min(100, Math.max(1, parseInt(pageSize) || 10));

    if (filters.ageMin !== null && filters.ageMax !== null) {
      if (filters.ageMin > filters.ageMax) {
        [filters.ageMin, filters.ageMax] = [filters.ageMax, filters.ageMin];
      }
    }

    const result = await sales.getTransactions(
      filters,
      sortBy,
      sortDir,
      validatedPage,
      validatedPageSize
    );

    res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    console.error('Controller Error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error.message,
    });
  }
};

export const getFilterOptions = async (req, res) => {
  try {
    const options = await sales.getFilterOptions();

    res.status(200).json({
      success: true,
      data: options,
    });
  } catch (error) {
    console.error('Controller Error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error.message,
    });
  }
};
