import * as http from 'http'


export default function (req, res) {
  const options =  {
    hostname: 'localhost',
    method: req.method,
    headers: req.headers,
  };

  const client = http.request;

  const proxyReq = client(req.url, function (proxyRes) {
    res.writeHead(proxyRes.statusCode, proxyRes.headers)
    proxyRes.pipe(res, {
      end: true
    });
  })

  req.pipe(proxyReq, { end: true });
}
