# First of all:

Make sure you have correctly imported the client into your project (check the `README.md`).

Then, you can create the main object like this:

```js
const shodanAPIClient = new shodanClient("API_Key");
```

- Make sure you have a valid API key in your Shodan account, and be careful when using it. Always be ready to revoke and regenerate your key if it's compromised.

This client allows you to set a custom timeout for HTTP requests. By default, it's set to **5 seconds**, but you can override it like this:

```js
const shodanAPIClient = new shodanClient("API_Key", 8000 /* ms */);
```

- Some requests can take longer to process, so increasing the timeout can be helpful instead of relying on an unlimited request duration.

# Next, look at the supported methods:

## [GET] `searchHostIP<T>(ip, { minify, history }?)` – Retrieve information about an IP address:

This method is used to retrieve information about a specific IP address.

### Parameters:

- `ip` [`string`]: the IP address you want to retrieve information about.

- `minify` (optional) [`boolean`]: if `true`, returns a simplified version of the data. (default: false)

- `history` (optional) [`boolean`]: if `true`, includes historical data related to the IP. (default: false)

### Sample:
```js
// With type and options:
// Options typed via: ipSearchOptionsType
const searchHostIPMethod = await shodanAPIClient.searchHostIP<YourType>("8.8.8.8", { minify: true, history: false });

// Quick call without options:
const searchHostIPMethodJSON = await shodanAPIClient.searchHostIP("8.8.8.8", { minify: true, history: false });
console.log(searchHostIPMethodJSON);
```

### Be careful: the client throws an error if the IP address isn’t in a valid IPv4 or IPv6 format !

## [GET] `searchHostCount<T>(query, { facets }?)` – Retrieve the count of services found:

This method is used to **count** (and only count) the number of devices found using a query.  

### Parameters:

- `query` [`string`]: a query string (e.g., `country:"US"`, `port:"22"`) used to search Shodan's banner database.

- `facets` (optional) [`string`]: used to specify the result response.

### Sample:
```js
// With type and options:
// Options typed via: countSearchOptionsType
const searchHostCountMethod = await shodanAPIClient.searchHostCount<YourType>('port:22', { facets: 'country:2' })

// Or for JSON:
const searchHostCountMethodJSON = await shodanAPIClient.searchHostCount('port:22', { facets: 'country:2' })
console.log(searchHostCountMethodJSON);
```

## [GET] `searchHostResearch<T>(query, { facets, page, minify }?)` – Search Shodan's host database:

This method allows you to search Shodan’s host (banner) database using a custom query, similar to how searches work on the Shodan website.

### Parameters:

- `query` [`string`]: a query string (e.g., `country:"US"`, `port:"22"`) used to search Shodan's banner database.

- `facets` (optional) [`string`]: used to specify the result response.

- `page` (optional) [`number`]: the page number of the results to return. (default: 1)

- `minify` (optional) [`boolean`]: if `true`, returns a simplified version of the data. (default: true)

### Sample:
```js
// With type and options:
// Options typed via: searchOptionsType:
const searchHostSearchMethod = await shodanAPIClient.searchHostResearch<yourType>("apache country:DE", { facets: "org", page: 3, minify: true });

// Or for JSON:
const searchHostSearchMethodJSON = await shodanAPIClient.searchHostResearch("apache country:DE", { facets: "org", page: 3, minify: true});
console.log(searchHostSearchMethodJSON);
```

## [GET] `getSearchFacets<T>()` - Retrieve available search facets from Shodan's database:

This method helps you retrieve the available Shodan facets for searching.

### Parameters:
None

### Sample:
```js
const getFacetsMethod = await shodanAPIClient.getSearchFacets<yourType>();

// Or for JSON:
const getFacetsMethodJSON = await shodanAPIClient.getSearchFacets();
console.log(getFacetsMethodJSON)
```

## [GET] `getSearchFilters<T>()` - Retrieve available search filters from Shodan's database:

This method helps you retrieve the available Shodan filters for searching.

