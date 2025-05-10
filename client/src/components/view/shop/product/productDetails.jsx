import ProductPrice from '@/components/view/shop/product/productPrice';
import ProductRating from '@/components/view/shop/product/productRating';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { setProductsDetails } from '@/store/shop/productsSlice';
import { Quote } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';
import { toastStyles } from '@/utils/toastStyles';
import { Badge } from '@/components/ui/badge';

export default function ProductDetails({
  isOpen,
  setIsOpen,
  product,
  handleAddToCart,
  productsIdInCart,
}) {
  const {
    image: productImage,
    title: productTitle,
    description: productDescription,
    price: productPrice,
    salePrice: productSalePrice,
  } = product;
  const isInCart = productsIdInCart.includes(product._id);
  const dispatch = useDispatch();
  const handleProductDetails = () => {
    setIsOpen(false);
    dispatch(setProductsDetails());
  };
  return (
    <Dialog open={isOpen} onOpenChange={handleProductDetails}>
      <DialogContent className="grid grid-cols-2 gap-8 sm:p-12 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw]">
        <div className="relative overflow-hidden rounded-lg">
          <img
            src={productImage}
            alt={productTitle}
            width={600}
            height={600}
            className="aspect-square w-full object-fill"
          />
          {product?.totalStock <= 10 && (
            <Badge
              className={`absolute top-2 right-2 ${
                product?.totalStock === 0
                  ? 'bg-red-500'
                  : product?.totalStock <= 5
                  ? 'bg-orange-500'
                  : 'bg-yellow-500'
              }`}
            >
              {product?.totalStock} out of stock
            </Badge>
          )}
        </div>
        <div className="">
          <div className="mb-3">
            <DialogTitle className="text-3xl font-extrabold">
              {productTitle}
            </DialogTitle>
            <DialogDescription className="text-muted-foreground mt-1">
              {productDescription}
            </DialogDescription>
            <Separator />
          </div>
          <ProductPrice price={productPrice} salePrice={productSalePrice} />
          <div className="flex items-center gap-2 mt-[-8px]">
            <ProductRating />
            <span className="text-muted-foreground text-sm mb-0.5">(4.7)</span>
          </div>
          <div className="my-3">
            {product?.totalStock !== 0 ? (
              <Button
                className={`w-full ${
                  isInCart ? 'opacity-50' : 'cursor-pointer'
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToCart(product?._id);
                }}
              >
                {isInCart ? 'Product in Cart' : 'Add to Cart'}
              </Button>
            ) : (
              <Button
                className={`w-full bg-red-400 hover:bg-red-500`}
                onClick={(e) => {
                  e.stopPropagation();
                  toast.error('Out of stock', {
                    style: toastStyles.ERROR,
                    duration: 3000,
                  });
                }}
              >
                Out of stock
              </Button>
            )}
          </div>
          <Separator />
          <div className="max-h-[200px] overflow-auto border-b-2">
            <h3 className="text-xl font-bold mb-2">Reviews</h3>
            <div className="grid gap-2">
              {Array.from({ length: 5 }, (_, i) => (
                <div
                  key={i}
                  className="flex items-center border rounded-lg px-2 py-1 mb-2"
                >
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-black text-white font-semibold">
                      EA
                    </AvatarFallback>
                  </Avatar>
                  <Separator
                    orientation="vertical"
                    className="h-full ml-1 mr-3"
                  />
                  <div className="grid gap-1 w-full">
                    <div>
                      <h4 className="font-semibold">Ebrahim Anees</h4>
                      <ProductRating />
                    </div>
                    <div className="bg-muted border-muted-foreground p-1 rounded mt-2 flex justify-between">
                      <Quote className="rotate-180 w-2 h-2" />
                      <p className="text-muted-foreground text-sm">
                        underrated shoes
                      </p>
                      <Quote className="w-2 h-2" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            <Input placeholder="write a review" />
            <Button className="cursor-pointer">Submit</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
