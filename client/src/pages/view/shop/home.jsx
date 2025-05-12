
import { homeCategory, homeBrand } from '@/config';
import { Card, CardContent } from '@/components/ui/card';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllProductsWithFilteration } from '@/store/shop/productsSlice';
import ShopProductCard from '@/components/view/shop/product/productCard';
import { useNavigate } from 'react-router-dom';
import BannerSlider from '@/components/view/shop/home/bannerSlider';

export default function ShoppingHome() {
  const { productsList } = useSelector((state) => state.shopProducts);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleProductNavigate = (label, filter) => {
    const params = new URLSearchParams();
    params.set(label, filter);
    navigate(`/shop/listing?${params.toString()}`);
  };
  
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
      <BannerSlider />
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
