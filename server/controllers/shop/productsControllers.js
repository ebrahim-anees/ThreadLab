import Product from '../../models/Product.js';

const fetchAllProductsWithFilteration = async (req, res) => {
  try {
    const filters = req.filters;
    const sort = req.sort;

    const filteredProducts = await Product.aggregate([
      {
        $match: filters, // Match filters (category, brand)
      },
      {
        $addFields: {
          computedPrice: {
            $ifNull: ['$salePrice', '$price'], // Use salePrice if available, otherwise use price
          },
        },
      },
      {
        $sort: sort, // Apply the computed sorting
      },
    ]);
    res.status(200).json({
      success: true,
      data: filteredProducts,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      msg: 'Internal Server Error',
    });
  }
};

const getProductDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        msg: `Product with id:${id} is not found`,
      });
    }
    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      msg: 'Internal Server Error',
    });
  }
};

export { fetchAllProductsWithFilteration, getProductDetails };
