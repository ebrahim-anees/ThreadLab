import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

export default function AdminProductCard({
  product,
  setCurrentEditedId,
  setIsProductDialogOpen,
  setFormData,
  deleteProduct,
}) {
  const editProduct = () => {
    setIsProductDialogOpen(true);
    setCurrentEditedId(product._id);
    setFormData(product);
  };

  return (
    <Card>
      <div className="w-full max-w-sm mx-auto">
        <div className="relative">
          <img
            src={product?.image}
            alt={product?.title}
            className="w-full h-[300px] object-fill rounded-t-lg "
          />
        </div>
        <CardContent>
          <h4 className="text-xl font-bold my-2 truncate">{product?.title}</h4>
          <div className="flex justify-between item-center mb-2">
            <span
              className={`${
                product?.salePrice > 0 ? 'line-through' : ''
              } text-lg font-semibold text-primary`}
            >
              ${product?.price}
            </span>
            {product?.salePrice > 0 && (
              <span className="text-lg font-bold">${product?.salePrice}</span>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <Button className="cursor-pointer" onClick={editProduct}>
            Edit
          </Button>
          <Button
            className="cursor-pointer"
            onClick={() => deleteProduct(product._id)}
          >
            Delete
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
}
