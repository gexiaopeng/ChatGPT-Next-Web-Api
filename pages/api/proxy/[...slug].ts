
import fetch from 'node-fetch';

export default async function handler(req:any, res:any) {

  const { method } = req;
  const { query } = req
  const { slug } = query
  console.log("-method-"+method+",url:"+req.url+",slug:["+slug+"]");
  //console.log("-query-",query);
  //console.log("-res-",res);
  const url=req.url.slice(11);
  console.log("-url-["+url+"]");
  const proxyResponse:any = await fetch(url, {
    method,
    headers: req.headers,
    body: method.toLowerCase() === 'get' ? null : req.body,
  });


  //console.log("-proxyResponse-",await proxyResponse);
  const proxyResponseHeaders = await proxyResponse.headers;  // 获取响应头
  const proxyResponseBody = await proxyResponse.text();  // 获取响应体
  res.status(proxyResponse.status);
  /**
  proxyResponseHeaders.forEach((value:any,name:any) => {
    res.setHeader(name, value);    // 设置响应头
  });
   */
  res.send(proxyResponseBody);
}