### Parameters:
None

### Sample:
```js
const getFiltersMethod = await shodanAPIClient.getSearchFilters<yourType>();

// Or for JSON:
const getFiltersMethodJSON = await shodanAPIClient.getSearchFilters();
console.log(getFiltersMethodJSON)
```

## [GET] `getSearchTokens<T>(query)` - Retrieve a lexed JSON of the filters you've written:

This method helps you retrieve the parsed filters you've written.

### Parameters:

- `query` [`string`]: a query string (e.g., `country:"US"`, `port:"22"`) used to search Shodan's banner database.

### Sample:
```js
const getTokensMethod = await shodanAPIClient.getSearchTokens<yourType>("Raspbian port:22")

// Or for JSON:
const getTokensMethodJSON = await shodanAPIClient.getSearchTokens("Raspbian port:22")
console.log(getTokensMethodJSON)
```

## [GET] `getPorts<T>()` – Retrieve available ports from Shodan's database:

This method retrieves the list of ports available in Shodan's database.

### Parameters:
None

### Sample:
```js
const getPortsMethod = await shodanAPIClient.getPorts<yourType>();

// Or for JSON:
const getPortsMethodJSON = await shodanAPIClient.getPorts();
console.log(getPortsMethodJSON);
```

## [GET] `getProtocols<T>()` – Retrieve available protocols from Shodan's database:

This method retrieves the list of protocols available in Shodan's database.

### Parameters:
None

### Sample:
```js
const getProtocolsMethod = await shodanAPIClient.getProtocols<yourType>();

// Or for JSON:
const getProtocolsMethodJSON = await shodanAPIClient.getProtocols();
console.log(getProtocolsMethodJSON);
```

## [POST] `scanIps<T>(body)` – Submit a scan request to Shodan:

This method allows you to submit a scan request to Shodan, specifying which IPs and services should be crawled.

### Parameters:

- `body` [JSON] with:

  - `ips` [`Record<string, [number, string][]>`]: an object where each key is an IP address (or CIDR range) and the value is a list of `[port, protocol]` tuples representing the services to be scanned.

### Sample:
```ts
import type { postShodanRequestBodyType } from "https://raw.githubusercontent.com/Nde-Code/ShodanTS/v2.0.1/mod.ts";

const bodyJSON: postShodanRequestBodyType = {

  ips: {

    "1.1.1.1": [

      [53, "dns-udp"],

      [443, "https"]

    ],

    "8.8.8.8/24": [

      [443, "https"]

    ]

  }

};

const scanIpsMethod = await shodanAPIClient.scanIps<yourType>(bodyJSON);

// Or for JSON:
const scanIpsMethodJSON = await shodanAPIClient.scanIps(bodyJSON);
console.log(scanIpsMethodJSON);
```

### Be careful: the client throws an error if IPs (CIDR) aren’t in a valid format !

## [GET] `getScans<T>()` – Retrieve the list of current scans:

This method retrieves the list of scans you are currently running.

### Parameters:
None

### Sample:
```js
const getListOfScans = await shodanAPIClient.getScans<yourType>();

// Or for JSON:
const getListOfScansJSON = await shodanAPIClient.getScans();
console.log(getListOfScansJSON);
```

## [GET] `getScanById<T>(id)` – Retrieve a scan by ID:

This method retrieves the details of a specific scan using its ID.

### Parameters:

- `id` [`string`]: the ID of the scan you want to retrieve.

### Sample:
```js
const getScanFromId = await shodanAPIClient.getScanById<yourType>("Scan ID");

// Or for JSON:
const getScanFromIdJSON = await shodanAPIClient.getScanById("Scan ID");
console.log(getScanFromIdJSON);
```

## [GET] `getSavedSearchQueries<T>({ page, sort?, order? }?)` – Retrieve a list of saved search queries:

This method helps you retrieve the list of search queries that users have saved in Shodan's database.

### Parameters

