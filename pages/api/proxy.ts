import  http from 'http'
import url from 'url'

export default function (req, res) {
  const u = url.parse(req.url);

  const options = {
    hostname : u.hostname,
    port     : u.port || 80,
    path     : u.path,
    method     : req.method,
    headers     : req.headers
  };

  const client = http.request;

  const proxyReq = client(options, function (proxyRes) {
    res.writeHead(proxyRes.statusCode, proxyRes.headers);
    proxyRes.pipe(res, {
      end: true
    });
  })

  req.pipe(proxyReq, { end: true });
}
