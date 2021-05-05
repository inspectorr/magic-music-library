const url = {
  api:
    process.env.NEXT_PUBLIC_USE_REMOTE_API ?
    process.env.NEXT_PUBLIC_API_URL_PROD :
    process.env.NEXT_PUBLIC_API_URL_DEV,
  web:
    process.env.NODE_ENV === 'production' ?
    process.env.NEXT_PUBLIC_WEB_URL_PROD :
    process.env.NEXT_PUBLIC_WEB_URL_DEV,
};

module.exports = url;
