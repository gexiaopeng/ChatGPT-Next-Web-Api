import { createProxyMiddleware, ErrorRequestHandler, RequestHandler } from 'http-proxy-middleware';
import { NextApiRequest, NextApiResponse } from 'next';
type AsyncRequestHandler = (req: NextApiRequest, res: NextApiResponse) => Promise<void>;
export default async function handler(req:NextApiRequest, res:NextApiResponse) {

  const { method } = req;
  const { PROXY_API_URL } = process.env;
  const { slug } = req.query;
  console.log("-method-"+method+",PROXY_API_URL:"+PROXY_API_URL+",url:"+req.url+",slug:"+slug!);

  const proxyMiddleware = createProxyMiddleware({
    target: `${slug!}`,
    changeOrigin: true,
    headers: { 'X-Custom-Header': 'Hello from Vercel' },
  });
  const proxy: AsyncRequestHandler = (req, res) => {
    return new Promise<void>((resolve, reject) => {
      const callback: ErrorRequestHandler = (err:any, req:any, res:any) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      };
      proxyMiddleware(req, res, callback);
    });
  };
  return proxy(req, res);
}