- `page` (optional) [`number`]: the page number of results to return. Each page contains 10 items. (default: 1)

- `sort` (optional) [`string`]: the field to sort the results by. Allowed values: `votes`, `timestamp`. This option is not required if other parameters are specified in the options object.

- `order` (optional) [`string`]: the order in which results are returned. Allowed values: `asc`, `desc`. This option is not required if other parameters are specified in the options object.

### Sample

```ts
// With type and options:
// Options typed via: savedSearchQueryOptionsType:
const getSavedSearchQueriesMethod = await shodanClientApi.getSavedSearchQueries<yourType>({ page: 3, sort: "votes", order: "desc" }); 

// Or for JSON:
const getSavedSearchQueriesMethodJSON = await shodanClientApi.getSavedSearchQueries({ page: 3, sort: "votes", order: "desc" });
console.log(getSavedSearchQueriesMethodJSON)
```

## [GET] `getDirectoryWithSavedSearchQueries<T>(query, { page }?)` – Retrieve the directory of saved search queries:

This method helps you search through the directory of search queries saved by users in Shodan's database.

### Parameters

- `query` [`string`]: a search query string (e.g., `country:"US"`, `port:"22"`) used to search Shodan's banner database.

- `page` (optional) [`number`]: the page number of results to return. Each page contains 10 items.

### Sample

```ts
// With type and options:
// Options typed via: directoryWithSavedSearchQueriesOptionsType:
const directoryWithSavedSearchQueriesMethod = await shodanClientApi.getDirectoryWithSavedSearchQueries<yourType>("country:US", { page: 3 });

// Or for JSON: 
const directoryWithSavedSearchQueriesMethodJSON = await shodanClientApi.getDirectoryWithSavedSearchQueries("country:US", { page: 3 });
console.log(directoryWithSavedSearchQueriesMethodJSON)
```

## [GET] `getTagsOfSavedSearchQueries<T>({ size }?)` – Retrieve popular tags from saved search queries:

This method helps you retrieve the most frequently used tags in saved search queries.

### Parameters

- `size` (optional) [`number`]: the number of tags to return. Defaults to 10 if not specified.

### Sample

```ts
// With type and options:
// Options typed via: tagsOfSavedSearchQueriesOptionsType:
const getTagsFromSavedQueriesMethod = await shodanClientApi.getTagsOfSavedSearchQueries<yourType>({ size: 5 }); 

// Or for JSON:
const getTagsFromSavedQueriesMethodJSON = await shodanClientApi.getTagsOfSavedSearchQueries({ size: 5 });
console.log(getTagsFromSavedQueriesMethodJSON);
```

## [GET] `getAccountProfile<T>()` – Retrieve information about the account associated with your API key:

This method allows you to retrieve details about the account linked to your API key.

### Parameters

None.

### Sample

```ts
const getAccountProfileMethod = await shodanClientApi.getAccountProfile<yourType>();

// Or for JSON:
const getAccountProfileMethodJSON = await shodanClientApi.getAccountProfile();
console.log(getAccountProfileMethodJSON)
```

## [GET] `getAllDNSFromADomain<T>(domain, { history, type?, page }?)` – Retrieve subdomains and other DNS records for a domain:

This method retrieves subdomains and other DNS records associated with the specified domain.

**Uses 1 query credit per lookup.**

### Parameters

- `domain` [`string`]: the domain name to look up (e.g., `google.com`).

- `history` (optional) [`boolean`]: if `true`, includes historical DNS data. (default: false)

- `type` (optional) [`string`]: the DNS record type to filter results. Allowed values: `A`, `AAAA`, `CNAME`, `NS`, `SOA`, `MX`, `TXT`. This option is not required if other parameters are specified in the options object.

- `page` (optional) [`number`]: the page number of results to retrieve. One page = 100 results. (default: 1)

### Sample

