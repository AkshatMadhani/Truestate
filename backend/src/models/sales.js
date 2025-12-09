import mongoose from 'mongoose';

const saleSchema = new mongoose.Schema(
  {
    'Transaction ID': { type: Number, alias: 'transactionId' },
    'Date': { type: Date, alias: 'date' },
    'Customer ID': { type: String, alias: 'customerId' },
    'Customer Name': { type: String, alias: 'customerName' },
    'Phone Number': { type: Number, alias: 'phoneNumber' },
    'Gender': { type: String, alias: 'gender' },
    'Age': { type: Number, alias: 'age' },
    'Customer Region': { type: String, alias: 'customerRegion' },
    'Customer Type': { type: String, alias: 'customerType' },
    'Product ID': { type: String, alias: 'productId' },
    'Product Name': { type: String, alias: 'productName' },
    'Brand': { type: String, alias: 'brand' },
    'Product Category': { type: String, alias: 'productCategory' },
    'Tags': { type: String, alias: 'tags' },
    'Quantity': { type: Number, alias: 'quantity' },
    'Price per Unit': { type: Number, alias: 'pricePerUnit' },
    'Discount Percentage': { type: Number, alias: 'discountPercentage' },
    'Total Amount': { type: Number, alias: 'totalAmount' },
    'Final Amount': { type: Number, alias: 'finalAmount' },
    'Payment Method': { type: String, alias: 'paymentMethod' },
    'Order Status': { type: String, alias: 'orderStatus' },
    'Delivery Type': { type: String, alias: 'deliveryType' },
    'Store ID': { type: String, alias: 'storeId' },
    'Store Location': { type: String, alias: 'storeLocation' },
    'Salesperson ID': { type: String, alias: 'salespersonId' },
    'Employee Name': { type: String, alias: 'employeeName' }
  },
  {
    strict: false,
    collection: 'truestatesales',
    toJSON: { virtuals: true, aliases: true },
    toObject: { virtuals: true, aliases: true }
  }
);

saleSchema.index({ 'Customer Name': 1 });
saleSchema.index({ 'Phone Number': 1 });
saleSchema.index({ 'Date': -1 });
saleSchema.index({ 'Quantity': -1 });
saleSchema.index({ 'Customer Region': 1 });
saleSchema.index({ 'Gender': 1 });
saleSchema.index({ 'Product Category': 1 });
saleSchema.index({ 'Payment Method': 1 });
saleSchema.index({ 'Tags': 1 });
saleSchema.index({ 'Age': 1 });

const Sale = mongoose.model('Sale', saleSchema);

export default Sale;
