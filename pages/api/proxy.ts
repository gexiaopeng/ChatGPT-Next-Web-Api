import http from 'http'
import https from 'https'
import { NextRequest,NextResponse } from "next/server";

export default function (req:NextRequest, res:NextResponse) {
  const options = {
    headers: req.headers,
    method: req.method,
    // 将代理服务器作为目标代理
    host: req.hostname,
    port: req.port,
    path: req.url,
    protocol:req.protocol
  }

  const client = options.protocol === 'https:' ? https.request : http.request

  const proxyReq = client(options, function (proxyRes:NextResponse) {
    res.writeHead(proxyRes.statusCode, proxyRes.headers)
    proxyRes.pipe(res, {
      end: true
    })
  })

  req.pipe(proxyReq, { end: true })
}
