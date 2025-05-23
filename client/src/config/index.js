import {
  BabyIcon,
  Boxes,
  ClipboardPenLine,
  CloudLightning,
  Flower,
  Goal,
  Landmark,
  LayoutDashboard,
  LoaderPinwheel,
  MemoryStick,
  ShirtIcon,
  ShoppingBasket,
  UmbrellaIcon,
  WatchIcon,
} from 'lucide-react';

export const formControls = [
  {
    name: 'userName',
    label: 'User Name',
    placeholder: 'Enter your user name',
    componentType: 'input',
    type: 'text',
  },
  {
    name: 'email',
    label: 'Email',
    placeholder: 'Enter your email',
    componentType: 'input',
    type: 'email',
  },
  {
    name: 'password',
    label: 'Password',
    placeholder: 'Enter your password',
    componentType: 'input',
    type: 'password',
  },
  {
    name: 'confirmPassword',
    label: 'Confirm password',
    placeholder: 'Enter your password again',
    componentType: 'input',
    type: 'password',
  },
];

export const adminSidebarMenuItems = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    path: '/admin/dashboard',
    icon: LayoutDashboard,
  },
  {
    id: 'products',
    label: 'Products',
    path: '/admin/products',
    icon: ShoppingBasket,
  },
  {
    id: 'orders',
    label: 'Orders',
    path: '/admin/orders',
    icon: ClipboardPenLine,
  },
];

export const productFormElements = [
  {
    label: 'Title',
    name: 'title',
    componentType: 'input',
    type: 'text',
    placeholder: 'Enter product title',
  },
  {
    label: 'Description',
    name: 'description',
    componentType: 'textarea',
    placeholder: 'Enter product description',
  },
  {
    label: 'Category',
    name: 'category',
    componentType: 'select',
    options: [
      { id: 'men', label: 'Men' },
      { id: 'women', label: 'Women' },
      { id: 'kids', label: 'Kids' },
      { id: 'accessories', label: 'Accessories' },
      { id: 'footwear', label: 'Footwear' },
    ],
  },
  {
    label: 'Brand',
    name: 'brand',
    componentType: 'select',
    options: [
      { id: 'nike', label: 'Nike' },
      { id: 'adidas', label: 'Adidas' },
      { id: 'puma', label: 'Puma' },
      { id: 'levi', label: "Levi's" },
      { id: 'zara', label: 'Zara' },
      { id: 'h&m', label: 'H&M' },
    ],
  },
  {
    label: 'Price',
    name: 'price',
    componentType: 'input',
    type: 'number',
    placeholder: 'Enter product price',
  },
  {
    label: 'Sale Price',
    name: 'salePrice',
    componentType: 'input',
    type: 'number',
    placeholder: 'Enter sale price (optional)',
  },
  {
    label: 'Total Stock',
    name: 'totalStock',
    componentType: 'input',
    type: 'number',
    placeholder: 'Enter total stock',
  },
];

export const shoppingHeaderMenuItems = [
  {
    id: 'home',
    label: 'Home',
    path: '/shop/home',
  },
  {
    id: 'products',
    label: 'Products',
    path: '/shop/listing',
  },
  {
    id: 'men',
    label: 'Men',
    path: '/shop/listing?category=men',
  },
  {
    id: 'women',
    label: 'Women',
    path: '/shop/listing?category=women',
  },
  {
    id: 'kids',
    label: 'Kids',
    path: '/shop/listing?category=kids',
  },
  {
    id: 'footwear',
    label: 'Footwear',
    path: '/shop/listing?category=footwear',
  },
  {
    id: 'accessories',
    label: 'Accessories',
    path: '/shop/listing?category=accessories',
  },
  {
    id: 'search',
    label: 'Search',
    path: '/shop/search',
  },
];

export const categoryOptionsMap = {
  men: 'Men',
  women: 'Women',
  kids: 'Kids',
  accessories: 'Accessories',
  footwear: 'Footwear',
};

