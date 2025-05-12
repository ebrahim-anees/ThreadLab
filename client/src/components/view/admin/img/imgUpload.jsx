import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import axios from 'axios';
import { FileIcon, UploadCloudIcon, XIcon } from 'lucide-react';
import { useEffect, useRef } from 'react';
import ImgLoading from './imgLoading';

export default function ProductImgUpload({
  imgFile,
  setImgFile,
  setUploadedImgUrl,
  isImgLoading,
  setIsImgLoading,
  isAdminDashboard = false,
}) {
  const inputRef = useRef(null);

  function handleImgFileChange(e) {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) setImgFile(selectedFile);
  }
  function handleDragOver(e) {
    e.preventDefault();
  }
  function handleDrop(e) {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) setImgFile(droppedFile);
  }
  function handleRemoveImg() {
    setImgFile(null);
    if (inputRef.current) inputRef.current.value = '';
    setUploadedImgUrl(null);
  }
  async function uploadImgToCloudinary() {
    setIsImgLoading(true);
    const data = new FormData();
    data.append('imgFile', imgFile);

    const res = await axios.post(
      `${import.meta.env.VITE_SERVER_URL}/admin/products/uploadImg`,
      data
    );
    if (res?.data?.success) {
      setUploadedImgUrl(res.data.result.url);
      setIsImgLoading(false);
    }
  }
  useEffect(() => {
    imgFile === null ? handleRemoveImg() : uploadImgToCloudinary();
  }, [imgFile]);
  return (
    <div
      className={`w-full ${isAdminDashboard ? '' : 'max-w-md mx-auto'} px-6`}
    >
      <Label className="text-lg font-semibold mb-2 block">Upload Image</Label>
      {isImgLoading ? (
        <div className="h-24 relative">
          <ImgLoading />
        </div>
      ) : (
        <div
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          className="border-2 border-dashed rounded-lg p-4"
        >
          <Input
            id="img-upload"
            type="file"
            className="hidden"
            ref={inputRef}
            onChange={handleImgFileChange}
          />
          {!imgFile ? (
            <Label
              htmlFor="img-upload"
              className="flex flex-col items-center justify-center h-16 cursor-pointer"
            >
              <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2" />
              <span className="">Drag & drop or click to upload </span>
            </Label>
          ) : (
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <FileIcon className="w-8 text-primary mr-2 h-8" />
              </div>
              <p className="text-sm font-medium">{imgFile.name}</p>
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-foreground cursor-pointer"
                onClick={handleRemoveImg}
              >
                <XIcon className="w-4 h-4" />
                <span className="sr-only">Remove File</span>
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
