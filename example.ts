import { shodanClient } from "./mod.ts";

const client = new shodanClient("API_KEY");

const myAPIInfo = await client.getAPIPlanInformation();

console.log(myAPIInfo);