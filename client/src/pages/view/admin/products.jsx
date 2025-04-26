import CommonForm from '@/components/common/form';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import ProductImgUpload from '@/components/view/admin/img/imgUpload';
import AdminProductCard from '@/components/view/admin/productCard';
import { productFormElements } from '@/config';
import { setInitialFormData } from '@/lib/utils';
import {
  addNewProduct,
  deleteProduct,
  editProduct,
  fetchAllProducts,
} from '@/store/admin/productsSlice';
import { toastStyles } from '@/utils/toastStyles';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';

export default function AdminProducts() {
  const [isProductDialogOpen, setIsProductDialogOpen] = useState(false);
  const [imgFile, setImgFile] = useState(null);
  const [uploadedImgUrl, setUploadedImgUrl] = useState('');
  const [isImgLoading, setIsImgLoading] = useState(false);
  const initialProductData = setInitialFormData(productFormElements);
  const [formData, setFormData] = useState(initialProductData);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const { productsList } = useSelector((state) => state.adminProducts);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isProductDialogOpen) {
      setCurrentEditedId(null);
      setFormData(initialProductData);
    }
  }, [isProductDialogOpen]);

  function handleProduct() {
    if (currentEditedId === null) {
      const newProduct = { ...formData, image: uploadedImgUrl };
      dispatch(addNewProduct(newProduct)).then((action) => {
        const res = action.payload;
        if (res?.success) {
          toast('Product is added', {
            duration: 2000,
            style: toastStyles.SUCCESS,
          });
          dispatch(fetchAllProducts());
          setIsProductDialogOpen(false);
          setImgFile(null);
          setUploadedImgUrl('');
          setFormData(initialProductData);
        } else {
          toast.error(res || 'Add Product failed', {
            duration: 3000,
            style: toastStyles.ERROR,
          });
        }
      });
    } else {
      dispatch(
        editProduct({
          id: currentEditedId,
          formData: formData,
        })
      ).then((action) => {
        const res = action.payload;

        if (res?.success) {
          toast(
            <div>
              <span className="font-bold">{formData.title}</span> is edited
              Successfully
            </div>,
            {
              duration: 3000,
              style: toastStyles.SUCCESS,
            }
          );
          dispatch(fetchAllProducts());
          setIsProductDialogOpen(false);
          setFormData(initialProductData);
        } else {
          toast.error(
            res?.msg || (
              <div>
                Edit <span className="font-bold">{formData.title}</span> is
                failed
              </div>
            ),
            {
              duration: 3000,
              style: toastStyles.ERROR,
            }
          );
        }
      });
    }
  }
  function handleDelete(productId) {
    dispatch(deleteProduct(productId)).then((action) => {
      const res = action.payload;
      if (res?.success) {
        dispatch(fetchAllProducts());
        toast('Product is deleted', {
          duration: 2000,
          style: toastStyles.SUCCESS,
        });
      } else {
        toast.error(res || 'Delete Product failed', {
          duration: 3000,
          style: toastStyles.ERROR,
        });
      }
    });
  }
  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);
  return (
    <>
      <div className="mb-5 flex justify-end w-full">
        <Button
          onClick={() => setIsProductDialogOpen(true)}
          className="cursor-pointer"
        >
          Add New Product
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {productsList.length > 0 &&
          productsList.map((product) => (
            <AdminProductCard
              key={product.title}
              product={product}
              setCurrentEditedId={setCurrentEditedId}
              setIsProductDialogOpen={setIsProductDialogOpen}
              setFormData={setFormData}
              deleteProduct={handleDelete}
            />
          ))}
      </div>
      <Sheet
        open={isProductDialogOpen}
        onOpenChange={() => {
          setIsProductDialogOpen(false);
        }}
      >
        <SheetContent
          side="right"
          className="overflow-hidden overflow-y-auto max-h-screen"
        >
          <SheetHeader>
            <SheetTitle className="text-2xl font-bold">
              {currentEditedId === null
                ? 'Add New Product'
                : 'Edit The Product'}
            </SheetTitle>
          </SheetHeader>
          {!currentEditedId && (
            <ProductImgUpload
              imgFile={imgFile}
              setImgFile={setImgFile}
              uploadedImgUrl={uploadedImgUrl}
              setUploadedImgUrl={setUploadedImgUrl}
              isImgLoading={isImgLoading}
              setIsImgLoading={setIsImgLoading}
            />
          )}
          <div className="px-6 pb-6">
            <CommonForm
              formControls={productFormElements}
              formData={formData}
              setFormData={setFormData}
              handleSubmit={handleProduct}
              buttonText={currentEditedId === null ? 'Add' : 'Edit'}
              isImgLoading={isImgLoading}
            />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
