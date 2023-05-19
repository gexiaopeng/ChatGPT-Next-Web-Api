
import { NextRequest } from 'next/server';
export default async function handler(req: NextRequest) {
  const { method } = req;
  console.log("-method-"+method+",url:["+req.url+"]");
  //console.log("-query-",query);
  //console.log("-res-",res);
  const url = `${req.nextUrl.pathname}${req.nextUrl.search}`.replaceAll("/api/proxy/", "");
  console.log("-url-["+url+"]");
  return fetch(url, {
    headers: req.headers,
    method:method,
    body: req.body,
  });

}
export const config = {
  runtime: 'edge',
};