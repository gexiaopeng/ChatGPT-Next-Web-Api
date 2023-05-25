import {NextRequest, NextResponse} from 'next/server';

export default async function handler(req: NextRequest) {
    const {method} = req;
    console.log("-method-" + method + ",url:[" + req.url + "]");
    const url = `${req.nextUrl.pathname}${req.nextUrl.search}`.replaceAll("/api/openai/", "");
    const ourl="https://api.openai.com/"+url;
    const newHeaders =  new Headers( req.headers);
    newHeaders.delete('host');
    console.log("-url-[" + ourl + "]");
    let heads="";
    for (const [key, value] of newHeaders.entries()) {
        heads+=key+":"+value+"\n";
    }
    //console.log("-heads-[" + heads + "]");
    try {
        return fetch(ourl, {
            headers: newHeaders,
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