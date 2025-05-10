import { Input } from '@/components/ui/input';
import { getSearchProducts } from '@/store/shop/searchSlice';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import searchingImg from '@/assets/search/searching.svg';
import searchNotFoundImg from '@/assets/search/searchNotFound.svg';
import ShopProductCard from '@/components/view/shop/product/productCard';
export default function ShoppingSearch() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { searchResults } = useSelector((state) => state.shopSearch);
  const searchTerm = searchParams.get('searchTerm') || '';
  const [userInput, setUserInput] = useState(searchTerm);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userInput.length >= 3) {
      setTimeout(() => {
        setSearchParams({ searchTerm: userInput });
      }, 500);
    } else {
      setSearchParams({});
    }
  }, [userInput]);
  useEffect(() => {
    if (searchTerm !== null || searchTerm !== '') {
      dispatch(getSearchProducts(searchTerm));
    }
  }, [searchParams, searchTerm, dispatch]);
  useEffect(() => {
    if (searchResults?.length > 0) {
      dispatch({
        type: 'shopProducts/mergeSearchResults',
        payload: searchResults,
      });
    }
  }, [searchResults, dispatch]);

  return (
    <div className="container mx-auto md:px-6 px-4 py-8">
      <div className="flex justify-center gap-10 flex-col">
        <div className="w-full flex justify-center items-center">
          <Input
            className="w-3/4"
            placeholder="Search Products (name, description, category, brand)"
            name="userInput"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value.trim())}
          />
        </div>
        <div className="flex flex-col gap-7 justify-center items-center">
          {userInput.length >= 3 && searchResults?.length === 0 ? (
            <>
              <p className="text-lg font-semibold bg-yellow-500 py-1 px-5 rounded-2xl">
                No products found
              </p>
              <img
                src={searchNotFoundImg}
                alt="searching..."
                className="w-[300px]"
              />
            </>
          ) : searchResults?.length === 0 ? (
            <>
              <p className="text-lg font-semibold bg-muted py-1 px-5 rounded-2xl">
                Search for your product
              </p>
              <img
                src={searchingImg}
                alt="searching..."
                className="w-[300px]"
              />
            </>
          ) : (
            <>
              <p className="text-lg font-semibold bg-muted py-1 px-5 rounded-2xl">
                Search Results
              </p>
              <div className="w-full grid gap-6 grid-cols-[repeat(auto-fit,minmax(200px,1fr))]">
                {searchResults.map((product) => (
                  <ShopProductCard key={product.title} product={product} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
