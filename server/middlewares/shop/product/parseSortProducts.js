export const parseSortProducts = (req, res, next) => {
  try {
    const { sortBy = 'price-lowtohigh' } = req.query;

    req.sort = {};
    switch (sortBy) {
      case 'price-lowtohigh':
        req.sort = { computedPrice: 1 };
        break;
      case 'price-hightolow':
        req.sort = { computedPrice: -1 };
        break;
      case 'title-atoz':
        req.sort = { title: 1 };
        break;
      case 'title-ztoa':
        req.sort = { title: -1 };
        break;
      default:
        throw new Error('Invalid sort option');
    }

    next();
  } catch (error) {
    console.error('Error in parseSortProducts:', error.message);
    res.status(400).json({
      success: false,
      msg: 'Invalid sort option',
    });
  }
};
