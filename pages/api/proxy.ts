import http from 'http'
import https from 'https'
import { NextRequest,NextResponse } from "next/server";

export default function (req:NextRequest, res:NextResponse) {
  const options =  {
    hostname: 'localhost',
    method: req.method,
    headers: req.headers,
  };

  const client = https.request;

  const proxyReq = client(req.url, function (proxyRes) {
    res.writeHead(proxyRes.statusCode, proxyRes.headers)
    proxyRes.pipe(res, {
      end: true
    });
  })

  req.pipe(proxyReq, { end: true });
}
