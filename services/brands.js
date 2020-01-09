import fetch from 'isomorphic-unfetch';
import { API_DOMAIN } from '../enums/api';

export default async (params) => {
  const res = await fetch(`${API_DOMAIN}brands`);
  const serverData = await res.json();
  return serverData;
};
