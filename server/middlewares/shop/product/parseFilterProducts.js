export const parseFilterProducts = (req, res, next) => {
  try {
    const { category = '', brand = '' } = req.query;

    req.filters = {};
    if (category) {
      req.filters.category = { $in: category.split(',').filter(Boolean) };
    }
    if (brand) {
      req.filters.brand = { $in: brand.split(',').filter(Boolean) };
    }

    next();
  } catch (error) {
    console.error('Error in parseFilterProducts:', error.message);
    res.status(400).json({
      success: false,
      msg: 'Invalid filter parameters',
    });
  }
};
