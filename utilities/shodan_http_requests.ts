export class shodanHTTPClient {

    constructor(private defaultTimeout = 5000) {}

    private buildUrl(path: string): string {

        return `https://api.shodan.io/${path.replace(/^\//, "")}`;

    }

    private async request<T>(method: string, path: string, timeout: number, body?: unknown, headers: HeadersInit = {}): Promise<T> {

        const abortController = new AbortController();

        const abortControllerId = setTimeout(() => abortController.abort(), timeout);

        const response = await fetch(this.buildUrl(path), {

            method,

            headers: {

                "Content-Type": "application/json",

                ...headers,

            },

            body: body ? JSON.stringify(body) : undefined,

            signal: abortController.signal,

        });

        clearTimeout(abortControllerId);

        return response.json() as Promise<T>;

    }

    public get<T = unknown>(path: string, timeout?: number, headers?: HeadersInit): Promise<T> {

        return this.request<T>('GET', path, timeout ?? this.defaultTimeout, undefined, headers);

    }

    public post<T = unknown>(path: string, body: unknown, timeout?: number, headers?: HeadersInit): Promise<T> {

        return this.request<T>('POST', path, timeout ?? this.defaultTimeout, body, headers);

    }

    public put<T = unknown>(path: string, body: unknown, timeout?: number, headers?: HeadersInit): Promise<T> {

        return this.request<T>('PUT', path, timeout ?? this.defaultTimeout, body, headers);

    }

    public delete<T = unknown>(path: string, timeout?: number, headers?: HeadersInit): Promise<T> {

        return this.request<T>('DELETE', path, timeout ?? this.defaultTimeout, undefined, headers);

    }
    
}
