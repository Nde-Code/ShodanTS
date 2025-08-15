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

## [GET] `async searchHostWithIP<T>(ip, { minify, history }?)` – Retrieve information about an IP address:

This method is used to retrieve information about a specific IP address.

### Parameters:

- `ip` [`string`]: the IP address you want to retrieve information about.

- `options` (optional) [JSON] with:

  - `minify` [`boolean`]: if `true`, returns a simplified version of the data. (default: false)
  
  - `history` [`boolean`]: if `true`, includes historical data related to the IP. (default: false)

### Sample:
```js
// With type and options:
// Options typed via: ipSearchOptionsType
const searchHostWithIPMethod = await shodanAPIClient.searchHostWithIP<YourType>("8.8.8.8", { minify: true, history: false });

// Quick call without options:
const searchHostWithIPMethodJSON = await shodanAPIClient.searchHostWithIP("8.8.8.8", { minify: true, history: false });
console.log(searchHostWithIPMethodJSON);
```

### Be careful: the client throws an error if the IP address isn’t in a valid IPv4 or IPv6 format !

## [GET] `async countHostsWithQuery<T>(query, { facets }?)` – Retrieve the count of services found:

This method is used to **count** (and only count) the number of devices found using a query.  

### Parameters:

- `query` [`string`]: a query string (e.g., `country:"US"`, `port:"22"`) used to search Shodan's banner database.

- `options` (optional) [JSON] with:

  - `facets` [`string`]: used to specify the result response.

### Sample:
```js
// With type and options:
// Options typed via: countSearchOptionsType
const countHostsWithQueryMethod = await shodanAPIClient.countHostsWithQuery<YourType>('port:22', { facets: 'country:2' })

// Or for JSON:
const countHostsWithQueryMethodJSON = await shodanAPIClient.countHostsWithQuery('port:22', { facets: 'country:2' })
console.log(countHostsWithQueryMethodJSON);
```

## [GET] `async searchHostWithQuery<T>(query, { facets, page, minify }?)` – Search Shodan's host database:

This method allows you to search Shodan’s host (banner) database using a custom query, similar to how searches work on the Shodan website.

### Parameters:

- `query` [`string`]: a query string (e.g., `country:"US"`, `port:"22"`) used to search Shodan's banner database.

- `options` (optional) [JSON] with:

  - `facets` [`string`]: used to specify the result response.
  
  - `page` [`number`]: the page number of the results to return. (default: 1)
  
  - `minify` [`boolean`]: if `true`, returns a simplified version of the data. (default: true)

### Sample:
```js
// With type and options:
// Options typed via: searchOptionsType:
const searchHostWithQueryMethod = await shodanAPIClient.searchHostWithQuery<YourType>("apache country:DE", { facets: "org", page: 3, minify: true });

// Or for JSON:
const searchHostWithQueryMethodJSON = await shodanAPIClient.searchHostWithQuery("apache country:DE", { facets: "org", page: 3, minify: true});
console.log(searchHostWithQueryMethodJSON);
```

## [GET] `async getSearchFacets<T>()` - Retrieve available search facets from Shodan's database:

This method helps you retrieve the available Shodan facets for searching.

### Parameters:
None

### Sample:
```js
const getFacetsMethod = await shodanAPIClient.getSearchFacets<YourType>();

// Or for JSON:
const getFacetsMethodJSON = await shodanAPIClient.getSearchFacets();
console.log(getFacetsMethodJSON)
```

## [GET] `async getSearchFilters<T>()` - Retrieve available search filters from Shodan's database:

This method helps you retrieve the available Shodan filters for searching.

### Parameters:
None

### Sample:
```js
const getFiltersMethod = await shodanAPIClient.getSearchFilters<YourType>();

// Or for JSON:
const getFiltersMethodJSON = await shodanAPIClient.getSearchFilters();
console.log(getFiltersMethodJSON)
```

## [GET] `async getSearchTokens<T>(query)` - Retrieve a lexed JSON of the filters you've written:

This method helps you retrieve the parsed filters you've written.

### Parameters:

- `query` [`string`]: a query string (e.g., `country:"US"`, `port:"22"`) used to search Shodan's banner database.

### Sample:
```js
const getTokensMethod = await shodanAPIClient.getSearchTokens<YourType>("Raspbian port:22")

// Or for JSON:
const getTokensMethodJSON = await shodanAPIClient.getSearchTokens("Raspbian port:22")
console.log(getTokensMethodJSON)
```

## [GET] `async getPorts<T>()` – Retrieve available ports from Shodan's database:

This method retrieves the list of ports available in Shodan's database.

### Parameters:
None

### Sample:
```js
const getPortsMethod = await shodanAPIClient.getPorts<YourType>();

// Or for JSON:
const getPortsMethodJSON = await shodanAPIClient.getPorts();
console.log(getPortsMethodJSON);
```

## [GET] `async getProtocols<T>()` – Retrieve available protocols from Shodan's database:

