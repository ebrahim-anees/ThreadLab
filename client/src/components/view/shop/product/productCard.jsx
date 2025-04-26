import ProductPrice from '@/components/common/productPrice';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

export default function ShopProductCard({ product, getProductDetails }) {
  return (
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
            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
              Sale
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
            <Button className="w-full cursor-pointer">Add to Cart</Button>
          </CardFooter>
        </div>
      </div>
    </Card>
  );
}
