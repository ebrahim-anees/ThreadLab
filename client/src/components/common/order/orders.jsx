import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog } from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useEffect, useState } from 'react';
import OrderDetails from './orderDetails';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUserOrders } from '@/store/shop/orderSlice';
import { Badge } from '@/components/ui/badge';
import { getAllOrders } from '@/store/admin/orderSlice';

export default function Orders() {
  const [isOrderDetailOpen, setIsOrderDetailOpen] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth).user;
  const isAdmin = user.role === 'admin';
  let orderList;
  if (!isAdmin) {
    orderList = useSelector((state) => state.shopOrder).orderList;
  } else {
    orderList = useSelector((state) => state.adminOrder).orderList;
  }

  useEffect(() => {
    if (!isAdmin) {
      dispatch(getAllUserOrders(user?.id));
    } else {
      dispatch(getAllOrders());
    }
  }, [dispatch, user]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-bold text-2xl mt-3 mb-[-10px]">
          {isAdmin ? 'All Orders' : 'Order History'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              {[
                'Order Id',
                'Order date',
                'Order Status',
                'Order Price',
                'View Details',
              ].map((header) => (
                <TableHead key={header}>{header}</TableHead>
              ))}
              <TableHead>
                <span className="sr-only">Details</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          {orderList?.length > 0 &&
            orderList.map((order) => (
              <TableBody key={order?._id}>
                <TableRow>
                  <TableCell>{order?._id}</TableCell>
                  <TableCell>{order?.orderDate.split('T')[0]}</TableCell>
                  <TableCell>
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
                      {order?.orderStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>${order?.totalAmount}</TableCell>
                  <TableCell>
                    <Dialog
                      open={isOrderDetailOpen}
                      onOpenChange={setIsOrderDetailOpen}
                    >
                      <Button
                        className="cursor-pointer"
                        onClick={() => setIsOrderDetailOpen(true)}
                      >
                        View Details
                      </Button>
                      {isOrderDetailOpen && (
                        <OrderDetails
                          order={order}
                          setIsOrderDetailOpen={setIsOrderDetailOpen}
                        />
                      )}
                    </Dialog>
                  </TableCell>
                </TableRow>
              </TableBody>
            ))}
        </Table>
      </CardContent>
    </Card>
  );
}
