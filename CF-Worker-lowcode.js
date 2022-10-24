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
    let url2 = "https://www.google.com/"
    let req = new Request(url, { Method: 'HEAD'}); // https://developers.cloudflare.com/workers/examples/modify-request-property/
    let z = await fetch(req);
    console.log(z);
    let result = "OK"
    if(z.redirected){result = "Redirected"}
    if(!z.ok){result = "Error"}

    return new Response(JSON.stringify({res: result, endurl : z.url }, {headers: { "Content-Type": "application/json" },}))    ;
  }


  return fetch("https://welcome.developers.workers.dev");
}
