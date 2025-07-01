import { shodanClient } from "./mod.ts";

const client = new shodanClient("API_KEY");

const myAPIInfo = await client.getAPIPlanInformation();

// Or:
// If you want to customize your own type:
interface myAPIInfoType {

    scan_credits: number

    plan: string

    query_credits: number

} 

const myAPIInfoWithType = await client.getAPIPlanInformation<myAPIInfoType>();

console.log(myAPIInfo);

console.log(myAPIInfoWithType.scan_credits, "scans");

console.log(myAPIInfoWithType.plan, "plan");

console.log(myAPIInfoWithType.query_credits, "query credits");