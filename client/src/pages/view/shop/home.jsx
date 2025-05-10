import onlineShopping1 from '@/assets/banner/onlineShopping_1.png';
import onlineShopping2 from '@/assets/banner/onlineShopping_2.png';
import onlineShopping3 from '@/assets/banner/onlineShopping_3.png';
import { Button } from '@/components/ui/button';
import { ChevronLeftIcon, ChevronRightIcon, MoveRight } from 'lucide-react';
import { homeCategory, homeBrand } from '@/config';
import { Card, CardContent } from '@/components/ui/card';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchAllProductsWithFilteration,
} from '@/store/shop/productsSlice';
import ShopProductCard from '@/components/view/shop/product/productCard';
import { useNavigate } from 'react-router-dom';

const banners = [
  {
    msg: 'ThreadLab: Where Everyday Meets Elevated',
    img: onlineShopping1,
  },
  {
    msg: 'Clothes That Speak Your Vibe',
    img: onlineShopping2,
  },
  {
    msg: 'Stay Ahead of the Trends – Shop the Latest Drops',
    img: onlineShopping3,
  },
];
export default function ShoppingHome() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { productsList } = useSelector((state) => state.shopProducts);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleProductNavigate = (label, filter) => {
    const params = new URLSearchParams();
    params.set(label, filter);
    navigate(`/shop/listing?${params.toString()}`);
  };
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);
  useEffect(() => {
    dispatch(
      fetchAllProductsWithFilteration({
        filterParams: {},
        sortParam: 'price-lowtohigh',
      })
    );
  }, [dispatch]);
  return (
    <div className="flex flex-col min-h-screen">
      <div className="relative w-full h-[600px] overflow-hidden">
        <Button
          className="absolute left-10 top-1/2 -translate-1/2 z-10 bg-white/50 hover:bg-white/80 text-black cursor-pointer"
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
            className={`flex items-center justify-between bg-muted h-full w-screen absolute top-0 left-0 transition-opacity duration-1000 ${
              i === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="ml-20">
              <span className="font-bold text-3xl block max-w-[350px]">
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
            <div className="h-full p-5 mr-30 flex justify-center align-center">
              <img src={banner.img} className="max-h-full" />
            </div>
          </div>
        ))}
        <Button
          className="absolute right-0 top-1/2 -translate-1/2 z-10  bg-white/50 hover:bg-white/80 text-black cursor-pointer"
          onClick={() =>
            setCurrentSlide(
              (prevSlide) => (prevSlide + 1) % banners.length /// a safe way to go to the next slide in a circular/looping carousel.
            )
          }
        >
          <ChevronRightIcon className="!w-7 !h-7" />
        </Button>
      </div>
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 ">Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {homeCategory.map((category) => (
              <Card
                key={category.id}
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => handleProductNavigate('category', category.id)}
              >
                <CardContent className="flex flex-col items-center justify-center pt-6 ">
                  <category.icon className="w-12 h-12 mb-4 text-primary" />
                  <span className="font-bold">{category.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 ">Brands</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {homeBrand.map((brand) => (
              <Card
                key={brand.id}
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => handleProductNavigate('brand', brand.id)}
              >
                <CardContent className="flex flex-col items-center justify-center pt-6 ">
                  <brand.icon className="w-12 h-12 mb-4 text-primary" />
                  <span className="font-bold">{brand.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <section className="py-12 ">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 ">
            Feature Products
          </h2>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {productsList?.length > 0 ? (
              productsList.map((product) => (
                <ShopProductCard key={product.title} product={product} />
              ))
            ) : (
              <div>No product Found</div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