```ts
const getAllDNSFromADomainMethod = await shodanClientApi.getAllDNSFromADomain<yourType>("google.com", { history: false, type: "CNAME", page: 1 });

// Or for JSON:
const getAllDNSFromADomainMethodJSON = await shodanClientApi.getAllDNSFromADomain("google.com", { history: false, type: "CNAME", page: 1 });
console.log(getAllDNSFromADomainMethodJSON)
```

### Be careful: the client throws an error if the domain isn’t in a valid format !

## [GET] `DNSLookup<T>(hostnames)` – Retrieve the IP address(es) for a list of domains:

This method retrieves the IPv4 or IPv6 address(es) associated with one or more domain names.

### Parameters

- `hostnames` [`string`]: a comma-separated list of domain names (e.g., `google.com,shodan.io`).

### Sample

```ts
const DNSLookupMethod = await shodanClientApi.DNSLookup<yourType>("google.com,shodan.io");

// Or for JSON:
const DNSLookupMethodJSON = await shodanClientApi.DNSLookup("google.com,shodan.io");
console.log(DNSLookupMethodJSON)
```

### Be careful: the client throws an error if the list of domains (or a single domain) isn’t in a valid format. 

## [GET] `reverseDNSLookup<T>(ips)` – Retrieve domain(s) associated with a list of IP addresses:

This method performs a reverse DNS lookup to retrieve domain names associated with a list of IP addresses.

### Parameters

- `ips` [`string`]: a comma-separated list of IP addresses (e.g., `8.8.8.8,1.1.1.1`).

### Sample

```ts
const reverseDNSLookupMethod = await shodanClientApi.reverseDNSLookup<yourType>("8.8.8.8,1.1.1.1");

// Or for JSON:
const reverseDNSLookupMethodJSON = await shodanClientApi.reverseDNSLookup("8.8.8.8,1.1.1.1");
console.log(reverseDNSLookupMethodJSON)
```

### Be careful: the client throws an error if the IP list (or a single IP) isn’t in a valid format.

## [GET] `getHTTPHeaders<T>()` – Retrieve HTTP headers sent by the client to a web server:

This method allows you to retrieve the HTTP headers that the client sends to a web server.

### Parameters

None.

### Sample

```ts
const getHTTPHeadersMethod = await shodanClientApi.getHTTPHeaders<yourType>();

// Or for JSON:
const getHTTPHeadersMethodJSON = await shodanClientApi.getHTTPHeaders();
console.log(getHTTPHeadersMethodJSON);
```

## [GET] `getMyIP<T>()` – Retrieve your public IP address:

This method allows you to retrieve your current public IP address.

### Parameters

None.

### Sample

```ts
const getMyIPMethod = await shodanClientApi.getMyIP<yourType>();

// Or for JSON:
const getMyIPMethodJSON = await shodanClientApi.getMyIP();
console.log(getMyIPMethodJSON)
```

## [GET] `getAPIPlanInformation<T>()` – Retrieve details about your API plan:

This method allows you to retrieve information about your API plan, usage limits, and more.

### Parameters

None.

### Sample

```ts
const getAPIPlanInformationMethod = await shodanClientApi.getAPIPlanInformation<yourType>();

// Or for JSON:
const getAPIPlanInformationMethodJSON = await shodanClientApi.getAPIPlanInformation();
console.log(getAPIPlanInformationMethodJSON)
```

## Types of responses:

All methods return a **Promise** resolving to a JSON response typed as the generic `T` or `unknown`, except for `getMyIP<T>()`, which returns plain text with your IP address.


> This client doesn’t implement specific types for each response to avoid conflicts with the varying Shodan API formats, but it now supports generics, allowing you to retrieve data as `unknown` or as a custom type based on your needs.

> Make sure to use `await` when calling these methods to properly handle the returned data.

## Error Handling:

Shodan API returns a JSON object explaining why the request failed:

```json
{
  "error": "Reason why this error happened."
}
```

See [Shodan API](https://developer.shodan.io/api) for details about error handling.

**Make sure to follow best practices when using this client, such as wrapping each call in a `try/catch` block.**
