import axios from 'axios';

const baseURL =
  process.env.NEXT_PUBLIC_USE_REMOTE_API ?
  process.env.NEXT_PUBLIC_API_URL_REMOTE :
  process.env.NEXT_PUBLIC_API_URL_LOCAL;

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
