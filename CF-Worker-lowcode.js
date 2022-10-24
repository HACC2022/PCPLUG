export default {
  async fetch(request, env) {
    return await handleRequest(request).catch(
      (err) => new Response(err.stack, { status: 500 })
    )
  }
}

/**
 * Many more examples available at:
 *   https://developers.cloudflare.com/workers/examples
 * @param {Request} request
 * @returns {Promise<Response>}
 */
async function handleRequest(request) {
  const { pathname } = new URL(request.url);

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
    const encodedurl = pathname.split("/")[2];
    const url = atob(encodedurl);
    console.log(url);
    let url2 = "http://8.8.8.8/"
    let req = new Request(url2, { Method: 'HEAD', signal: AbortSignal.timeout(10000),}); // https://developers.cloudflare.com/workers/examples/modify-request-property/


    let result = "OK"
    try{ let z = await fetch(req); }
    catch(err){ return new Response(JSON.stringify({res:err.name }, {headers: { "Content-Type": "application/json" },})) }
    
    if(z.redirected){result = "Redirected"}
    if(!z.ok){result = "Error"}
    return new Response(JSON.stringify({res: result }, {headers: { "Content-Type": "application/json" },}))    ;
  }


  return fetch("https://welcome.developers.workers.dev");
}
