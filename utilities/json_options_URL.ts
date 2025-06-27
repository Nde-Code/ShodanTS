export class QueryParamsBuilder {

    private params: URLSearchParams;

    constructor(initialParams?: Record<string, unknown>) {

        this.params = new URLSearchParams();

        if (initialParams) this.addParams(initialParams);

    }

    public addParams(params: Record<string, unknown>): this {

        for (const [key, value] of Object.entries(params)) {

            if (value !== undefined && value !== null) {
                
                this.params.set(key, String(value));

            }

        }

        return this;

    }

    public toString(): string {

        return this.params.toString();

    }

}
