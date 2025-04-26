import ProductPrice from '@/components/common/productPrice';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';

export default function ProductDetails({ isOpen, setIsOpen, product }) {
  const {
    image: productImage,
    title: productTitle,
    description: productDescription,
    price: productPrice,
    salePrice: productSalePrice,
  } = product;
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="grid grid-cols-2 gap-8 sm:p-12 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw]">
        <div className="relative overflow-hidden rounded-lg">
          <img
            src={productImage}
            alt={productTitle}
            width={600}
            height={600}
            className="aspect-square w-full object-fill"
          />
        </div>
        <div className="">
          <div>
            <DialogTitle className="text-3xl font-extrabold">
              {productTitle}
            </DialogTitle>
            <DialogDescription className="text-muted-foreground mt-1 mb-3">
              {productDescription}
            </DialogDescription>
          </div>
          <ProductPrice price={productPrice} salePrice={productSalePrice} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
