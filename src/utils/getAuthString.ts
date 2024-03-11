import md5 from 'md5';
import { API_PASSWORD } from './constants';

export const getAuthString = () => {
  const timestamp = new Date().toISOString().split('T')[0].replace(/-/g, '');

  return md5(`${API_PASSWORD}_${timestamp}`);
};
