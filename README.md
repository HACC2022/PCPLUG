# ![WikiWikiLink logo](https://github.com/HACC2022/PCPLUG/raw/main/WikiLogo.png)

**WikiWikiLink** is a secure low code URL link shortener for sensitive domain names such as .GOV, .MIL, and .EDU designed by Team PCPLUG. Built as a serverless application, there are no machines, dependencies, or servers to manage.  
  
***Wiki*** is the Hawaiian word for quick or fast, and **WikiWikiLink** aims to be the number one quick and fast link compressor that you can deploy in under 5 minutes!
  
## Live Test Deployment  
A live deployment can be accessed at the time of this commit. A [functional demonstration video](https://www.youtube.com/watch?v=1QGMOmCCHtM) is avaliable. The cost of this deployment is covered by free usage of Cloudflare Workers and Budibase.

For security reasons, credentials for the demo are by request.  
  
Link Manager (Budibase): [edit.hacc.ga/app/wikiwikilink](https://edit.hacc.ga/app/wikiwikilink)  
  
Cloudflare Workers: [dash.cloudflare.com](https://dash.cloudflare.com/)  
  
Redirecting Domain: [hacc.ga](https://hacc.ga/)  
  
Sample redirect to HACC22 Slack: https://hacc.ga/slack  
  
## ✨ Features
### Compress and Shorten URLs  
Take a long url like '`http://health.hawaii.gov/coronavirusdisease2019/current-situation-in-hawaii/`' and compress it to '[hacc.ga/covid](https://hacc.ga/covid)' using a secure low code dashboard. Track hits with a built in logging database that can be exported to CSV or JSON.  
  
### Built-in and Custom Automated Bots  
Smart automated robots ('**Bots**') are built into the application. When links are submitted or modified, they are automatically checked by a **Bot** which automatically protects users from bad links or errors. Other **Bots** notify administrators when links are deleted or go invalid. You can write your own automated **Bot** if none of ours fit your need.  
  
### Secure High Availability By Design  
WikiWikiLink utilizes a two part serverless design for security. The **Budibase** back-end low code platform to handle security and link management is paired with a low code **Cloudflare Worker** that is distributed and automatically scaled in datacenters around the globe. With **Budibase** it is easy to self-host and secure the application how you want it, while utilizing **Cloudflare Workers** global platform for high performance redirects.  
  
## Deployment  
Once these preconditions are met, deployment should take **less than 5 minutes.** Don't believe us? Watch our [functional demo video](https://www.youtube.com/watch?v=1QGMOmCCHtM) where we do the deployment!

Deployment is simple, you must signup for both **Budibase** and **Cloudflare Workers** code platform. You may choose to self-host **Budibase**, instructions for self-hosting are outside the scope of the document. We assume you have [created additional administrator users](https://docs.budibase.com/docs/adding-users) needed to control link shortening as well as [SMTP for Budibase](https://docs.budibase.com/docs/email) Bot emails.  
  
We also assume you have a domain registered for use and are familiar with DNS. (See "Preconditions" on Challenge). We chose Cloudflare for our DNS provider since we are using their Workers product, however you can use your own nameserver, other providers are out of the scope of this document  
   
  
1. Open your Budibase Builder and save the API key for your account.
2. Press **Create new app**, then press Import App and import the file [WikiWikiLink-Budibase.txt](https://github.com/HACC2022/PCPLUG/blob/main/WikiWikiLink-Budibase.txt "WikiWikiLink-Budibase.txt") with the name **WikiWikiLink**.  
3. Edit the new App in Budibase and retrieve the app ID, Links table ID, Tracking table ID. By clicking on each table in the **Data** tab you can see the IDs change in the url for example `https://edit.hacc.ga/builder/app/app_dev_731acc3a5d304eca904f5e326e69a669/data/table/ta_6bc0c2af92e94a6cb04c0a6d8ea9ee38` contains the app ID "**app_dev_731acc3a5d304eca904f5e326e69a669**" and table ID "**ta_6bc0c2af92e94a6cb04c0a6d8ea9ee38**"  
4. In the **Data** tab, select the Cloudflare Worker source for "**/check**" and set a new Bearer Token for security reasons. This token protects the Cloudflare Worker from abuse.  
5. Login to Cloudflare Workers and create a new Worker, the name and domain is irrelevant, just make sure to select **HTTP router** as your starter type.  
6. Press "Quick Edit" on your Worker and copy the contents of [CF-Worker-lowcode.js](https://github.com/HACC2022/PCPLUG/blob/main/CF-Worker-lowcode.js) to your Worker  
7. Edit Lines 11 to 19 in the Worker with the bearer token, API keys, and table IDs gathered in the previous steps. Remove "**_dev**" from the app ID when transferring the data, this will secure and complete the connection from Cloudflare to Budibase.  
8. Connect your Worker to a custom domain under Triggers and Custom Domains on your Worker Dashboard  
  
  
## How to use this application  
A user can request a new link directly from the Budibase app.  
  
1. New links start as unapproved and a **Bot** checks the link's validity, if the link is valid it's status will change from **New** to **OK** automatically. Any public user can request a link and a **Bot** will notify the administrator of a newly submitted link.  
2. Administrator must login to Budibase and mark the link as approved  
3. If the link is approved and the status is OK, the short code for that URL will start working. If a redirect or error with the link was detected, the status will not be **OK** and the administrator should test the link and review notes left by the **Bot**.  
4. If no associated shortcode exists, the Cloudflare Worker returns the message 'Not found, invalid shortcode' to the requesting user  
  
### Bots  
The following automated Bots are preloaded in the Automation tab on Budibase. Bots scan for link changes automatically. We have several notifications that include email and Slack.  
  
| Bot name | Function |  
|--|--|  
| Hourly Link Checking | Check the HTTP status of the oldest site every hour |  
| Check Link Button | Runs error checking on Link, when button pressed in App |  
| New Link Checker | Check status of newly submitted link, send admin message on Slack |  
| Modify Link Checker | Check status of modified links |  
| Delete Report | Send admin a message on Slack when link is deleted |  
| Daily Report | Send an email with all approved links with errors |  
  
  
## How we built it  

We spent about 40 hours collectively to build the app, a brief [timeline is avaliable](https://github.com/HACC2022/PCPLUG/blob/main/CHANGELOG.md).

The software used to build this app include:  
  
[Budibase Low Code Platform](https://github.com/Budibase/budibase)  
  
[Cloudflare Workers Platform](https://developers.cloudflare.com/fundamentals/api/licenses/)  
  
[base64](https://github.com/mathiasbynens/base64) javascript shim by [Matt Gauger](https://github.com/mathias)  
  
  
Budibase is one of the latest and best no code platform tools trusted by companies including P&G, Netflix, Louis Vuitton, Google, and Tesla. It provided both a database and admin control panel to help jump start development. We utilize the Budibase API for our Worker to access data within Budibase.  
  
Cloudflare is a global internet content delivery network provider. Cloudflare Workers is a code platform that abstracts acronyms like HTTPS and CORS away. Instead, we used simpler low code to develop our front end user application. Cloudflare also distributed our Worker to data centers across the world including Honolulu. **Our team applauds Cloudflare for the investment into our local economy and believes they are a good partner for Hawaii.**  
  
base64 is a small section of javascript that encodes URLs to be sent over the network with special characters. Budibase does not have any functions to base64 encode or decode data which was required for sending to Cloudflare. Luckily for our team this code was written already and we just reused it. Over 90% of all code inserted by us into Budibase is the encode and decode function from the library.  
  
## Inspiration  
**WikiWikiLink is dedicated to Taylor Swift and her new album *Midnights***  
  
Our team thanks her for the inspiration to keep coding through the midnight.  
  
WikiWikiLink draws inspiration from existing URL-shortening services like tinyurl.com and bit.ly. Our team evaluated these services come with limited security and are not flexible unless you pay for additional features. Traditionally to replace these services you would need new infrastructure with custom code that requires both lengthy development and security audits. We utilize low code platforms to cut down on both development time and reduce our attack surface.  
  
Color and style was loosely inspired by the State of Hawaii Web Style Guide: [styleguide.ehawaii.gov/themes/](https://styleguide.ehawaii.gov/themes/)  
  
  
## Challenges we ran into  
One of the major issues was finding a serverless low code platform to deploy that had all the features we wanted. First, we ruled out the leading tool, Amazon AWS Lambda platform, as they cost money and are not a challenge sponsor. We wasted one whole day deploying to Google's equivalent service called Cloud Functions, we built the app in Google but could not tie the hacc.ga example domain to it. We moved on to Azure since Microsoft sponsored the HACC, but quickly learned you cannot use external libraries like requests in their low code python system which would have made development harder. We finally found Cloudflare Workers which was an easier and faster platform for development. For a very brief timeline see: [CHANGELOG.md](https://github.com/HACC2022/PCPLUG/blob/main/CHANGELOG.md)  
  
With link shortcodes, if you use a random character set you will get character like O,o, and 0 that look the same. Charset selection is very important and we took inspiration from Steve Gibbson's Security Now! podcast and used his [set suggested of characters.](https://www.grc.com/ppp.htm) This stops us from autogenerating confusing links with i, L, l , I and 1.  
  
About halfway through the process, we discovered Budibase needed to encode data to transfer to Cloudflare. When the web is involved, data is usually encoded with a popular method being base64 encoding. Budibase had no native low code base64 functions. Our team panicked for two days until we rediscovered that there are small programs known as "shims" that are used to bring modern functions to older applications. We were able to find an open source base64 shim that would work in Budibase and the project was saved thanks to the shim.  
  

## Accomplishments and what we learned  
  
None of us have ever deployed a serverless application or used Cloudflare Workers before. Low code tooling is wonderful, we were able to use the various platforms to our advantage by reducing development time.  
  
## Who is Team PCPLUG ?
Team PCPLUG is comprised of volunteer gamers, we are not professional programmers. We all work for [PC PLUG HAWAII](https://pcplughi.com/), Hawaii's premier gaming computer builders. We built **WikiWikiLink** out of love for our home, Hawaii.

Lip Tran is a student at the University of Hawaii Manoa and brings the marketing and entrepreneurial knowledge he used to build PC PLUG HAWAII as our team's director and graphics consultant.

[Ross Higa](https://rosshiga.com/) studied Computer Engineering at the University of Hawaii Manoa and is a student at Western Governors University. He brings 15 years of IT service and Linux experience to our team as the sole developer.
  
## Thank you (Mahalo)

Vincent Hoang, State of Hawaii Chief Information Security Officer, for providing us the opportunity to work on this challenge.  

The country of [Gabon](http://www.my.ga/en/index.html?lang=en), for allowing us to register hacc.ga for free
  
[UH Manoa ICS Department](https://www.ics.hawaii.edu/) for supplying technical support to the HACC  
  
[PC PLUG HAWAII](https://pcplughi.com/) for encouraging our team to enter and providing a workspace  

[Nānā Ikehu](https://github.com/HACC2018/Nana-Ikehu), 2018 HACC Finalist Team who's experience helped pave the way for this year's entry
  
[Budibase](https://formidable.com/open-source/), especially Joe Johnston who reached out to our team and supported us as students  
  
[Matt Gauger](https://github.com/mathias) of Github, who does not know we exist but **Matt your base64 code saved our whole application!**  

And of course HACC Sponsors and the State of Hawaii for putting on this year's show!
