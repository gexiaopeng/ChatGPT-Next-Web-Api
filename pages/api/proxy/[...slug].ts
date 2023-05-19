import fetch from 'node-fetch';
import { NextRequest } from 'next/server';
export default async function handler(req: NextRequest) {

  const { method } = req;
  const { query } = req
  const { slug } = query
  console.log("-method-"+method+",url:"+req.url+",slug:["+slug+"]");
  //console.log("-query-",query);
  //console.log("-res-",res);
  const url=req.url.slice(11);
  console.log("-url-["+url+"]");
  return await fetch(url, {
    method,
    headers: req.headers,
    body: method.toLowerCase() === 'get' ? null : req.body,
  });

}
export const config = {
  runtime: 'edge',
};