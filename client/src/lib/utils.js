import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function setInitialFormData(array) {
  const initialData = array.reduce((acc, cur) => {
    acc[cur.name] = '';
    return acc;
  }, {});
  return initialData;
}

export function isCookieExist(cookieName) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${cookieName}=`);
  return parts.length === 2;
}
