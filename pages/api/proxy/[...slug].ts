
// @ts-ignore
import fetch from 'node-fetch';
import { NextRequest, NextResponse } from "next/server";
export default async function handler2(req:any, res:any) {

  const { method } = req;
  const { query } = req
  const { slug } = query
  console.log("-method-"+method+",url:"+req.url+",slug:["+slug+"]");
  //console.log("-query-",query);
  //console.log("-res-",res);
  const url=req.url.slice(11);
  console.log("-url-["+url+"]");
  const proxyResponse:any = await fetch(url, {
    method,
    headers: req.headers,
    body: method.toLowerCase() === 'get' ? null : req.body,
  });


  //console.log("-proxyResponse-",await proxyResponse);
  const proxyResponseHeaders = await proxyResponse.headers;  // 获取响应头
  const proxyResponseBody = await proxyResponse.text();  // 获取响应体
  res.status(proxyResponse.status);
  /**
  proxyResponseHeaders.forEach((value:any,name:any) => {
    res.setHeader(name, value);    // 设置响应头
  });
   */
  res.text(proxyResponseBody);
}

async function makeRequest(req: NextRequest) {
  const { method } = req;
  const { query } = req
  const { slug } = query
  console.log("-method-"+method+",url:"+req.url+",slug:["+slug+"]");
  const url=req.url.slice(11);
  console.log("-url-["+url+"]");
  return NextResponse.json(
      {
        error: {
          message: "JSON.stringify(e)",
          type: "Internal server errorr",
          param: null,
          code: "internal_error"
        }
      },
      {
        status: 500,
      }
  );
}

export async function POST(req: NextRequest) {
  return makeRequest(req);
}

export async function GET(req: NextRequest) {
  return makeRequest(req);
}
