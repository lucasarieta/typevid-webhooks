import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string) {
  const _date = new Date(date);

  const day = String(_date.getDate()).padStart(2, '0');
  const month = String(_date.getMonth() + 1).padStart(2, '0');
  const year = _date.getFullYear();
  const hours = String(_date.getHours()).padStart(2, '0');
  const minutes = String(_date.getMinutes()).padStart(2, '0');

  return `${day}/${month}/${year} ${hours}:${minutes}`;
}
