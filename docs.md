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

# Now you can look at the supported methods:

## [GET] `searchHostIP(ip, minify?, history?)` – Retrieve information about an IP address:

This method is used to retrieve information about a specific IP address.

### Parameters:

- `ip` [`string`]: the IP address you want to retrieve information about.
- `minify` (optional) [`boolean`]: if `true`, returns a simplified version of the data. (default: false)
- `history` (optional) [`boolean`]: if `true`, includes historical data related to the IP. (default: false)

### Sample:
```js
const searchHostIPMethod = await shodanAPIClient.searchHostIP("8.8.8.8", true, false);

// or const searchHostIPMethod = await shodanAPIClient.searchHostIP("8.8.8.8"); if no options required.

console.log(searchHostIPMethod);
```

### Be careful: the client throws an error if the IP address isn’t in a valid IPv4 or IPv6 format !

## [GET] `searchHostCount(query, facets?)` – Retrieve the count of services found:

This method is used to **count** (and only count) the number of devices found using a query.  

### Parameters:

- `query` [`string`]: a query string (e.g., `country:"US"`, `port:"22"`) used to search Shodan's banner database.
- `facets` (optional) [`string`]: used to specify the result response.

### Sample:
```js
const searchHostCountMethod = await shodanAPIClient.searchHostCount('port:22', 'country:2')

// or const searchHostCountMethod = await shodanAPIClient.searchHostCount('port:22'); if no options required.

console.log(searchHostCountMethod)
```

## [GET] `searchHostResearch(query, facets?, page?, minify?)` – Search Shodan's host database:

This method allows you to search Shodan’s host (banner) database using a custom query, similar to how searches work on the Shodan website.

### Parameters:

- `query` [`string`]: a query string (e.g., `country:"US"`, `port:"22"`) used to search Shodan's banner database.
- `facets` (optional) [`string`]: used to specify the result response.
- `page` (optional) [`number`]: the page number of the results to return. (default: 1)
- `minify` (optional) [`boolean`]: if `true`, returns a simplified version of the data. (default: true)

### Sample:
```js
const searchHostSearchMethod = await shodanAPIClient.searchHostResearch("apache country:DE", "org", 3, true);

// or const searchHostSearchMethod = await shodanAPIClient.searchHostResearch("apache country:US"); if no options required.

console.log(searchHostSearchMethod);
```

## [GET] `getSearchFacets()` - Retrieve available search facets from Shodan's database:

This method helps you retrieve the available Shodan facets for searching.

### Parameters:
None

### Sample:
```js
const getFacetsMethod = await shodanAPIClient.getSearchFacets();

console.log(getFacetsMethod);
```

## [GET] `getSearchFilters()` - Retrieve available search filters from Shodan's database:

This method helps you retrieve the available Shodan filters for searching.

### Parameters:
None

### Sample:
```js
const getFiltersMethod = await shodanAPIClient.getSearchFilters();

console.log(getFiltersMethod);
```

## [GET] `getSearchTokens(query)` - Retrieve a lexed JSON of the filters you've written:

This method helps you retrieve the parsed filters you've written.

### Parameters:

- `query` [`string`]: a query string (e.g., `country:"US"`, `port:"22"`) used to search Shodan's banner database.

### Sample:
```js
const getTokensMethod = await shodanAPIClient.getSearchTokens("Raspbian port:22")

console.log(getTokensMethod);
```

## [GET] `getPorts()` – Retrieve available ports from Shodan's database:

This method retrieves the list of ports available in Shodan's database.

### Parameters:
None

### Sample:
```js
const getPortsMethod = await shodanAPIClient.getPorts();

console.log(getPortsMethod)
```

## [GET] `getProtocols()` – Retrieve available protocols from Shodan's database:

This method retrieves the list of protocols available in Shodan's database.

### Parameters:
None

### Sample:
```js
const getProtocolsMethod = await shodanAPIClient.getProtocols();

console.log(getProtocolsMethod);
```

