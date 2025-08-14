/*
 * ShodanTS is a lightweight client for the Shodan API.
 * Created by: https://nde-code.github.io/
 * This client is licensed under the MIT License.
 * Feel free to open an issue or submit a pull request if you need help
 * or want to suggest new features.
 */
import { shodanHTTPClient } from "../utilities/shodan_http_requests.ts";

import { checkers } from "../utilities/checkers.ts";

import { QueryParamsBuilder } from "../utilities/json_options_URL.ts";

import type {

    ipSearchOptionsType,

    countSearchOptionsType,

    searchOptionsType,

    postShodanRequestBodyType,

    savedSearchQueryOptionsType,

    directoryWithSavedSearchQueriesOptionsType,

    tagsOfSavedSearchQueriesOptionsType,

    allDNSFromADomainOptionsType
    
} from "../types/types.ts";

export class shodanClient {

    private shodanHTTPClientObject: shodanHTTPClient;

    private defaultShodanClientTimeOut: number = 3000;

    constructor(private secretShodanKey: string, private timeout: number = this.defaultShodanClientTimeOut) {

        this.shodanHTTPClientObject = new shodanHTTPClient(this.timeout);

    }

    private buildQueryParams(params?: object): string {

        if (!params) return '';

        const safeParams = Object.fromEntries(Object.entries(params).filter(([_, value]) => value !== undefined && value !== null));

        return new QueryParamsBuilder({ key: this.secretShodanKey }).addParams(safeParams).toString();
    
    }

    public async searchHostIP<T = unknown>(ip: string, options?: ipSearchOptionsType): Promise<T> {

        if (!checkers.isAnIpV4(ip) && !checkers.isAnIpV6(ip)) throw new Error(`Error with /shodan/host/{ip}: the ip (${ip}) is not a valid ip address.`)
        
        return await this.shodanHTTPClientObject.get<T>(`shodan/host/${ip}?${this.buildQueryParams(options)}`);

    }

    public async searchHostCount<T = unknown>(query: string, options?: countSearchOptionsType): Promise<T> {
                
        return await this.shodanHTTPClientObject.get<T>(`shodan/host/count?${this.buildQueryParams({ query, ...options })}`);

    }

    public async searchHostQuery<T = unknown>(query: string, options?: searchOptionsType): Promise<T> {

        return await this.shodanHTTPClientObject.get<T>(`shodan/host/search?${this.buildQueryParams({ query, ...options })}`);

    }

    public async getSearchFacets<T = unknown>(): Promise<T> {

        return await this.shodanHTTPClientObject.get<T>(`shodan/host/search/facets?key=${this.secretShodanKey}`);

    }

    public async getSearchFilters<T = unknown>(): Promise<T> {

        return await this.shodanHTTPClientObject.get<T>(`shodan/host/search/filters?key=${this.secretShodanKey}`);

    }

    public async getSearchTokens<T = unknown>(query: string): Promise<T> {

        return await this.shodanHTTPClientObject.get<T>(`shodan/host/search/tokens?${this.buildQueryParams({ query })}`);

    }

    public async getPorts<T = unknown>(): Promise<T> {

        return await this.shodanHTTPClientObject.get<T>(`shodan/ports?key=${this.secretShodanKey}`);

    }

    public async getProtocols<T = unknown>(): Promise<T> {

        return await this.shodanHTTPClientObject.get<T>(`shodan/protocols?key=${this.secretShodanKey}`);

    }

    public async submitIPScanRequest<T = unknown>(body: postShodanRequestBodyType): Promise<T> {

        for (const ip of Object.keys(body.ips)) {

            if (!checkers.isAnIpV4OrCidr(ip)) throw new Error(`Error with /shodan/scan: ${ip} isn't a valid IP or CIDR format !`);

        }

        return await this.shodanHTTPClientObject.post<T>(`shodan/scan?key=${this.secretShodanKey}`, body)

    }

    public async getScans<T = unknown>(): Promise<T> {

        return await this.shodanHTTPClientObject.get<T>(`shodan/scans?key=${this.secretShodanKey}`);
        
    }

    public async getScansById<T = unknown>(id: string): Promise<T> {

        return await this.shodanHTTPClientObject.get<T>(`shodan/scan/${id}?key=${this.secretShodanKey}`);
        
    }

    public async getSavedSearchQueries<T = unknown>(options?: savedSearchQueryOptionsType): Promise<T> {

        return await this.shodanHTTPClientObject.get<T>(`shodan/query?${this.buildQueryParams(options)}`)

    }

    public async getDirectoryWithSavedSearchQueries<T = unknown>(query: string, options?: directoryWithSavedSearchQueriesOptionsType): Promise<T> {

        return await this.shodanHTTPClientObject.get<T>(`shodan/query/search?${this.buildQueryParams({ query, ...options })}`);

    }

    public async getSavedQueryTags<T = unknown>(options?: tagsOfSavedSearchQueriesOptionsType): Promise<T> {

        return await this.shodanHTTPClientObject.get<T>(`shodan/query/tags?${this.buildQueryParams(options)}`);

    }

    public async getAccountProfile<T = unknown>(): Promise<T> {

        return await this.shodanHTTPClientObject.get<T>(`account/profile?key=${this.secretShodanKey}`);

    }

    public async getDNSRecords<T = unknown>(domain: string, options?: allDNSFromADomainOptionsType): Promise<T> {

        if(!checkers.isAValidDomain(domain)) throw new Error(`Error with dns/domain/{domain}: the domain (${domain}) isn't in a valid format.`)

        return await this.shodanHTTPClientObject.get<T>(`dns/domain/${domain}?${this.buildQueryParams(options)}`); 

    }

    public async DNSLookup<T = unknown>(hostnames: string): Promise<T> {

        if (!checkers.isAValidDomainsList(hostnames)) throw new Error(`Error with /dns/resolve: the hostnames list (${hostnames}) isn't in a valid format.`)

        return await this.shodanHTTPClientObject.get<T>(`dns/resolve?${this.buildQueryParams({ hostnames })}`)

    }

    public async reverseDNSLookup<T = unknown>(ips: string): Promise<T> {

        if (!checkers.isAValidIpsList(ips)) throw new Error(`Error with /dns/reverse: the ips list (${ips}) isn't in a valid format.`)

        return await this.shodanHTTPClientObject.get<T>(`dns/reverse?${this.buildQueryParams({ ips })}`)

    }

    public async getHTTPHeaders<T = unknown>(): Promise<T> {

        return await this.shodanHTTPClientObject.get<T>(`tools/httpheaders?key=${this.secretShodanKey}`);

    }
    
    public async getMyIP<T = unknown>(): Promise<T> {

        return await this.shodanHTTPClientObject.get<T>(`tools/myip?key=${this.secretShodanKey}`);

    }

    public async getAPIPlanInformation<T = unknown>(): Promise<T> {

        return await this.shodanHTTPClientObject.get<T>(`api-info?key=${this.secretShodanKey}`);

    }

}