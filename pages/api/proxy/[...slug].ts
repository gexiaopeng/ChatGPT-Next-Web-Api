
import fetch from 'node-fetch';

export default async function handler(req:any, res:any) {

  const { method } = req;
  const { query } = req
  const { slug } = query
  console.log("-method-"+method+",url:"+req.url+",slug:["+slug+"]");
  console.log("-query-",query);
  console.log("-res-",res);
  const url=req.url.slice(11);

  const proxyResponse:any = await fetch(url, {
    method,
    headers: req.headers,
    body: method.toLowerCase() === 'get' ? null : req.body,
  });
  console.log("-proxyResponse-",await proxyResponse);
  const proxyResponseJson = await proxyResponse.json();
 res.status(proxyResponseJson.status).json(proxyResponseJson);
}
