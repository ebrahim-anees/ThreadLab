import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeftIcon, ChevronRightIcon, MoveRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllFeatures } from '@/store/common/featureSlice';
import { bannerTexts } from '@/config';

export default function BannerSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { featureImgList } = useSelector((state) => state.feature);
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    if (featureImgList.length > 0) {
      const randomBanners = featureImgList.map((feature) => ({
        featureImg: feature.image,
        msg: bannerTexts[Math.floor(Math.random() * bannerTexts.length)],
      }));
      setBanners(randomBanners);
      setCurrentSlide(0);
    }
  }, [featureImgList]);

  useEffect(() => {
    if (banners.length === 0) return;
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [banners]);

  useEffect(() => {
    dispatch(getAllFeatures());
  }, [dispatch]);
  return (
    <div className="relative w-screen h-[600px] overflow-hidden">
      <Button
        className="absolute left-10 top-1/2 -translate-1/2 z-30 bg-white/50 hover:bg-white/80 text-black cursor-pointer"
        onClick={() =>
          setCurrentSlide(
            (prevSlide) => (prevSlide - 1 + banners.length) % banners.length /// a safe way to go to the previous slide in a circular/looping carousel.
          )
        }
      >
        <ChevronLeftIcon className="!w-7 !h-7" />
      </Button>
      {banners.map((banner, i) => (
        <div
          key={i}
          className={`flex items-center justify-between bg-muted h-full w-screen absolute top-0 left-0 transition-all duration-1000 ease-in-out ${
            i === currentSlide
              ? 'opacity-100 translate-x-0 z-20 pointer-events-auto'
              : 'opacity-0 translate-x-10 z-0 pointer-events-none'
          }`}
        >
          <div className="ml-20">
            <span className="font-bold text-5xl block max-w-[400px]">
              {banner.msg}
            </span>
            <Button
              className="mt-5 cursor-pointer"
              onClick={() => navigate('/shop/listing')}
            >
              Go to collection
              <MoveRight />
            </Button>
          </div>
          <div className="h-full p-5 mr-30 flex justify-center items-center min-w-[300px]">
            <img
              src={banner.featureImg}
              className="h-full max-w-[600px] object-contain"
            />
          </div>
        </div>
      ))}
      <Button
        className="absolute right-0 top-1/2 -translate-1/2 z-30  bg-white/50 hover:bg-white/80 text-black cursor-pointer"
        onClick={() =>
          setCurrentSlide(
            (prevSlide) => (prevSlide + 1) % banners.length /// a safe way to go to the next slide in a circular/looping carousel.
          )
        }
      >
        <ChevronRightIcon className="!w-7 !h-7" />
      </Button>
    </div>
  );
}
