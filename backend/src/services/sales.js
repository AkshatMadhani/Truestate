import Sale from "../models/sales.js";

class SalesService {
  
  parseArrayParam(param) {
    if (!param) return [];
    if (Array.isArray(param)) return param;
    return param.split(',').map(s => s.trim()).filter(Boolean);
  }

  buildQuery(filters) {
    const query = {};

    if (filters.search && filters.search.trim()) {
      const searchTerm = filters.search.trim();
      const searchRegex = new RegExp(searchTerm, 'i');
      
      const isNumeric = /^\d+$/.test(searchTerm);
      
      if (isNumeric) {
        query.$or = [
          { 'Customer Name': searchRegex },
          { 'Phone Number': { $regex: searchTerm } } 
        ];
      } else {
        query['Customer Name'] = searchRegex;
      }
    }

    if (filters.regions && filters.regions.length > 0) {
      query['Customer Region'] = { $in: filters.regions };
    }

    if (filters.genders && filters.genders.length > 0) {
      query['Gender'] = { $in: filters.genders };
    }

    if (filters.ageMin !== null || filters.ageMax !== null) {
      query['Age'] = {};
      if (filters.ageMin !== null) query['Age'].$gte = filters.ageMin;
      if (filters.ageMax !== null) query['Age'].$lte = filters.ageMax;
    }

    if (filters.categories && filters.categories.length > 0) {
      query['Product Category'] = { $in: filters.categories };
    }

    if (filters.tags && filters.tags.length > 0) {
      const tagRegex = filters.tags.map(tag => new RegExp(tag, 'i'));
      query['Tags'] = { $in: tagRegex };
    }

    if (filters.paymentMethods && filters.paymentMethods.length > 0) {
      query['Payment Method'] = { $in: filters.paymentMethods };
    }

    if (filters.dateFrom || filters.dateTo) {
      query['Date'] = {};
      if (filters.dateFrom) {
        query['Date'].$gte = new Date(filters.dateFrom);
      }
      if (filters.dateTo) {
        const endDate = new Date(filters.dateTo);
        endDate.setHours(23, 59, 59, 999);
        query['Date'].$lte = endDate;
      }
    }

    return query;
  }

  buildSort(sortBy = 'date', sortDir = 'desc') {
    const direction = sortDir.toLowerCase() === 'asc' ? 1 : -1;
    
    const sortMap = {
      date: { 'Date': direction },
      quantity: { 'Quantity': direction },
      customerName: { 'Customer Name': direction },
    };

    return sortMap[sortBy] || { 'Date': -1 };
  }

  async getTransactions(filters, sortBy, sortDir, page, pageSize) {
    try {
      const query = this.buildQuery(filters);
      const sort = this.buildSort(sortBy, sortDir);

      const skip = (page - 1) * pageSize;

      console.log('Query:', JSON.stringify(query, null, 2));
      console.log('Sort:', sort);

      const [data, total] = await Promise.all([
        Sale.find(query)
          .sort(sort)
          .skip(skip)
          .limit(pageSize)
          .lean(),
        Sale.countDocuments(query),
      ]);

      console.log(`Found ${total} documents, returning ${data.length}`);

      const totalPages = Math.ceil(total / pageSize);

      return {
        data,
        meta: {
          total,
          page,
          pageSize,
          totalPages,
          hasNextPage: page < totalPages,
          hasPreviousPage: page > 1,
        },
      };
    } catch (error) {
      console.error('Service Error:', error);
      throw new Error(`Error fetching transactions: ${error.message}`);
    }
  }

  async getFilterOptions() {
    try {
      const [regions, genders, categories, paymentMethods, allTags] = await Promise.all([
        Sale.distinct('Customer Region'),
        Sale.distinct('Gender'),
        Sale.distinct('Product Category'),
        Sale.distinct('Payment Method'),
        Sale.distinct('Tags'),
      ]);

      const tagsSet = new Set();
      allTags.forEach(tagString => {
        if (tagString) {
          const tags = tagString.split(',').map(t => t.trim());
          tags.forEach(tag => tagsSet.add(tag));
        }
      });
      const tags = Array.from(tagsSet).filter(Boolean).sort();

      console.log('Filter options loaded:', {
        regions: regions.length,
        genders: genders.length,
        categories: categories.length,
        paymentMethods: paymentMethods.length,
        tags: tags.length
      });

      return {
        regions: regions.filter(Boolean).sort(),
        genders: genders.filter(Boolean).sort(),
        categories: categories.filter(Boolean).sort(),
        paymentMethods: paymentMethods.filter(Boolean).sort(),
        tags: tags,
      };
    } catch (error) {
      console.error('Service Error:', error);
      throw new Error(`Error fetching filter options: ${error.message}`);
    }
  }
}

export default new SalesService();