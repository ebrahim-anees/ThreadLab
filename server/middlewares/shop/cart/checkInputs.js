export const checkInputs = (req, res, next) => {
  const { userId, productId, quantity } = req.body;
  if (!userId || !productId || typeof quantity !== 'number' || quantity <= 0) {
    return res.status(400).json({
      success: false,
      msg: 'Invalid data',
    });
  }
  next();
};
