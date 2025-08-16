export interface ipSearchOptionsType {

    history: boolean;

    minify: boolean;

}

export interface countSearchOptionsType {

    facets: string;

}

export interface searchOptionsType {

    facets: string;

    page: number;

    minify: boolean;

}

export interface postShodanRequestBodyType {

    ips: Record<string, [number, string][]>;

}

export interface savedSearchQueriesOptionsType {

    page: number;

    sort?: "votes" | "timestamp";

    order?: "asc" | "desc";

}

export interface directoryWithSavedSearchQueriesOptionsType {

    page: number;

}

export interface savedQueryTagsOptionsType {

    size: number;

}

export interface domainDNSOptionsType {

    history: boolean;

    type?: "A" | "AAAA" | "CNAME" | "NS" | "SOA" | "MX" | "TXT";

    page: number;

}