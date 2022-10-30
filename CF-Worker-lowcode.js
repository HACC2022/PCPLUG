export default {
	async fetch(request, env) {
		return await handleRequest(request).catch(
			(err) => new Response(err.stack, {
				status: 500
			})
		)
	}
}
const bearerToken = "Bearer IamASecureBearToken" // PLEASE CHANGE FOR SECURITY, must match in Budibase
const budiApiGet = "https://edit.hacc.ga/api/public/v1/tables/ta_6bc0c2af92e94a6cb04c0a6d8ea9ee38/rows/search" // Find row see https://docs.budibase.com/reference/post_tables-tableid-rows-search
const budiApiSet = "https://edit.hacc.ga/api/public/v1/tables/ta_62932153e9b141cf970ca23e21721c73/rows" // Create Tracking row, see https://docs.budibase.com/reference/post_tables-tableid-rows
const budiApiKey = { // API keys from budibase https://docs.budibase.com/docs/public-api
	'content-type': "application/json",
	'accept': "application/json",
	'x-budibase-app-id': "app_731acc3a5d304eca904f5e326e69a669", // Get from Budibase without "_dev"
	'x-budibase-api-key': "9b546f8e88a2e9ee2277ddf84500b0f5-55ca69dd4c128c122f34492849be2e5ac15f7d70e39fee08bc702361000d9473e9b0fbc81df63463"
}

async function handleRequest(request) {
	const {		pathname	} = new URL(request.url); // Get the requested URL
	if (request.headers.get("Authorization") === bearerToken) { // Non-public API functions need bearer token
		if (pathname.startsWith("/check")) { // API call to "/check/ endpoint"
			const url = atob(request.headers.get("url")); //Get base64 portion of URL from header "url"
			let req = new Request(url, {
				Method: 'HEAD',
				signal: AbortSignal.timeout(10000),
			}); // https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal/timeout
			let result = "OK" // A result starts a "OK" and we check against all errors
			try {
				let z = await fetch(req); // https://developers.cloudflare.com/workers/examples/modify-request-property/
				if (z.redirected) {
					result = "Redirected"
				} // Check for redirected websites
				else if (Boolean(z.ok) === false) {
					result = "Error";
					z.url = url
				}; // Check for 200 or other OK code
				return new Response(JSON.stringify({
					res: result,
					endurl: z.url
				}, {
					headers: {
						"Content-Type": "application/json"
					},
				})); // Return JSON to Budibase
			} catch (err) {
				return new Response(JSON.stringify({
					res: "TCP"
				}, {
					headers: {
						"Content-Type": "application/json"
					},
				}))
			}; //Could not complete Fetch, return TCP error
		}
	}// End nonpublic, no bearer token 
	// Start of public API section, build query to Budibase must be Approved and OK
	let shortcodeQuery = {
		body: JSON.stringify({
			query: {
				"string": {
					"shortcode": pathname.substring(1) // Get the short code from the path
				},
				"equal": {
					"Approved": "true", 
					"Status": "OK"
				}
			},
			limit: 1
		})  ,
		method: 'POST', // POST for Budibase API, see https://docs.budibase.com/reference/post_tables-tableid-rows-search
		headers: budiApiKey // API keys from budibase https://docs.budibase.com/docs/public-api
	};
	const getURL = await fetch(budiApiGet, shortcodeQuery); // Fetch url from Budibase
	let longUrl = await getURL.json();
	if (longUrl.data.length === 0) // No shortcode in Budibase for that URL
	{
		return new Response('Not found, invalid shortcode')
	} else { // Else shortcode found, send ping back to Tracking Table in Budibase
		init = {
			body: JSON.stringify({
				shortcode: pathname.substring(1)
			}),
			method: 'POST',
			headers: budiApiKey
		}
		fetch(budiApiSet, init); //Send hit to Budibase
	}
	return Response.redirect(longUrl.data[0].url, 307); // Return the redirect to the client
}