## [POST] `scanIps(body)` – Submit a scan request to Shodan:

This method allows you to submit a scan request to Shodan, specifying which IPs and services should be crawled.

### Parameters:

- `body` [JSON] with:
  - `ips` [`Record<string, [number, string][]>`]: an object where each key is an IP address (or CIDR range) and the value is a list of `[port, protocol]` tuples representing the services to be scanned.

### Sample:
```ts
type ShodanRequestBody = {

  ips: Record<string, [number, string][]>;

};

const bodyJSON: ShodanRequestBody = {

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

const scanIpsMethod = await shodanAPIClient.scanIps(bodyJSON);

console.log(scanIpsMethod);
```

### Be careful: the client throws an error if IPs (CIDR) aren’t in a valid format !

## [GET] `getScans()` – Retrieve the list of current scans:

This method retrieves the list of scans you are currently running.

### Parameters:
None

### Sample:
```js
const getListOfScans = await shodanAPIClient.getScans();

console.log(getListOfScans)
```

## [GET] `getScanById(id)` – Retrieve a scan by ID:

This method retrieves the details of a specific scan using its ID.

### Parameters:

- `id` [`string`]: the ID of the scan you want to retrieve.

### Sample:
```js
const getScanFromId = await shodanAPIClient.getScanById("Scan ID");

console.log(getScanFromId);
```
## [GET] `getSavedSearchQueries(page?, sort?, order?)` – Retrieve a list of saved search queries:

This method helps you retrieve the list of search queries that users have saved in Shodan's database.

### Parameters

- `page` (optional) [`number`]: the page number of results to return. Each page contains 10 items.
- `sort` (optional) [`string`]: the field to sort the results by. Allowed values: `votes`, `timestamp`.
- `order` (optional) [`string`]: the order in which results are returned. Allowed values: `asc`, `desc`.

### Sample

```ts
const getSavedSearchQueriesMethod = await shodanClientApi.getSavedSearchQueries();

// const getSavedSearchQueriesMethod = await shodanClientApi.getSavedSearchQueries(3, "votes", "desc"); if options needed.

console.log(getSavedSearchQueriesMethod);
```

## [GET] `getDirectoryWithSavedSearchQueries(query, page?)` – Retrieve the directory of saved search queries:

This method helps you search through the directory of search queries saved by users in Shodan's database.

### Parameters

- `query` [`string`]: a search query string (e.g., `country:"US"`, `port:"22"`) used to search Shodan's banner database.
- `page` (optional) [`number`]: the page number of results to return. Each page contains 10 items.

### Sample

```ts
const directoryWithSavedSearchQueriesMethod = await shodanClientApi.getDirectoryWithSavedSearchQueries("country:US");

// Or const directoryWithSavedSearchQueriesMethod = await shodanClientApi.getDirectoryWithSavedSearchQueries("country:US", 3); if you need more pages.

console.log(directoryWithSavedSearchQueriesMethod);
```

## [GET] `getTagsOfSavedSearchQueries(size?)` – Retrieve popular tags from saved search queries:

This method helps you retrieve the most frequently used tags in saved search queries.

### Parameters

- `size` (optional) [`number`]: the number of tags to return. Defaults to 10 if not specified.

### Sample

```ts
const getTagsFromSavedQueriesMethod = await shodanClientApi.getTagsOfSavedSearchQueries();

// Or const getTagsFromSavedQueriesMethod = await shodanClientApi.getTagsOfSavedSearchQueries(5); if you need a size.

console.log(getTagsFromSavedQueriesMethod);
```

## [GET] `getAccountProfile()` – Retrieve information about the account associated with your API key:

This method allows you to retrieve details about the account linked to your API key.

### Parameters

None.

### Sample

```ts
const getAccountProfileMethod = await shodanClientApi.getAccountProfile();

console.log(getAccountProfileMethod);
```


