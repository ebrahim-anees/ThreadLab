import Product from '../../models/Product.js';

const searchProducts = async (req, res) => {
  try {
    const { searchTerm } = req.params;
    if (!searchTerm) {
      return res.status(400).json({
        success: false,
        return: 'Keyword is required',
      });
    } else if (typeof searchTerm !== 'string') {
      return res.status(400).json({
        success: false,
        return: 'Keyword must be string',
      });
    }
    const regExp = new RegExp(searchTerm, 'i');
    const searchQuery = {
      $or: [
        { title: regExp },
        { description: regExp },
        { category: regExp },
        { brand: regExp },
      ],
    };
    const searchResults = await Product.find(searchQuery);
    res.status(200).json({
      success: true,
      data: searchResults,
    });
  } catch (error) {
    console.error('searchControllers: ' + error);
    res.status(500).json({
      success: false,
      msg: 'Internal Server Error',
    });
  }
};

export { searchProducts };
