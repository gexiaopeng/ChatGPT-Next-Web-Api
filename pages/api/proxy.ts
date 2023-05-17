import  http from 'http'
import url from 'url'

export default function (req:any, res:any) {
  const u = url.parse(req.url);

  const options = {
    hostname : u.hostname,
    port     : u.port || 80,
    path     : u.path,
    method     : req.method,
    headers     : req.headers
  };

  const client = http.request;

  const proxyReq = client(options, function (proxyRes:any) {
    res.writeHead(proxyRes.statusCode, proxyRes.headers);
    proxyRes.pipe(res, {
      end: true
    });
  })

  req.pipe(proxyReq, { end: true });
}
