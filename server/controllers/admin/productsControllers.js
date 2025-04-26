import { imgUploadConfigs } from '../../configs/claudinary.js';
import Product from '../../models/Product.js';

const handleImgUpload = async (req, res) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString('base64');
    /// req.file.buffer is the raw binary data of the image.
    /// This line converts that binary data into a Base64 string (a text version of binary data).

    const url = `data:${req.file.mimetype};base64,${b64}`;
    /// This creates a full data URL, like: data:image/png;base64,iVBORw0KGgoAAAANSUhEUg...
    /// It tells the upload function what type of file it is and includes the base64 string.

    const result = await imgUploadConfigs(url);
    res.json({
      success: true,
      result,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      msg: 'Internal Server Error',
    });
  }
};

const addNewProduct = async (req, res) => {
  try {
    const productData = req.body;
    const newProduct = new Product({ ...productData });
    await newProduct.save();
    res.status(201).json({
      success: true,
      data: newProduct,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      msg: 'Internal Server Error',
    });
  }
};

const fetchAllProducts = async (req, res) => {
  try {
    const productsList = await Product.find();
    res.status(200).json({
      success: true,
      data: productsList,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      msg: 'Internal Server Error',
    });
  }
};

const editProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        msg: 'Product not Found',
      });
    }
    let isChanged = false;
    const disallowedFields = ['_id', 'createdAt', 'updatedAt'];
    for (const key in updates) {
      if (
        !disallowedFields.includes(key) &&
        updates[key] !== undefined &&
        updates[key] !== product[key]
      ) {
        product[key] = updates[key];
        isChanged = true;
      }
    }
    if (!isChanged) {
      return res.status(200).json({
        success: false,
        msg: 'No changes detected',
      });
    }
    await product.save();
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

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const productDeleted = await Product.findByIdAndDelete(id);
    if (!productDeleted) {
      res.status(404).json({
        success: false,
        msg: 'Product not Found',
      });
    }
    res.status(200).json({
      success: true,
      data: 'Product deleted Successfully',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      msg: 'Internal Server Error',
    });
  }
};

export {
  handleImgUpload,
  addNewProduct,
  fetchAllProducts,
  editProduct,
  deleteProduct,
};
