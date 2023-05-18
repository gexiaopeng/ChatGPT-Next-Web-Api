
import fetch from 'node-fetch';

export default async function handler(req:any, res:any) {

  const { method } = req;
  const { query } = req
  const { slug } = query
  console.log("-method-"+method+",url:"+req.url+",slug:["+slug+"]");
  console.log("-query-",query);
  const url=req.url.splice(11);

  const proxyResponse = await fetch(url, {
    method,
    headers: req.headers,
    body: method.toLowerCase() === 'get' ? null : req.body,
  });
  console.log("-headers-",await proxyResponse.headers);
  const proxyResponseJson = await proxyResponse.json();
 res.status(proxyResponseJson.status).json(proxyResponseJson);
}
