import CommonForm from '@/components/common/form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { addressFormControls } from '@/config';
import { setInitialFormData } from '@/lib/utils';
import {
  addAddress,
  editAddress,
  fetchAllAddress,
} from '@/store/shop/addressSlice';
import { toastStyles } from '@/utils/toastStyles';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import AddressCard from './addressCard';
import { areObjectsEqual } from '@/lib/utils';
export default function Address({ curSelectedAddress, setCurSelectedAddress }) {
  const [currentAddressId, setCurrentAddressId] = useState(null);
  const initialAddressData = setInitialFormData(addressFormControls);
  const [formData, setFormData] = useState(initialAddressData);
  const { user } = useSelector((state) => state.auth);
  const { addressList } = useSelector((state) => state.shopAddress);
  const dispatch = useDispatch();
  const formRef = useRef(null);
  const addressRef = useRef(null);
  const [cpyDataBeforeUpdate, setCpyDataBeforeUpdate] = useState({});
  const handleAddress = () => {
    if (currentAddressId === null) {
      if (addressList.length >= 3) {
        toast.error('Max 3 address allowed', {
          duration: 3000,
          style: toastStyles.ERROR,
        });
      } else {
        dispatch(
          addAddress({
            userId: user?.id,
            ...formData,
          })
        ).then((action) => {
          const res = action.payload;
          if (res.success) {
            toast('Address is added successfully', {
              duration: 4000,
              style: toastStyles.SUCCESS,
            });
            dispatch(fetchAllAddress(user?.id));
            addressRef.current?.scrollIntoView({ behavior: 'smooth' });
            setFormData(initialAddressData);
          } else {
            toast.error(res.msg || 'Adding address failed', {
              duration: 4000,
              style: toastStyles.ERROR,
            });
          }
        });
      }
    } else {
      if (areObjectsEqual(cpyDataBeforeUpdate, formData)) {
        toast.error('No data changed', {
          duration: 4000,
          style: toastStyles.ERROR,
        });
      } else {
        dispatch(
          editAddress({
            userId: user?.id,
            addressId: currentAddressId,
            updatedData: formData,
          })
        ).then((action) => {
          const res = action.payload;
          if (res?.success) {
            toast('Address is edited successfully', {
              duration: 3000,
              style: toastStyles.SUCCESS,
            });
            dispatch(fetchAllAddress(user?.id));
            addressRef.current?.scrollIntoView({ behavior: 'smooth' });
            setCurrentAddressId(null);
            setFormData(initialAddressData);
          } else {
            toast.error(res?.msg || 'Edit Address failed', {
              duration: 3000,
              style: toastStyles.ERROR,
            });
          }
        });
      }
    }
  };
  const handleEditBtnClick = (addressId) => {
    setCurrentAddressId(addressId);
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
    const addressToEdit = addressList.find(
      (address) => address?._id === addressId
    );
    const keys = Object.keys(initialAddressData);

    setFormData(() => {
      let cpyData = {};
      keys.forEach((key) => {
        cpyData[key] = addressToEdit[key];
      });
      setCpyDataBeforeUpdate(cpyData);
      return cpyData;
    });
  };
  const isFormValid = () => {
    return Object.values(formData).every((val) => val.trim() !== '');
  };
  useEffect(() => {
    dispatch(fetchAllAddress(user?.id));
  }, [dispatch]);
  return (
    <Card ref={addressRef}>
      {addressList?.length > 0 ? (
        <div className="mb-5 p-3 grid gap-3 grid-cols-[repeat(auto-fit,_minmax(225px,_1fr))]">
          {addressList.map((address) => (
            <AddressCard
              key={address._id}
              addressInfo={address}
              handleEditAddress={handleEditBtnClick}
              setCurrentAddressId={setCurrentAddressId}
              curSelectedAddress={curSelectedAddress}
              setCurSelectedAddress={setCurSelectedAddress}
              setFormData={setFormData}
              initialAddressData={initialAddressData}
            />
          ))}
        </div>
      ) : (
        <div className="mx-8 mt-5 bg-accent rounded-2xl">
          <p className="font-semibold p-4 text-center">
            No Addresses added yet
          </p>
        </div>
      )}
      <CardHeader>
        <CardTitle>{currentAddressId ? 'Edit' : 'Add New'} Address</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3" ref={formRef}>
        <CommonForm
          formControls={addressFormControls}
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleAddress}
          buttonText={currentAddressId ? 'Edit' : 'Add'}
          isBtnDisabled={!isFormValid()}
        />
      </CardContent>
    </Card>
  );
}
