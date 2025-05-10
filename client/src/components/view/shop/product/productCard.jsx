import ProductPrice from '@/components/view/shop/product/productPrice';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { toastStyles } from '@/utils/toastStyles';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductDetails } from '@/store/shop/productsSlice';
import { handleAdding } from '@/utils/funcs/handleAddToCart';
import { getProductsIdInCart } from '@/utils/funcs/getProductsIdInCart';
import ProductDetails from './productDetails';
import { useState } from 'react';

export default function ShopProductCard({
  product,
}) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { productDetails } = useSelector((state) => state.shopProducts);

  const [isProductDetailsOpen, setIsProductDetailsOpen] = useState(false);
  const productsIdInCart = useSelector(getProductsIdInCart);
  const getProductDetails = (productId) => {
    dispatch(fetchProductDetails(productId));
    setIsProductDetailsOpen(true);
  };
  const handleAddToCart = (productId) => {
    handleAdding(dispatch, productId, productsIdInCart, user);
  };
  const isInCart = productsIdInCart.includes(product._id);
  return (
    <>
      <Card className="w-full max-w-sm mx-auto">
        <div
          onClick={() => getProductDetails(product?._id)}
          className="cursor-pointer"
        >
          <div className="relative">
            <img
              src={product?.image}
              alt={product?.title}
              className="w-full h-[300px] object-fill rounded-t-lg"
            />
            {product?.salePrice > 0 && (
              <Badge className="absolute top-2 left-2 bg-red-500">Sale</Badge>
            )}
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
          <div className="flex flex-col justify-between">
            <CardContent className="py-4 px-6">
              <h3 className="text-xl font-bold mb-2 text-center">
                {product?.title}
              </h3>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-muted-foreground">
                  {product?.category[0].toUpperCase() +
                    product?.category.slice(1)}
                </span>
                <span className="text-sm text-muted-foreground">
                  {product?.brand.length > 3
                    ? product?.brand[0].toUpperCase() + product?.brand.slice(1)
                    : product?.brand.toUpperCase()}
                </span>
              </div>
              <ProductPrice
                price={product?.price}
                salePrice={product?.salePrice}
              />
            </CardContent>
            <CardFooter>
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
            </CardFooter>
          </div>
        </div>
      </Card>
      {productDetails && (
        <ProductDetails
          isOpen={isProductDetailsOpen}
          setIsOpen={setIsProductDetailsOpen}
          product={productDetails}
          handleAddToCart={handleAddToCart}
          productsIdInCart={productsIdInCart}
        />
      )}
    </>
  );
}