This method retrieves the list of protocols available in Shodan's database.

### Parameters:
None

### Sample:
```js
const getProtocolsMethod = await shodanAPIClient.getProtocols<YourType>();

// Or for JSON:
const getProtocolsMethodJSON = await shodanAPIClient.getProtocols();
console.log(getProtocolsMethodJSON);
```

## [POST] `async submitScanRequest<T>(body)` – Submit a scan request to Shodan:

This method allows you to submit a scan request to Shodan, specifying which IPs and services should be crawled.

### Parameters:

- `body` [JSON] with:

  - `ips` [`Record<string, [number, string][]>`]: an object where each key is an IP address (or CIDR range) and the value is a list of `[port, protocol]` tuples representing the services to be scanned.

### Sample:
```ts
import type { postShodanRequestBodyType } from "https://raw.githubusercontent.com/Nde-Code/ShodanTS/v3.0.4/mod.ts";

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

const submitScanRequestMethod = await shodanAPIClient.submitScanRequest<YourType>(bodyJSON);

// Or for JSON:
const submitScanRequestMethodJSON = await shodanAPIClient.submitScanRequest(bodyJSON);
console.log(submitScanRequestMethodJSON);
```

### Be careful: the client throws an error if IPs (CIDR) aren’t in a valid format !

## [GET] `async getScans<T>()` – Retrieve the list of current scans:

This method retrieves the list of scans you are currently running.

### Parameters:
None

### Sample:
```js
const getListOfScans = await shodanAPIClient.getScans<YourType>();

// Or for JSON:
const getListOfScansJSON = await shodanAPIClient.getScans();
console.log(getListOfScansJSON);
```

## [GET] `async getScanById<T>(id)` – Retrieve a scan by ID:

This method retrieves the details of a specific scan using its ID.

### Parameters:

- `id` [`string`]: the ID of the scan you want to retrieve.

### Sample:
```js
const getScanByIdMethod = await shodanAPIClient.getScanById<YourType>("Scan ID");

// Or for JSON:
const getScanByIdMethodJSON = await shodanAPIClient.getScanById("Scan ID");
console.log(getScanByIdMethodJSON);
```

## [GET] `async getSavedSearchQueries<T>({ page, sort?, order? }?)` – Retrieve a list of saved search queries:

This method returns a list of search queries that have been saved by users on Shodan.

### Parameters

- `options` (optional) [JSON] with:

  - `page` [`number`]: the page number of results to return. Each page contains 10 items. (default: 1)
  
  - `sort` (optional) [`string`]: the field to sort the results by. Allowed values: `votes`, `timestamp`. This option is not required if other parameters are specified in the options object.
  
  - `order` (optional) [`string`]: the order in which results are returned. Allowed values: `asc`, `desc`. This option is not required if other parameters are specified in the options object.

### Sample

```ts
// With type and options:
// Options typed via: savedSearchQueryOptionsType:
const getSavedSearchQueriesMethod = await shodanAPIClient.getSavedSearchQueries<YourType>({ page: 3, sort: "votes", order: "desc" }); 

// Or for JSON:
const getSavedSearchQueriesMethodJSON = await shodanAPIClient.getSavedSearchQueries({ page: 3, sort: "votes", order: "desc" });
console.log(getSavedSearchQueriesMethodJSON)
```

## [GET] `async getDirectoryWithSavedSearchQueries<T>(query, { page }?)` – Retrieve the directory of saved search queries:

This method helps you search through the directory of search queries saved by users in Shodan's database.

### Parameters

- `query` [`string`]: a search query string (e.g., `country:"US"`, `port:"22"`) used to search Shodan's banner database.

- `options` (optional) [JSON] with:

  - `page` [`number`]: the page number of results to return. Each page contains 10 items.

### Sample

```ts
// With type and options:
// Options typed via: directoryWithSavedSearchQueriesOptionsType:
const directoryWithSavedSearchQueriesMethod = await shodanAPIClient.getDirectoryWithSavedSearchQueries<YourType>("country:US", { page: 3 });

// Or for JSON: 
const directoryWithSavedSearchQueriesMethodJSON = await shodanAPIClient.getDirectoryWithSavedSearchQueries("country:US", { page: 3 });
console.log(directoryWithSavedSearchQueriesMethodJSON)
```

## [GET] `async getSavedSearchQueryTags<T>({ size }?)` – Retrieve popular tags from saved search queries:

This method allows you to search the collection of user-saved queries in Shodan.

### Parameters

- `options` (optional) [JSON] with:

  - `size` [`number`]: the number of tags to return. Defaults to 10 if not specified.

### Sample

```ts
// With type and options:
// Options typed via: tagsOfSavedSearchQueriesOptionsType:
const getSavedSearchQueryTagsMethod = await shodanAPIClient.getSavedSearchQueryTags<YourType>({ size: 5 }); 

// Or for JSON:
const getSavedSearchQueryTagsMethodJSON = await shodanAPIClient.getSavedSearchQueryTags({ size: 5 });
console.log(getSavedSearchQueryTagsMethodJSON);
```

