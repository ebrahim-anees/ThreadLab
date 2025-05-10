import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import ProductFilter from '@/components/view/shop/filter';
import ShopProductCard from '@/components/view/shop/product/productCard';
import { sortOptions } from '@/config';
import { fetchAllProductsWithFilteration } from '@/store/shop/productsSlice';
import { ArrowUpDownIcon } from 'lucide-react';
import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

export default function ShoppingListing() {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { productsList } = useSelector((state) => state.shopProducts);

  const filters = useMemo(() => {
    const parsedFilters = {};
    for (const [key, value] of searchParams.entries()) {
      if (key !== 'sort') {
        parsedFilters[key] = value.split(',');
      }
    }
    return parsedFilters;
  }, [searchParams]);
  const sort = useMemo(
    () => searchParams.get('sort') || sortOptions[0]?.id,
    [searchParams]
  );

  const handleSort = (sortValue) => {
    setSearchParams((prevParams) => {
      prevParams.set('sort', sortValue);
      return prevParams;
    });
  };
  const handleFilters = (sectionName, curOption) => {
    setSearchParams((prevParams) => {
      const currentOptions = prevParams.get(sectionName)
        ? prevParams.get(sectionName).split(',')
        : [];
      if (currentOptions.includes(curOption)) {
        currentOptions.splice(currentOptions.indexOf(curOption), 1);
      } else {
        currentOptions.push(curOption);
      }
      prevParams.set(sectionName, currentOptions.join(','));
      return prevParams;
    });
  };

  useEffect(() => {
    dispatch(
      fetchAllProductsWithFilteration({
        filterParams: filters,
        sortParam: sort,
      })
    );
  }, [dispatch, filters, sort]);
  return (
    <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 p-4 md:p-6">
      <ProductFilter filters={filters} handleFilters={handleFilters} />
      <div className="bg-background w-full rounded-lg shadow-sm">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-bold">All Products</h2>
          <div className="flex items-center gap-3">
            <span className="text-muted-foreground">
              <span className="font-semibold">{productsList?.length}</span>{' '}
              Products
            </span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1 cursor-pointer"
                >
                  <ArrowUpDownIcon className="w-4 h-4" />
                  <span className="">Sort by</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                  {sortOptions.map((sortItem) => (
                    <DropdownMenuRadioItem
                      key={sortItem.id}
                      value={sortItem.id}
                      className="cursor-pointer"
                    >
                      {sortItem.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="grid grid-col-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {productsList?.length > 0 &&
            productsList.map((product) => (
              <ShopProductCard key={product.title} product={product} />
            ))}
        </div>
      </div>
    </div>
  );
}
