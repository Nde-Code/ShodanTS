export interface IpSearchOptions {

    history: boolean;

    minify: boolean;

}

export interface CountSearchOptions {

    facets: string;

}

export interface SearchOptions {

    facets: string;

    page: number;

    minify: boolean;

}

export interface PostShodanRequestBody {

    ips: Record<string, [number, string][]>;

}

export interface SavedSearchQueriesOptions {

    page: number;

    sort?: "votes" | "timestamp";

    order?: "asc" | "desc";

}

export interface DirectorySearchOptions {

    page: number;

}

export interface SavedQueryTagsOptions {

    size: number;

}

export interface DomainDNSOptions {

    history: boolean;

    type?: "A" | "AAAA" | "CNAME" | "NS" | "SOA" | "MX" | "TXT";

    page: number;

}