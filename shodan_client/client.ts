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
    
    public async searchHostIP<T>(ip: string, minify?: boolean, history?: boolean): Promise<T> {

        if (!checkers.isAnIpV4(ip) && !checkers.isAnIpV6(ip)) throw new Error('Error with /shodan/host/{ip}: the ip ' + ip + ' is not a valid ip addresse.')
        
        return await this.shodanHTTPClientObject.get<T>(`shodan/host/${ip}?${this.buildQueryParams({ minify, history })}`);

    }

    public async searchHostCount<T>(query: string, facets?: string): Promise<T> {
                
        return await this.shodanHTTPClientObject.get<T>(`shodan/host/count?${this.buildQueryParams({ query, facets })}`);

    }

    public async searchHostResearch<T>(query: string, facets?: string, page?: number, minify?: boolean ): Promise<T> {

        return await this.shodanHTTPClientObject.get<T>(`shodan/host/search?${this.buildQueryParams({ query, facets, page, minify })}`);

    }

    public async getSearchFacets<T>(): Promise<T> {

        return await this.shodanHTTPClientObject.get<T>(`shodan/host/search/facets?key=${this.secretShodanKey}`);

    }

    public async getSearchFilters<T>(): Promise<T> {

        return await this.shodanHTTPClientObject.get<T>(`shodan/host/search/filters?key=${this.secretShodanKey}`);

    }

    public async getSearchTokens<T>(query: string): Promise<T> {

        return await this.shodanHTTPClientObject.get<T>(`shodan/host/search/tokens?${this.buildQueryParams({ query })}`);

    }

    public async getPorts<T>(): Promise<T> {

        return await this.shodanHTTPClientObject.get<T>(`shodan/ports?key=${this.secretShodanKey}`);

    }

    public async getProtocols<T>(): Promise<T> {

        return await this.shodanHTTPClientObject.get<T>(`shodan/protocols?key=${this.secretShodanKey}`);

    }

    public async scanIps<T>(body: { ips: Record<string, [number, string][]> }): Promise<T> {

        for (const ip of Object.keys(body.ips)) {

            if (!checkers.isAnIpV4OrCidr(ip)) throw new Error("Error with /shodan/scan: " + ip + " isn't a valid IP or CIDR format !");

        }

        return await this.shodanHTTPClientObject.post<T>(`shodan/scan?key=${this.secretShodanKey}`, body)

    }

    public async getScans<T>(): Promise<T> {

        return await this.shodanHTTPClientObject.get<T>(`shodan/scans?key=${this.secretShodanKey}`);
        
    }

    public async getScansById<T>(id: string): Promise<T> {

        return await this.shodanHTTPClientObject.get<T>(`shodan/scan/${id}?key=${this.secretShodanKey}`);
        
    }

    public async getSavedSearchQueries<T>(page?: number, sort?: "votes" | "timestamp", order?: "asc" | "desc"): Promise<T> {

        return await this.shodanHTTPClientObject.get<T>(`shodan/query?${this.buildQueryParams({ page, sort, order })}`)

    }

    public async getDirectoryWithSavedSearchQueries<T>(query: string, page?: number): Promise<T> {

        return await this.shodanHTTPClientObject.get<T>(`shodan/query/search?${this.buildQueryParams({ query, page })}`);

    }

    public async getTagsOfSavedSearchQueries<T>(size?: number): Promise<T> {

        return await this.shodanHTTPClientObject.get<T>(`shodan/query/tags?${this.buildQueryParams({ size })}`);

    }

    public async getAccountProfile<T>(): Promise<T> {

        return await this.shodanHTTPClientObject.get<T>(`account/profile?key=${this.secretShodanKey}`);

    }

    public async getAllDNSFromADomain<T>(domain: string, history?: boolean, type?: "A" | "AAAA" | "CNAME" | "NS" | "SOA" | "MX" | "TXT", page?: number): Promise<T> {

        if(!checkers.isAValidDomain(domain)) throw new Error("Error with dns/domain/{domain}: the domain " + domain + " isn't in a valid format.")

        return await this.shodanHTTPClientObject.get<T>(`dns/domain/${domain}?${this.buildQueryParams({ history, type, page })}`); 

    }

    public async DNSLookup<T>(hostnames: string): Promise<T> {

        if (!checkers.isAValidDomainsList(hostnames)) throw new Error("Error with /dns/resolve: the hostnames list " + hostnames + "isn't in a valid format.")

        return await this.shodanHTTPClientObject.get<T>(`dns/resolve?${this.buildQueryParams({ hostnames })}`)

    }

    public async reverseDNSLookup<T>(ips: string): Promise<T> {

        if (!checkers.isAValidIpsList(ips)) throw new Error("Error with /dns/reverse: the ips list " + ips + " isn't in a valid format.")

        return await this.shodanHTTPClientObject.get<T>(`dns/reverse?${this.buildQueryParams({ ips })}`)

    }

    public async getHTTPHeaders<T>(): Promise<T> {

        return await this.shodanHTTPClientObject.get<T>(`tools/httpheaders?key=${this.secretShodanKey}`);

    }
    
    public async getMyIP<T>(): Promise<T> {

        return await this.shodanHTTPClientObject.get<T>(`tools/myip?key=${this.secretShodanKey}`);

    }

    public async getAPIPlanInformation<T>(): Promise<T> {

        return await this.shodanHTTPClientObject.get<T>(`api-info?key=${this.secretShodanKey}`);

    }

}