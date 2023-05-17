import http from 'http'
import https from 'https'
import { NextApiRequest,NextApiResponse } from "next";

export default function (req:NextApiRequest, res:NextApiResponse) {
  const options = {
    headers: req.headers,
    method: req.method,
    // 将代理服务器作为目标代理
    host: req.host,
    port: req.port,
    path: req.url,
    protocol:req.protocol
  }

  const client = options.protocol === 'https:' ? https.request : http.request

  const proxyReq = client(options, function (proxyRes:NextApiResponse) {
    res.writeHead(proxyRes.statusCode, proxyRes.headers)
    proxyRes.pipe(res, {
      end: true
    })
  })

  req.pipe(proxyReq, { end: true })
}
