import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { deleteAddress, fetchAllAddress } from '@/store/shop/addressSlice';
import { toastStyles } from '@/utils/toastStyles';
import { X } from 'lucide-react';
import { Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { toast } from 'sonner';
import clsx from 'clsx';

export default function AddressCard({
  addressInfo,
  handleEditAddress,
  setCurrentAddressId,
  curSelectedAddress,
  setCurSelectedAddress,
  setFormData,
  initialAddressData,
}) {
  const [isVisible, setIsVisible] = useState(true);
  const dispatch = useDispatch();
  const isCheckOut = useLocation().pathname.includes('checkout');
  const { user } = useSelector((state) => state.auth);
  const addressKeys = Object.keys(addressInfo).filter(
    (key) => !['_id', 'userId', 'createdAt', 'updatedAt', '__v'].includes(key)
  );
  const cardClass = clsx(
    'p-4 bg-muted w-full transition-all duration-500 opacity-0 translate-y-2 relative',
    isVisible ? 'opacity-100' : 'opacity-0',
    {
      '!cursor-pointer hover:border-blue-300': isCheckOut,
      'border-blue-500': curSelectedAddress?._id === addressInfo?._id,
    }
  );
  const handleDeleteAddress = () => {
    setIsVisible(false); // fade out first
    setCurrentAddressId(null);
    setFormData(initialAddressData);
    setTimeout(() => {
      dispatch(
        deleteAddress({ userId: user?.id, addressId: addressInfo?._id })
      ).then((action) => {
        const res = action.payload;
        if (res.success) {
          toast('Address is deleted successfully', {
            duration: 4000,
            style: toastStyles.SUCCESS,
          });
          dispatch(fetchAllAddress(user?.id));
        } else {
          toast.error(res.msg || 'Deleting address failed', {
            duration: 4000,
            style: toastStyles.ERROR,
          });
          setIsVisible(true);
        }
      });
    }, 300);
  };
  return (
    <Card
      className={cardClass}
      onClick={isCheckOut ? () => setCurSelectedAddress(addressInfo) : null}
    >
      <div className="flex flex-col gap-1.5">
        {addressKeys.map((key, i) => (
          <Fragment key={i}>
            <div className="flex flex-row gap-2 items-center">
              <span className="font-bold shrink-0 min-w-[75px]">{key}:</span>
              <div>
                <span className="leading-tight text-muted-foreground">
                  {addressInfo?.[key]}
                </span>
              </div>
            </div>
            {i !== addressKeys.length - 1 && <Separator className="" />}
          </Fragment>
        ))}
      </div>
      <Button
        className="w-3/4 mx-auto cursor-pointer"
        onClick={() => handleEditAddress(addressInfo?._id)}
      >
        Edit
      </Button>
      <button
        className="bg-black rounded-full w-7 h-7 flex justify-center items-center cursor-pointer absolute right-0 top-0 translate-x-1/4 -translate-y-1/4"
        onClick={handleDeleteAddress}
      >
        <X className="text-red-500" />
      </button>
    </Card>
  );
}
