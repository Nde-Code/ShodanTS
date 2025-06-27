import { shodanHTTPClient } from "../utilities/shodan_http_requests.ts";
import { checkers } from "../utilities/checkers.ts";
import { QueryParamsBuilder } from "../utilities/json_options_URL.ts";

export class shodanClient {

    private shodanHTTPClientObject: shodanHTTPClient;

    private defaultShodanClientTimeOut: number = 3000;

    constructor(private secretShodanKey: string, private timeout: number = this.defaultShodanClientTimeOut) {

        this.shodanHTTPClientObject = new shodanHTTPClient(this.timeout);

    }

    private buildQueryParams(params: Record<string, string | number | boolean | undefined>): string {

        return new QueryParamsBuilder({ key: this.secretShodanKey }).addParams(params).toString();

    }
    
    public async searchHostIP(ip: string, minify?: boolean, history?: boolean): Promise<unknown> {

        if (!checkers.isAnIpV4(ip) && !checkers.isAnIpV6(ip)) throw new Error('Error with /shodan/host/{ip}: the ip' + ip + 'is not a valid ip addresse.')
        
        return await this.shodanHTTPClientObject.get(`shodan/host/${ip}?${this.buildQueryParams({ minify, history })}`);

    }

    public async searchHostCount(query: string, facets?: string): Promise<unknown> {
                
        return await this.shodanHTTPClientObject.get(`shodan/host/count?${this.buildQueryParams({ query, facets })}`);

    }

    public async searchHostResearch(query: string, facets?: string, page?: number, minify?: boolean ): Promise<unknown> {

        return await this.shodanHTTPClientObject.get(`shodan/host/search?${this.buildQueryParams({ query, facets, page, minify })}`);

    }

    public async getSearchFacets(): Promise<unknown> {

        return await this.shodanHTTPClientObject.get(`shodan/host/search/facets?key=${this.secretShodanKey}`);

    }

    public async getSearchFilters(): Promise<unknown> {

        return await this.shodanHTTPClientObject.get(`shodan/host/search/filters?key=${this.secretShodanKey}`);

    }

    public async getSearchTokens(query: string): Promise<unknown> {

        return await this.shodanHTTPClientObject.get(`shodan/host/search/tokens?${this.buildQueryParams({ query })}`);

    }

    public async getPorts(): Promise<unknown> {

        return await this.shodanHTTPClientObject.get(`shodan/ports?key=${this.secretShodanKey}`);

    }

    public async getProtocols(): Promise<unknown> {

        return await this.shodanHTTPClientObject.get(`shodan/protocols?key=${this.secretShodanKey}`);

    }

    public async scanIps(body: { ips: Record<string, [number, string][]> }): Promise<unknown> {

        for (const ip of Object.keys(body.ips)) {

            if (!checkers.isAnIpV4OrCidr(ip)) throw new Error("Error with /shodan/scan: " + ip + "isn't a valid IP or CIDR format !");

        }

        return await this.shodanHTTPClientObject.post(`shodan/scan?key=${this.secretShodanKey}`, body)

    }

    public async getScans(): Promise<unknown> {

        return await this.shodanHTTPClientObject.get(`shodan/scans?key=${this.secretShodanKey}`);
        
    }

    public async getScansById(id: string): Promise<unknown> {

        return await this.shodanHTTPClientObject.get(`shodan/scan/${id}?key=${this.secretShodanKey}`);
        
    }

    public async getSavedSearchQueries(page?: number, sort?: "votes" | "timestamp", order?: "asc" | "desc"): Promise<unknown> {

        return await this.shodanHTTPClientObject.get(`shodan/query?${this.buildQueryParams({ page, sort, order })}`)

    }

    public async getDirectoryWithSavedSearchQueries(query: string, page?: number): Promise<unknown> {

        return await this.shodanHTTPClientObject.get(`shodan/query/search?${this.buildQueryParams({ query, page })}`);

    }

    public async getTagsOfSavedSearchQueries(size?: number): Promise<unknown> {

        return await this.shodanHTTPClientObject.get(`shodan/query/tags?${this.buildQueryParams({ size })}`);

    }

    public async getAccountProfile(): Promise<unknown> {

        return await this.shodanHTTPClientObject.get(`account/profile?key=${this.secretShodanKey}`);

    }

    public async getAllDNSFromADomain(domain: string, history?: boolean, type?: "A" | "AAAA" | "CNAME" | "NS" | "SOA" | "MX" | "TXT", page?: number): Promise<unknown> {

        if(!checkers.isAValidDomain(domain)) throw new Error("Error with dns/domain/{domain}: the domain " + domain + " isn't in a valid format.")

        return await this.shodanHTTPClientObject.get(`dns/domain/${domain}?${this.buildQueryParams({ history, type, page })}`); 

    }

    public async DNSLookup(hostnames: string): Promise<unknown> {

        if (!checkers.isAValidDomainsList(hostnames)) throw new Error("Error with /dns/resolve: the hostnames list " + hostnames + "isn't in a valid format.")

        return await this.shodanHTTPClientObject.get(`dns/resolve?${this.buildQueryParams({ hostnames })}`)

    }

    public async reverseDNSLookup(ips: string): Promise<unknown> {

        if (!checkers.isAValidIpsList(ips)) throw new Error("Error with /dns/reverse: the ips list " + ips + "isn't in a valid format.")

        return await this.shodanHTTPClientObject.get(`dns/reverse?${this.buildQueryParams({ ips })}`)

    }

    public async getHTTPHeaders(): Promise<unknown> {

        return await this.shodanHTTPClientObject.get(`tools/httpheaders?key=${this.secretShodanKey}`);

    }
    
    public async getMyIP(): Promise<unknown> {

        return await this.shodanHTTPClientObject.get(`tools/myip?key=${this.secretShodanKey}`);

    }

    public async getAPIPlanInformation(): Promise<unknown> {

        return await this.shodanHTTPClientObject.get(`api-info?key=${this.secretShodanKey}`);

    }

}