## [GET] `async getAccountProfile<T>()` – Retrieve information about the account associated with your API key:

This method allows you to retrieve details about the account linked to your API key.

### Parameters

None.

### Sample

```ts
const getAccountProfileMethod = await shodanAPIClient.getAccountProfile<YourType>();

// Or for JSON:
const getAccountProfileMethodJSON = await shodanAPIClient.getAccountProfile();
console.log(getAccountProfileMethodJSON)
```

## [GET] `async getDNSRecords<T>(domain, { history, type?, page }?)` – Retrieve subdomains and other DNS records for a domain:

This method retrieves subdomains and other DNS records associated with the specified domain.

**Uses 1 query credit per lookup.**

### Parameters

- `domain` [`string`]: the domain name to look up (e.g., `google.com`).

- `options` (optional) [JSON] with:

  - `history` [`boolean`]: if `true`, includes historical DNS data. (default: false)
  
  - `type` (optional) [`string`]: the DNS record type to filter results. Allowed values: `A`, `AAAA`, `CNAME`, `NS`, `SOA`, `MX`, `TXT`. This option is not required if other parameters are specified in the options object.
  
  - `page` [`number`]: the page number of results to retrieve. One page = 100 results. (default: 1)

### Sample

```ts
const getDNSRecordsMethod = await shodanAPIClient.getDNSRecords<YourType>("google.com", { history: false, type: "CNAME", page: 1 });

// Or for JSON:
const getDNSRecordsMethodJSON = await shodanAPIClient.getDNSRecords("google.com", { history: false, type: "CNAME", page: 1 });
console.log(getDNSRecordsMethodJSON)
```

### Be careful: the client throws an error if the domain isn’t in a valid format !

## [GET] `async DNSLookup<T>(hostnames)` – Retrieve the IP address(es) for a list of domains:

This method retrieves the IPv4 or IPv6 address(es) associated with one or more domain names.

### Parameters

- `hostnames` [`string`]: a comma-separated list of domain names (e.g., `google.com,shodan.io`).

### Sample

```ts
const DNSLookupMethod = await shodanAPIClient.DNSLookup<YourType>("google.com,shodan.io");

// Or for JSON:
const DNSLookupMethodJSON = await shodanAPIClient.DNSLookup("google.com,shodan.io");
console.log(DNSLookupMethodJSON)
```

### Be careful: the client throws an error if the list of domains (or a single domain) isn’t in a valid format. 

## [GET] `async reverseDNSLookup<T>(ips)` – Retrieve domain(s) associated with a list of IP addresses:

This method performs a reverse DNS lookup to retrieve domain names associated with a list of IP addresses.

### Parameters

- `ips` [`string`]: a comma-separated list of IP addresses (e.g., `8.8.8.8,1.1.1.1`).

### Sample

```ts
const reverseDNSLookupMethod = await shodanAPIClient.reverseDNSLookup<YourType>("8.8.8.8,1.1.1.1");

// Or for JSON:
const reverseDNSLookupMethodJSON = await shodanAPIClient.reverseDNSLookup("8.8.8.8,1.1.1.1");
console.log(reverseDNSLookupMethodJSON)
```

### Be careful: the client throws an error if the IP list (or a single IP) isn’t in a valid format.

## [GET] `async getHTTPHeaders<T>()` – Retrieve HTTP headers sent by the client to a web server:

This method allows you to retrieve the HTTP headers that the client sends to a web server.

### Parameters

None.

### Sample

```ts
const getHTTPHeadersMethod = await shodanAPIClient.getHTTPHeaders<YourType>();

// Or for JSON:
const getHTTPHeadersMethodJSON = await shodanAPIClient.getHTTPHeaders();
console.log(getHTTPHeadersMethodJSON);
```

## [GET] `async getMyIP<T>()` – Retrieve your public IP address:

This method allows you to retrieve your current public IP address.

### Parameters

None.

### Sample

```ts
const getMyIPMethod = await shodanAPIClient.getMyIP<YourType>();

// Or for JSON:
const getMyIPMethodJSON = await shodanAPIClient.getMyIP();
console.log(getMyIPMethodJSON)
```

## [GET] `async getAPIPlanInformation<T>()` – Retrieve details about your API plan:

This method allows you to retrieve information about your API plan, usage limits, and more.

### Parameters

None.

### Sample

```ts
const getAPIPlanInformationMethod = await shodanAPIClient.getAPIPlanInformation<YourType>();

// Or for JSON:
const getAPIPlanInformationMethodJSON = await shodanAPIClient.getAPIPlanInformation();
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

### For improved security and adherence to best practices, this client will throw an error that includes the HTTP status code, a description, and additional information about the error.

**Make sure to follow best practices when using this client, such as wrapping each call in a `try/catch` block.**
