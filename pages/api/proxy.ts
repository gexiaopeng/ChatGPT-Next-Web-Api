import fetch from 'node-fetch';
import { NextRequest, NextResponse } from "next/server";
export default async function handler(req:any, res:any) {
  const { method } = req;
  const { PROXY_API_URL } = process.env;
  console.log("-method-"+method+",PROXY_API_URL:"+PROXY_API_URL+",url:"+req.url);
  const proxyResponseJson = {code:1,msg:'ok'};
  res.status(200).json(NextResponse.json({code:1,msg:"hello"}).json());
}
