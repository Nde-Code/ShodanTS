import { ShodanClient } from "./mod.ts";

import { sanitizeKey } from "./utilities/satanize.ts";

// Create a .env file and add the line: SHODAN_KEY="<your_shodan_key>".
const API_KEY = Deno.env.get("SHODAN_KEY") ?? "";

const client: ShodanClient = new ShodanClient(API_KEY, 8000);

const delayInt: number = 3000; // Keep it above 1000 to avoid hitting Shodan API rate limits.

function delay(ms: number): Promise<unknown> { return new Promise((resolve) => setTimeout(resolve, ms)); }

async function runTests() {

	console.log("=== ShodanClient Test Suite: ===");

	try {

		console.log("[1] searchHostWithIP:");

		const ipInfo = await client.searchHostWithIP("8.8.8.8", {

			minify: true,

			history: false

		});

		console.log(ipInfo);
		await delay(delayInt);

		console.log("[2] countHostsWithQuery:");

		const count = await client.countHostsWithQuery("port:22", {

			facets: "country:2"

		});

		console.log(count);
		await delay(delayInt);

		console.log("[3] searchHostsWithQuery:");

		const hosts = await client.searchHostsWithQuery("apache country:DE", {

			facets: "org",

			page: 1,

			minify: true
		});

		console.log(hosts);
		await delay(delayInt);

		console.log("[4] getSearchFacets:");

		const facets = await client.getSearchFacets();

		console.log(facets);
		await delay(delayInt);

		console.log("[5] getSearchTokens:");

		const tokens = await client.getSearchTokens("Raspbian port:22");

		console.log(tokens);
		await delay(delayInt);

		console.log("[6] getPorts:");

		const ports = await client.getPorts();
		console.log(ports);

		await delay(delayInt);

		console.log("[7] getProtocols:");

		const protocols = await client.getProtocols();

		console.log(protocols);
		await delay(delayInt);

		console.log("[8] submitScanRequest:");

		const scanRequest = await client.submitScanRequest({

			ips: {

				"1.1.1.1": [[53, "dns-udp"], [443, "https"]],

				"8.8.8.8/24": [[443, "https"]]

			}

		});

		console.log(scanRequest);
		await delay(delayInt);

		console.log("[9] getSavedSearchQueries:");

		const savedQueries = await client.getSavedSearchQueries({

			page: 1,

			sort: "votes",

			order: "desc"

		});

		console.log(savedQueries);
		await delay(delayInt);

		console.log("[10] getDirectoryWithSavedSearchQueries:");

		const directory = await client.getDirectoryWithSavedSearchQueries(

			"country:US",

			{ page: 1 }

		);

		console.log(directory);
		await delay(delayInt);

		console.log("[11] getSavedSearchQueryTags:");

		const tags = await client.getSavedSearchQueryTags({ size: 5 });

		console.log(tags);
		await delay(delayInt);

		console.log("[12] getAccountProfile:");

		const profile = await client.getAccountProfile();

		console.log(profile);
		await delay(delayInt);

		console.log("[13] getDNSRecords:");

		const dnsRecords = await client.getDNSRecords("google.com", {

			history: false,

			type: "CNAME",

			page: 1

		});

		console.log(dnsRecords);
		await delay(delayInt);

		console.log("[14] DNSLookup:");

		const dnsLookup = await client.DNSLookup("google.com,shodan.io");

		console.log(dnsLookup);
		await delay(delayInt);

		console.log("[15] reverseDNSLookup:");

		const reverseDNS = await client.reverseDNSLookup("8.8.8.8,1.1.1.1");

		console.log(reverseDNS);
		await delay(delayInt);

		console.log("[16] getHTTPHeaders:");

		const headers = await client.getHTTPHeaders();

		console.log(headers);
		await delay(delayInt);

		console.log("[17] getMyIP:");

		const myIP = await client.getMyIP();

		console.log(myIP);
		await delay(delayInt);

		console.log("[18] getAPIPlanInformation:");

		const plan = await client.getAPIPlanInformation();

		console.log(plan);
		await delay(delayInt);

		console.log("=== All tests completed successfully ! ===");

	} catch (error) {
  		
		console.error("Error:", sanitizeKey(error instanceof Error ? error.message : String(error)));

		console.warn("If you encounter any problems, please open an issue at: https://github.com/Nde-Code/ShodanTS/issues");

	}

}

runTests();