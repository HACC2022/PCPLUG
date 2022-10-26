export default {
  async fetch(request, env) {
    return await handleRequest(request).catch(
      (err) => new Response(err.stack, { status: 500 })
    )
  }
}
const budiApi = "https://edit.hacc.ga/api/public/v1/tables/ta_6bc0c2af92e94a6cb04c0a6d8ea9ee38/rows/search"

/**
 * Many more examples available at:
 *   https://developers.cloudflare.com/workers/examples
 * @param {Request} request
 * @returns {Promise<Response>}
 */
async function handleRequest(request) {
  const { pathname } = new URL(request.url);
  const bearerToken = "Bearer IamASecureBearToken"

if(request.headers.get("Authorization") === bearerToken){
  if (pathname.startsWith("/api")) {
    return new Response(JSON.stringify({ pathname }), {
      headers: { "Content-Type": "application/json" },
    });
  }

  if (pathname.startsWith("/status")) {
    const httpStatusCode = Number(pathname.split("/")[2]);

    return Number.isInteger(httpStatusCode)
      ? fetch("https://http.cat/" + httpStatusCode)
      : new Response("That's not a valid HTTP status code.");
  }

  if (pathname.startsWith("/check")) {

    console.log(request.headers.get("url"));

    const url = atob(request.headers.get("url")); //Get base64 portion of URL from header "url"
    console.log(url);

    let req = new Request(url, { Method: 'HEAD', signal: AbortSignal.timeout(10000),}); // https://developers.cloudflare.com/workers/examples/modify-request-property/
    let result = "OK" // A result starts a "OK" and we check against all errors
    try{ let z = await fetch(req); 
        console.log(z);
        if(z.redirected){result = "Redirected"}
        else if(Boolean(z.ok) === false ){result = "Error"; z.url = url};
       return new Response(JSON.stringify({res: result, endurl : z.url  }, {headers: { "Content-Type": "application/json" },}))    ;

    } // https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal/timeout
    catch(err){ return new Response(JSON.stringify({res:"TCP" }, {headers: { "Content-Type": "application/json" },})) };
  }
}

const body = {  query : {        "string": {"shortcode": pathname.substring(1)},
        "equal": {
            "Approved": "true",
            "Status": "OK"
  }},
  limit: 1
};
const init = {
    body: JSON.stringify(body),
    method: 'POST',
    headers: {
          'accept': "application/json",
    'x-budibase-app-id': "app_dev_731acc3a5d304eca904f5e326e69a669",
    'content-type': "application/json",
    'x-budibase-api-key': "9b546f8e88a2e9ee2277ddf84500b0f5-55ca69dd4c128c122f34492849be2e5ac15f7d70e39fee08bc702361000d9473e9b0fbc81df63463"
}
  };
  const response = await fetch(budiApi, init);
  let x = await response.json();
  console.log(x.data[0].url )

    return Response.redirect(x.data[0].url, 307);
}
