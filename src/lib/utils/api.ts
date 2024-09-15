export function generateApiUrl(context?: string) {
  const baseApiUrl = process.env.NEXT_PUBLIC_API_URL;
  const pathApiUrl = process.env.NEXT_PUBLIC_API_PATH;

  if (baseApiUrl === undefined) {
    throw new Error('API URL is not defined. Please define it in .env file.');
  }

  const url = new URL(baseApiUrl);
  url.pathname = pathApiUrl + '/' + context;
  url.pathname = url.pathname.replace(/\/+/g, '/');

  return url.toString();
}
