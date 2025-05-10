import Address from '../../models/Address.js';

const addAddress = async (req, res) => {
  const { userId, address, city, pincode, phone, notes } = req.body;
  if (!userId || !address || !city || !pincode || !phone || !notes) {
    return res.status(400).json({
      success: false,
      msg: 'Invalid data provided',
    });
  }
  try {
    const newAddressAdded = new Address({
      userId,
      address,
      city,
      pincode,
      phone,
      notes,
    });
    await newAddressAdded.save();
    res.status(201).json({
      success: true,
      data: newAddressAdded,
    });
  } catch (error) {
    console.error(`addressController: ${error}`);
    res.status(500).json({
      success: false,
      msg: 'addressControllers: Internal Server Error',
    });
  }
};
const fetchAllAddress = async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    res.status(400).json({
      success: false,
      msg: 'User id is required',
    });
  }
  try {
    const addressList = await Address.find({ userId });
    if (!addressList) {
      res.status(404).json({
        success: false,
        msg: 'Address not found',
      });
    }
    res.status(200).json({
      success: true,
      data: addressList,
    });
  } catch (error) {
    console.error(`addressController: ${error}`);
    res.status(500).json({
      success: false,
      msg: 'addressControllers: Internal Server Error',
    });
  }
};
const editAddress = async (req, res) => {
  const { userId, addressId } = req.params;
  const updatedData = req.body;
  if (!userId || !addressId) {
    res.status(400).json({
      success: false,
      msg: 'User id & address id are required',
    });
  }
  try {
    const addressToEdit = await Address.findOneAndUpdate(
      {
        _id: addressId,
        userId,
      },
      updatedData,
      { new: true }
    );
    if (!addressToEdit) {
      res.status(404).json({
        success: false,
        msg: 'Address not found',
      });
    }
    res.status(200).json({
      success: true,
      data: addressToEdit,
    });
  } catch (error) {
    console.error(`addressController: ${error}`);
    res.status(500).json({
      success: false,
      msg: 'addressControllers: Internal Server Error',
    });
  }
};
const deleteAddress = async (req, res) => {
  const { userId, addressId } = req.params;

  if (!userId || !addressId) {
    res.status(400).json({
      success: false,
      msg: 'User id & address id are required',
    });
  }
  try {
    const addressToDelete = await Address.findOneAndDelete(
      {
        _id: addressId,
        userId,
      },
      { new: true }
    );

    if (!addressToDelete) {
      res.status(404).json({
        success: false,
        msg: 'Address not found',
      });
    }
    res.status(200).json({
      success: true,
      msg: 'Address deleted successfully',
    });
  } catch (error) {
    console.error(`addressController: ${error}`);
    res.status(500).json({
      success: false,
      msg: 'addressControllers: Internal Server Error',
    });
  }
};

export { addAddress, fetchAllAddress, editAddress, deleteAddress };
