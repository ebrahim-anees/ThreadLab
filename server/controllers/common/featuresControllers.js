import Feature from '../../models/Feature.js';

const addNewFeature = async (req, res) => {
  try {
    const { image } = req.body;
    const newFeature = new Feature({
      image,
    });
    await newFeature.save();
    res.status(201).json({
      success: true,
      data: newFeature,
    });
  } catch (error) {
    console.error(error);
    -res.status(500).json({
      success: false,
      msg: 'orderAdminController: Internal Server Error',
    });
  }
};

const getAllFeatures = async (req, res) => {
  try {
    const features = await Feature.find({});
    return res.status(200).json({
      success: true,
      data: features,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      msg: 'orderAdminController: Internal Server Error',
    });
  }
};

const deleteFeature = async (req, res) => {
  const { imgId } = req.params;

  if (!imgId) {
    res.status(400).json({
      success: false,
      msg: 'Image id is required',
    });
  }
  try {
    const featureToDelete = await Feature.findByIdAndDelete(imgId);
    if (!featureToDelete) {
      res.status(404).json({
        success: false,
        msg: "Can't find the feature image to delete",
      });
    }

    res.status(200).json({
      success: true,
      msg: 'feature image is deleted',
    });
  } catch (error) {
    console.error(`featureController: ${error}`);
    res.status(500).json({
      success: false,
      msg: 'featureController: Internal Server Error',
    });
  }
};

export { addNewFeature, getAllFeatures, deleteFeature };
