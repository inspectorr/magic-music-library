import axios from 'axios';
import url from '@/support/utils/url';

const baseURL = `${url.web}/api`;

const localAxios = axios.create({
  baseURL,
  withCredentials: true
});

export function defaultOptions(req) {
  return {
    baseURL,
    withCredentials: true,
    ...extractCookie(req)
  };
}

export function extractCookie(req) {
  const headers = {};
  const cookie = req?.headers?.cookie;
  if (cookie) {
    headers.cookie = cookie;
  }
  return { headers };
}

// for useSWR
export async function clientFetch(url, term) {
  const res = await axios({
    url,
    method: 'GET',
    params: { term },
    ...defaultOptions(),
  });
  
  return res.data;
}

export default localAxios;
