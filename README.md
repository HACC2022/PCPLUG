# WikiWikiLink 
**WikiWikiLink** is a secure low code URL link shorten for sensitive domain names such as .GOV, .MIL, and .EDU. ***Wiki*** is the Hawaiian word for quick or fast, and **WikiWikiLink** aims to be the number one quick-fast link compressor. 

## Live Test Deployment 
A live deployment can be access at the time of this commit. For security reasons, [credentials for this application demo are provided here](https://cl1p.net/uqzrcoawcreek) and may expire after 30 days.

Link Manager (Budibase): [edit.hacc.ga/app/wikiwikilink](https://edit.hacc.ga/app/wikiwikilink)

Redirecting Domain: [hacc.ga](https://hacc.ga/)

Sample redirect to HACC22 Slack: https://hacc.ga/slack

## ✨ Features
### Compress and Shorten URLs 
Take a long url like 'health.hawaii.gov/coronavirusdisease2019/current-situation-in-hawaii/' and compress it to 'hacc.ga/covid' using a secure low code dashboard. Track hits with a built in logging database that can be exported to CSV or JSON.

### Built-in and Custom Automated Bots 
Smart automated robots ('**Bots**') are built into the application. When links are submitted or modified, they are automatically checked by a **Bot** which automatically protect users from bad links or errors. Other **Bots** notify administrators when links are deleted or go invalid. You can write your own automated **Bot** if none of ours fit your need. 

###  Secure High Availability By Design
WikiWikiLink utilizes a two part design for security. The **Budibase** back-end low code platform to handle security and link management is paired with a low code **Cloudflare Worker** that is distributed and automatically scaled in datacenters around the globe. With **Budibase** it is easy to self-host and secure the application how you want it, while utilizing **Cloudflare Workers** global platform for high performance redirects. 

## Deployment
Deployment is simple, you must signup for both **Budibase** and **Cloudflare Workers** code platform. You may choose to self-host **Budibase**, instructions for self-hosting are outside the scope of the document. We assume you have [created additional administrator users](https://docs.budibase.com/docs/adding-users) needed to control link shortening as well as [SMTP for Budibase](https://docs.budibase.com/docs/email) Bot emails. 

We also assume you have a domain registered for use and are familiar with DNS. (See "Preconditions" on Challenge). We chose Cloudflare for our DNS provider since we are using their Workers product, however you can use your own nameserver, other provider are out of the scope of this document

Once those preconditions are met, deployment should take **less than 5 minutes.**

 1. Open your Budibase Builder and save the API key for your account.![enter image description here](https://files.readme.io/7b29204-Capture.PNG)![enter image description here](https://files.readme.io/5ddaa4f-Capture.PNG)
 2. Press **Create new app**, then press Import App and import the file [WikiWikiLink-Budibase.txt](https://github.com/HACC2022/PCPLUG/blob/main/WikiWikiLink-Budibase.txt "WikiWikiLink-Budibase.txt") with the name **WikiWikiLink**.
 3. Edit the new App in Budibase and retrieve the app ID, Links table ID, Tracking table ID. By clicking on each table in the **Data** tab you can see the IDs change in the url for example `https://edit.hacc.ga/builder/app/app_dev_731acc3a5d304eca904f5e326e69a669/data/table/ta_6bc0c2af92e94a6cb04c0a6d8ea9ee38` contains the app ID "**app_dev_731acc3a5d304eca904f5e326e69a669**" and table ID "**ta_6bc0c2af92e94a6cb04c0a6d8ea9ee38**"
 4. In the **Data** tab, select the Cloudflare Worker source for "**/check**" and set a new Bearer Token for security reason. This token protects the Cloudflare Worker from abuse.
 5. Login to Cloudflare Workers and create a new Worker, the name and domain is irrelevant, just make sure to select **HTTP router** as your starter type.
 6. Press "Quick Edit" on your Worker and copy the contents of [CF-Worker-lowcode.js](https://github.com/HACC2022/PCPLUG/blob/main/CF-Worker-lowcode.js) to your Worker
 7. Edit Lines 11 to 19 in the Worker with the bearer token, API keys, and table IDs gathered in the previous steps. This will secure and complete the connection from Cloudflare to Budibase.
 8. Connect your Worker to a custom domain under Triggers and Custom Domains on your Worker Dashboard
 

## How to use this application 
A user can request a new link directly from the Budibase app. 

 1. New links start as unapproved and a **Bot** checks the links validity, if the the link is valid it's status will change from **New** to **OK** automatically. Any public user can request a link and a **Bot** will notify the administrator of a newly submitted link.
 2. Administrator must login to Budibase and mark the link as approved
 3. If the link is approved and status is OK, the short code for that URL will start working. If a redirect or error with the link was detected, the status will not be **OK** and the administrator should test the link and review notes left by the **Bot**.
 4. If no associated shortcode exist, the Cloudflare Worker returns the message 'Not found, invalid shortcode' to the requesting user

## How we built it
The software used to build this app include:

[Budibase Low Code Platform](https://github.com/Budibase/budibase) (Platform EULA, self host GPLv3)

[Cloudflare Workers Platform](https://developers.cloudflare.com/fundamentals/api/licenses/) (Platform EULA, sample code MIT, documentation  CC-BY-SA 4.0)

[base64](https://github.com/mathiasbynens/base64) by @mathias (MIT)


Budibase is one of the latest and best no code platform tools trusted by companies including P&G, Netflix, Louis Vuitton, Google, and Tesla. It provided both a database and admin control panel

Cloudflare is a global internet content delivery network provider. Workers is a code platform that abstracts acronyms like HTTPS and CORS away. Instead we used simpler low code to develop our front end. Cloudflare also distributed our Worker to data centers across the world including Honolulu. **We applaud Cloudflare for the investment into our local economy and believe they are a good partner for Hawaii.**

base64 is a small section of javascript that encodes URLs to be sent over the network with special characters. Budibase does not have any functions to base64 encode or decode data which was required for sending to Cloudflare.


## Inspiration
WikiWikiLink draws inspiration from existing URL shortening services like tinyurl.com and bit.ly. Our team knows that these services come with limited security and are not flexible unless you pay for additional packages. Traditionally to replace these services you would need new infrastructure with custom code that requires both lengthy development and security audits. We utilize low code platforms to cut down on both development time and reduce our attack surface.

**WikiWikiLink is dedicated to Taylor Swift and her new album *Midnights***

Our team thanks her for the inspiration to keep coding through the midnight. 


## Challenges we ran into

## Accomplishments that we're proud of

## What we learned

## What's next for PCPLUG
