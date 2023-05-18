
import fetch from 'node-fetch';

export default async function handler(req:any, res:any) {

  const { method } = req;
  const { query } = req
  const { slug } = query
  console.log("-method-"+method+",url:"+req.url+",slug:"+slug+",query:"+query,req.headers);
  /**
  const proxyResponse = await fetch(`${slug}`, {
    method,
    headers: req.headers,
    body: method.toLowerCase() === 'get' ? null : req.body,
  });
  const proxyResponseJson = await proxyResponse.json();
   */
  const proxyResponseJson={code:90,msg:'hello'};
  res.status(200).json(proxyResponseJson);
}