## [GET] `getAllDNSFromADomain(domain, history?, type?, page?)` – Retrieve subdomains and other DNS records for a domain:

This method retrieves subdomains and other DNS records associated with the specified domain.

**Uses 1 query credit per lookup.**

### Parameters

- `domain` [`string`]: the domain name to look up (e.g., `google.com`).
- `history` (optional) [`boolean`]: if `true`, includes historical DNS data. Default is `false`.
- `type` (optional) [`string`]: the DNS record type to filter results. Allowed values: `A`, `AAAA`, `CNAME`, `NS`, `SOA`, `MX`, `TXT`.
- `page` (optional) [`number`]: the page number of results to retrieve. One page = 100 results. Defaults to `1` if not specified.

### Sample

```ts
const getAllDNSFromADomainMethod = await shodanClientApi.getAllDNSFromADomain("google.com", false, "CNAME", 1);

/* Or, if no options are needed:
const getAllDNSFromADomainMethod = await shodanClientApi.getAllDNSFromADomain("google.com"); */

console.log(getAllDNSFromADomainMethod);
```

### Be careful: the client throws an error if the domain isn’t in a valid format !

## [GET] `DNSLookup(hostnames)` – Retrieve the IP address(es) for a list of domains:

This method retrieves the IPv4 or IPv6 address(es) associated with one or more domain names.

### Parameters

- `hostnames` [`string`]: a comma-separated list of domain names (e.g., `google.com,shodan.io`).

### Sample

```ts
const DNSLookupMethod = await shodanClientApi.DNSLookup("google.com,shodan.io");

console.log(DNSLookupMethod);
```

### Be careful: the client throws an error if the list of domains (or a single domain) isn’t in a valid format. 

## [GET] `reverseDNSLookup(ips)` – Retrieve domain(s) associated with a list of IP addresses:

This method performs a reverse DNS lookup to retrieve domain names associated with a list of IP addresses.

### Parameters

- `ips` [`string`]: a comma-separated list of IP addresses (e.g., `8.8.8.8,1.1.1.1`).

### Sample

```ts
const reverseDNSLookupMethod = await shodanClientApi.reverseDNSLookup("8.8.8.8,1.1.1.1");

console.log(reverseDNSLookupMethod);
```

### Be careful: the client throws an error if the IP list (or a single IP) isn’t in a valid format.

## [GET] `getHTTPHeaders()` – Retrieve HTTP headers sent by the client to a web server:

This method allows you to retrieve the HTTP headers that the client sends to a web server.

### Parameters

None.

### Sample

```ts
const getHTTPHeadersMethod = await shodanClientApi.getHTTPHeaders();

console.log(getHTTPHeadersMethod);
```

## [GET] `getMyIP()` – Retrieve your public IP address:

This method allows you to retrieve your current public IP address.

### Parameters

None.

### Sample

```ts
const getMyIPMethod = await shodanClientApi.getMyIP();

console.log(getMyIPMethod);
// You just got your IP address! No JSON object returned.
```

## [GET] `getAPIPlanInformation()` – Retrieve details about your API plan:

This method allows you to retrieve information about your API plan, usage limits, and more.

### Parameters

None.

### Sample

```ts
const getAPIPlanInformationMethod = await shodanClientApi.getAPIPlanInformation();

console.log(getAPIPlanInformationMethod);
```

## Types of responses:

Each method returns a **Promise** that resolves to a JSON-formatted response of type **unknown**, except for `getMyIP()`, which returns plain text containing your IP address.

> This client doesn't implement a type for each response to avoid conflicts with the Shodan API format. If you want to see what a response looks like, feel free to check [developer.shodan.io](https://developer.shodan.io/) or use `console.log` to inspect it yourself. Then, feel free to create your own types based on your needs.

> Make sure to use `await` when calling these methods to properly handle the returned data.

## Error Handling:

It returns a JSON object with an explanation of why the error occurred.

### Sample:
```json
{
    "error": "Message explaining why the error happened."
}
```
 