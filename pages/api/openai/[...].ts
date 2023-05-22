import {NextRequest, NextResponse} from 'next/server';

export default async function handler(req: NextRequest) {
    const {method} = req;
    console.log("-method-" + method + ",url:[" + req.url + "]");
    const url = `${req.nextUrl.pathname}${req.nextUrl.search}`.replaceAll("/api/openai/", "");
    const ourl="https://api.openai.com/"+url;
    console.log("-url-[" + ourl + "]");
    try {
        return fetch(ourl, {
            headers: req.headers,
            method: method,
            body: req.body,
        });
    } catch (e) {
        console.error("[api/openai]error", e);
        return NextResponse.json(
            {
                error: true,
                msg: JSON.stringify(e),
            },
            {
                status: 500,
            },
        );
    }

}
export const config = {
    runtime: 'edge',
};