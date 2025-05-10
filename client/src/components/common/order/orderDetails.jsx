import { DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import CommonForm from '../form';
import { adminOrderStatus } from '@/config';
import { setInitialFormData } from '@/lib/utils';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrders, updateOrderStatus } from '@/store/admin/orderSlice';
import { toast } from 'sonner';
import { toastStyles } from '@/utils/toastStyles';
import { Badge } from '@/components/ui/badge';

export default function OrderDetails({ order, setIsOrderDetailOpen }) {
  const dispatch = useDispatch();
  const initialFormData = setInitialFormData(adminOrderStatus);
  const [formData, setFormData] = useState(
    { status: order.orderStatus } || initialFormData
  );
  const user = useSelector((state) => state.auth).user;
  const isAdmin = user.role === 'admin';
  const handleUpdateStatus = () => {
    dispatch(
      updateOrderStatus({
        orderId: order?._id,
        orderStatus: formData?.status,
      })
    ).then((action) => {
      const res = action.payload;
      if (res.success) {
        toast(res.msg, {
          style: toastStyles.SUCCESS,
          duration: 3000,
        });
        dispatch(getAllOrders());
        setIsOrderDetailOpen(false);
      } else {
        toast.error(res.msg, {
          style: toastStyles.ERROR,
          duration: 3000,
        });
      }
    });
  };
  return (
    <>
      <DialogTitle className="sr-only">Order Details</DialogTitle>
      <DialogContent className="sm:max-w-[500px] max-h-[500px] overflow-y-scroll">
        <div className="grid gap-3">
          <div className="mt-2">
            {[
              { title: 'Order Id', value: order?._id },
              { title: 'Order date', value: order?.orderDate.split('T')[0] },
              { title: 'Order Price', value: '$' + order?.totalAmount },
              { title: 'Payment Method', value: order?.paymentMethod },
              { title: 'Payment Status', value: order?.paymentStatus },
              { title: 'Order Status', value: order?.orderStatus },
            ].map((item, i) => (
              <div
                className="flex items-center justify-between mt-2"
                key={item.title}
              >
                <p className="font-medium">{item.title}</p>
                {i !== 5 ? (
                  <Label>{item.value}</Label>
                ) : (
                  <Badge
                    className={`py-1 px-3 w-max ${
                      order?.orderStatus === 'confirmed' ||
                      order?.orderStatus === 'delivered'
                        ? 'bg-green-800'
                        : order?.orderStatus === 'rejected'
                        ? 'bg-red-600'
                        : 'bg-yellow-600'
                    }`}
                  >
                    <Label>{item.value}</Label>
                  </Badge>
                )}
              </div>
            ))}
          </div>
          <Separator />
          <div className="grid gap-4">
            <div className="grid gap-2">
              <h5 className="font-bold text-lg mt-[-5px]">Order Details</h5>
              <ul className="grid gap-3">
                {order?.cartItems.map((item) => (
                  <li
                    key={item?._id}
                    className="flex items-center justify-between"
                  >
                    <span className="min-w-[60px]">{item?.title}</span>
                    <span className="text-sm">
                      ${item?.price}({item?.quantity})
                    </span>

                    <span className="font-semibold min-w-[60px] text-end">
                      ${item?.quantity * item?.price}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <Separator />
          <div className="grid gap-4">
            <div className="grid gap-2">
              <h5 className="font-bold text-lg mt-[-5px]">Shipping Info</h5>
              <ul className="grid gap-0.5 text-muted-foreground">
                <li className="flex justify-between">
                  <span className="font-semibold">user name:</span>
                  <span>{user?.userName}</span>
                </li>
                {Object.keys(order?.addressInfo)
                  .filter((name) => name !== 'addressId')
                  .map((address) => (
                    <li key={address} className="flex justify-between">
                      <span className="font-semibold"> {address + ':'}</span>
                      <span>
                        {' '}
                        {order?.addressInfo[address].length > 25
                          ? order?.addressInfo[address].slice(0, 40) + '...'
                          : order?.addressInfo[address]}
                      </span>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
          {isAdmin && (
            <>
              <Separator />
              <div>
                <CommonForm
                  formControls={adminOrderStatus}
                  formData={formData}
                  setFormData={setFormData}
                  buttonText={'Update order Status'}
                  handleSubmit={handleUpdateStatus}
                />
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </>
  );
}
