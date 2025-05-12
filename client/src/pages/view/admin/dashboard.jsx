import { Button } from '@/components/ui/button';
import ProductImgUpload from '@/components/view/admin/img/imgUpload';
import {
  addNewFeature,
  deleteFeature,
  getAllFeatures,
} from '@/store/common/featureSlice';
import { toastStyles } from '@/utils/toastStyles';
import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';

export default function AdminDashboard() {
  const [imgFile, setImgFile] = useState(null);
  const [uploadedImgUrl, setUploadedImgUrl] = useState('');
  const [isImgLoading, setIsImgLoading] = useState(false);
  const [deletingImgId, setDeletingImgId] = useState(null);
  const [loadedImgIds, setLoadedImgIds] = useState([]);
  const dispatch = useDispatch();
  const { featureImgList } = useSelector((state) => state.feature);

  const handleUploadImg = () => {
    if (uploadedImgUrl) {
      dispatch(addNewFeature(uploadedImgUrl)).then((action) => {
        const res = action.payload;
        if (res?.success) {
          toast('Feature image is added', {
            duration: 2000,
            style: toastStyles.SUCCESS,
          });
          dispatch(getAllFeatures());
          setImgFile(null);
          setUploadedImgUrl('');
        } else {
          toast.error(res || 'Add feature image is failed', {
            duration: 3000,
            style: toastStyles.ERROR,
          });
        }
      });
    } else {
      toast.error('You have to add an image', {
        style: toastStyles.ERROR,
        duration: 3000,
      });
    }
  };
  const handleDeleteFeatureImg = (imgId) => {
    setDeletingImgId(imgId);
    dispatch(deleteFeature({ imgId })).then((action) => {
      const res = action.payload;
      if (res.success) {
        toast('Feature Image is deleted successfully', {
          duration: 4000,
          style: toastStyles.SUCCESS,
        });
        dispatch(getAllFeatures());
      } else {
        toast.error(res.msg || 'Deleting feature image failed', {
          duration: 4000,
          style: toastStyles.ERROR,
        });
      }
      setDeletingImgId(null);
    });
  };
  useEffect(() => {
    dispatch(getAllFeatures());
  }, [dispatch]);
  return (
    <div className="flex flex-col gap-5">
      <ProductImgUpload
        imgFile={imgFile}
        setImgFile={setImgFile}
        uploadedImgUrl={uploadedImgUrl}
        setUploadedImgUrl={setUploadedImgUrl}
        isImgLoading={isImgLoading}
        setIsImgLoading={setIsImgLoading}
        isAdminDashboard={true}
      />
      <Button
        onClick={handleUploadImg}
        className={`w-2/3 mx-auto ${
          uploadedImgUrl ? 'cursor-pointer' : 'opacity-40'
        }`}
      >
        {uploadedImgUrl ? 'Upload' : 'Add an image'}
      </Button>
      <div className="flex gap-5 mt-10">
        {featureImgList?.map((featureImg) => (
          <div
            key={featureImg._id}
            className={`relative transition-all duration-500 ease-out transform
              ${
                loadedImgIds.includes(featureImg._id)
                  ? 'opacity-100 scale-100'
                  : 'opacity-0 scale-95'
              }
              ${
                deletingImgId === featureImg._id
                  ? 'opacity-30 pointer-events-none'
                  : ''
              }
            `}
          >
            <img
              src={featureImg?.image}
              alt="feature_Img"
              className="h-[300px] object-fill rounded-t-lg"
              onLoad={() =>
                setLoadedImgIds((prev) => [...prev, featureImg._id])
              }
            />
            <button
              className="bg-black rounded-full w-7 h-7 flex justify-center items-center cursor-pointer absolute right-0 top-0 translate-x-1/4 -translate-y-1/4"
              onClick={() => handleDeleteFeatureImg(featureImg._id)}
              disabled={deletingImgId === featureImg._id}
            >
              {deletingImgId === featureImg._id ? (
                <span className="text-white text-xs animate-spin">⏳</span>
              ) : (
                <X className="text-red-500" />
              )}{' '}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