export const brandOptionsMap = {
  nike: 'Nike',
  adidas: 'Adidas',
  puma: 'Puma',
  levi: 'Levi',
  zara: 'Zara',
  'h&m': 'H&M',
};

export const filterOptions = {
  category: [
    { id: 'men', label: 'Men' },
    { id: 'women', label: 'Women' },
    { id: 'kids', label: 'Kids' },
    { id: 'accessories', label: 'Accessories' },
    { id: 'footwear', label: 'Footwear' },
  ],
  brand: [
    { id: 'nike', label: 'Nike' },
    { id: 'adidas', label: 'Adidas' },
    { id: 'puma', label: 'Puma' },
    { id: 'levi', label: "Levi's" },
    { id: 'zara', label: 'Zara' },
    { id: 'h&m', label: 'H&M' },
  ],
};

export const sortOptions = [
  { id: 'price-lowtohigh', label: 'Price: Low to High' },
  { id: 'price-hightolow', label: 'Price: High to Low' },
  { id: 'title-atoz', label: 'Title: A to Z' },
  { id: 'title-ztoa', label: 'Title: Z to A' },
];

export const addressFormControls = [
  {
    label: 'Address',
    name: 'address',
    componentType: 'input',
    type: 'text',
    placeholder: 'Enter your address',
  },
  {
    label: 'City',
    name: 'city',
    componentType: 'input',
    type: 'text',
    placeholder: 'Enter your city',
  },
  {
    label: 'Pincode',
    name: 'pincode',
    componentType: 'input',
    type: 'text',
    placeholder: 'Enter your pincode',
  },
  {
    label: 'Phone',
    name: 'phone',
    componentType: 'input',
    type: 'text',
    placeholder: 'Enter your phone number',
  },
  {
    label: 'Notes',
    name: 'notes',
    componentType: 'textarea',
    placeholder: 'Enter any additional notes',
  },
];

export const homeCategory = [
  { id: 'men', label: 'Men', icon: ShirtIcon },
  { id: 'women', label: 'Women', icon: CloudLightning },
  { id: 'kids', label: 'Kids', icon: BabyIcon },
  { id: 'accessories', label: 'Accessories', icon: WatchIcon },
  { id: 'footwear', label: 'Footwear', icon: UmbrellaIcon },
];

export const homeBrand = [
  { id: 'nike', label: 'Nike', icon: Goal },
  { id: 'adidas', label: 'Adidas', icon: Landmark },
  { id: 'puma', label: 'Puma', icon: LoaderPinwheel },
  { id: 'levi', label: "Levi's", icon: Boxes },
  { id: 'zara', label: 'Zara', icon: Flower },
  { id: 'h&m', label: 'H&M', icon: MemoryStick },
];
export const adminOrderStatus = [
  {
    label: 'Order Status',
    name: 'status',
    componentType: 'select',
    options: [
      { id: 'pending', label: 'Pending' },
      { id: 'inProcess', label: 'In Process' },
      { id: 'inShipping', label: 'In Shipping' },
      { id: 'confirmed', label: 'confirmed' },
      { id: 'rejected', label: 'Rejected' },
    ],
  },
];

export const bannerTexts = [
  'ThreadLab: Where Everyday Meets Elevated',
  'Clothes That Speak Your Vibe',
  'Stay Ahead of the Trends – Shop the Latest Drops',
  'Unbox Confidence with Every Fit',
  'Style That Moves with You',
  'Made to Stand Out, Designed to Last',
  'Not Just Fashion — It’s a Lifestyle',
  'Minimal Effort, Maximum Impact',
  'From Street to Chic in Seconds',
  'Crafted Looks for Everyday Icons',
  'Elevate Your Everyday Essentials',
  'Your Fit, Your Story',
  'New Drops, No Flops',
  'Dressed for the Moment',
  'Timeless Looks. Modern Feels.',
  'Where Fit Meets Function',
  'Daily Drip Delivered',
  'Style Without Stress',
  'Wear What Moves You',
  'Because Basics Shouldn’t Be Boring',
];
