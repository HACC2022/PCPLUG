Oct 15: (1hr) Mock up CRUD model, basic fields determined to be ["Auto ID","Created At","Updated At","shortcode","url","Status","Approved","Notes"] for the Links database.
-----------------
Oct 16: (4 hr) Build basic CRUD model in Budibase with planned database model. This was done without team planning to generate ideas ahead of time
 
Planning meeting took place and here is a copy of the planning notes: 
No code portion: Using a platform (node-red, appsheet, power apps, airtable, budibase, nocodb, n8n, or some other no code framework even like MS Access) to create a GUI for a basic CRUD database. Database needs to at least 3 CURD fields, link target, short code, and hits. The GUI will let authorized users create and update the link targets in between.
Low code portion: Simple portable program that will function as an HTTP server, will query from the no code datastore and return a redirect on a key match. Some sort of logic on the no code side hopefully that will update the hit counter when the query happens for that row. This could be written in any language but we prefer python. http.server module is in the python 3 standard library we think a simple API call like this will end up being less than 20 total code lines of python.
To get the HTTPS we will either use reverse proxy service via Cloudflare or set up Nginix Proxy Manager as a docker and have it pull Let's Encrypt certificates.
Additional low code ideas: We could have a program that will check all the links in the database periodically and turns them off if they do not return a 200 OK. That would catch 404s and redirects. Less sure we can accomplish this in a 'low code' format. Estimated that this program would be significantly bigger than the portable agent above.
A lot of no code stuff will not let us control headers or do re-directs, so we feel like a low code agent is needed and we can't build the the whole system in one no code platform and have to write a very small amount of code.
We look over the rules and determined that there are no specific guidelines on low vs no code. We decide that a microservice (very tiny program), less than 50 lines and 1 kilobyte, would both meet sprit of the challenge and challenge us to write efficient code. We also decide it would be unduly costly and burdensome to spin up a full server. In the sprit of the low code challenge we elect to use a serverless system. With a serverless function do not need to write any code to handle HTTP, SSL, or any other of the acronyms if our logic does not need it. Serverless uses a pre-build, reduced feature, low code platform that abstracts the most difficult parts away and let us focus only logic of our application.
-----------------
Oct 18: (2 hr) Test automated Budibase bots  for checking dead links and determined we cannot make external HTTP request unless REST, we plan to use one low code component to handle external HTTP GETs and incoming requests. 
(1hr) Create random URL short code generator using a reduced character set that excludes similar characters like o , O, and 0 and l, i, l, and 1. Thank you to Steve Gibson of GRC and Security Now! for the character set. We highly recommend their cybersecurity podcast, more information about the charset see: https://www.grc.com/ppp.htm
-----------------
Oct 19: (0 hr) Transferred work thus far from Budibase to Github and start README
-----------------
Oct 20 (2 hr) Selected Google as our cloud provider. Figured out google cloud functions does not have easy custom domains thus killing the dream of using it for “hi.gov” , rejected Google platform and ate this time learning Google Serverless 
-----------------
Oct 21: (2 hr) Selected Azure Functions as our serverless cloud provider. Determined Azure Free Tier must be hosted in us-central region (bad performance to Hawaii), that code sometimes runs on a Windows machine which can cause varied performance, and python on Linux for Azure Functions does not let you import basic modules like the python requests library, rejected Azure platform and ate this time learning Azure
-----------------
Oct 22: (4 hour) Selected Cloudflare Workers out of the available options due to cost and proximity with Cloudflare. Cloudflare is one of the few big internet companies directly invested in Hawaii. We support and applaud their efforts and deploy to Hawaii data centers. Azure and Google Cloud don’t have a physical presence in Hawaii. Cloudflare checks all the major boxes including multi-factor authentication and automated scaling of our workloads. 
Cost is extremely low, free covers most use cases and would be cheaper than Azure or Google. 100,000 request per day are free and 1.5 million request per month could cost less than $5 a month. 
-----------------
Oct 23: (0hr) Transfered work thus far from Cloudflare Workers to Github, complied CHANGELOG and committed
