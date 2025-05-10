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

export function areObjectsEqual(obj1, obj2) {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) return false;

  return keys1.every((key) => obj1[key].trim() === obj2[key].trim());
}
