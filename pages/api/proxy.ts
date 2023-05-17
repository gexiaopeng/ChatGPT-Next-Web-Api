import  http from 'http'
import  https from 'https'
import url from 'url'

export default function (req:any, res:any) {
  const u = url.parse(req.url);
  console.log("---proxy----url:",req.url);
  const protocol=u.protocol;

  const options = {
    hostname : u.hostname,
    port     : u.port || 80,
    path     : u.path,
    method     : req.method,
    headers     : req.headers
  };

  const client = protocol=== 'https:' ? https.request : http.reques

  const proxyReq = client(options, function (proxyRes:any) {
    res.writeHead(proxyRes.statusCode, proxyRes.headers);
    proxyRes.pipe(res, {
      end: true
    });
  })

  req.pipe(proxyReq, { end: true });
}
