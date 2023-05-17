import  http from 'http'
import  https from 'https'
import url from 'url'
import next from 'next'
const dev = process.env.NODE_ENV !== 'production'

// Init the Next app:
const app = next({ dev })

function request (req:any, res:any) {
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

  const client = protocol=== 'https:' ? https.request : http.request;

  const proxyReq = client(options, function (proxyRes:any) {
    res.writeHead(proxyRes.statusCode, proxyRes.headers);
    proxyRes.pipe(res, {
      end: true
    });
  })

  req.pipe(proxyReq, { end: true });
}
console.log("--createServer--begin--",http,https);
http.createServer().on('request', request).listen(3888);
console.log("--createServer--end--",http,https);

app.prepare().then(() => {
  console.log("app--prepare");
});