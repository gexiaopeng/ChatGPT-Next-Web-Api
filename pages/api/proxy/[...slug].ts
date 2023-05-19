import fetch from 'node-fetch';
import { NextRequest } from 'next/server';
export default async function handler(req: NextRequest) {

  const { method } = req;
  console.log("-method-"+method+",url:["+req.url+"]");
  //console.log("-query-",query);
  //console.log("-res-",res);
  const url="https://www.baidu.com";
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