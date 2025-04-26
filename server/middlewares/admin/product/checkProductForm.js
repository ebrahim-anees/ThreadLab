import Product from './../../../models/Product.js';

export const checkProductForm = async (req, res, next) => {
  const requiredFields = [
    'image',
    'title',
    'description',
    'category',
    'brand',
    'price',
    'totalStock',
  ];
  const missingFields = requiredFields.filter(
    (field) =>
      req.body[field] === undefined ||
      req.body[field] === '' ||
      req.body[field] === null
  );
  if (missingFields.length > 0) {
    return res.status(400).json({
      success: false,
      msg: `Missing required fields: ${missingFields.join(', ')}`,
    });
  }
  const productName = req.body.title;
  const existingProduct = await Product.findOne({ title: productName });
  if (existingProduct) {
    return res.status(400).json({
      success: false,
      msg: `Product ${productName} already exists`,
    });
  }

  next();
};
