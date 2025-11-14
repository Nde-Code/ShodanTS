export function sanitizeKey(input: string, redacted: string = "***REDACTED***"): string {
    
    if (!input) return "";

    try {

        const url = input.startsWith("/") ? new URL(input, "http://example.com") : new URL(input);

        if (url.searchParams.has("key")) url.searchParams.set("key", redacted);

        if (url.hash.includes("key=")) url.hash = url.hash.replace(/(^|[?&])key=[^&\s#]*/gi, `$1key=${redacted}`);

        return input.startsWith("/") ? url.href.replace(url.origin, "") : url.toString();

    } catch {

        const regex = /(^|[?&\/\s])key=[^&\s#]*/gi;

        return input.replace(regex, (_match, g1) => `${g1}key=${redacted}`);

    }

}

export function safeThrow(message: string, error?: unknown): never {

    if (error instanceof Error) throw new Error(`${message}: ${sanitizeKey(error.message)}`);

    throw new Error(message);

}
