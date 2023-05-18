import { createProxyMiddleware } from 'http-proxy-middleware';
import { NextRequest, NextResponse } from "next/server";
export default async function handler(req:any, res:any) {

  const { method } = req;
  const { PROXY_API_URL } = process.env;
  const { slug } = req.query;
  console.log("-method-"+method+",PROXY_API_URL:"+PROXY_API_URL+",url:"+req.url+",slug:"+slug);
  // 创建中间件代理到外部 API
  const proxy = createProxyMiddleware({
    target: `${slug.join('/')}`,
    changeOrigin: true,
    headers: { 'X-Custom-Header': 'Hello from Vercel' },
  });

  // 执行中间件
  proxy(req, res);
}
