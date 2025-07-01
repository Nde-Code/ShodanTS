import { shodanClient } from "./mod.ts";

// Of course, never do this in production (never put your secret key directly in the code)!
// Instead, use environment variables configured via a .env file.
// Take a look at: https://docs.deno.com/runtime/reference/env_variables/
const client = new shodanClient("API_Key");

// For JSON:
const myProfile = await client.getAccountProfile();

interface myProfileObject {

    member: boolean

    credits: number

    display_name: unknown

    created: string

}

// If you like TypeScript types and want to create your own:
const myProfileAsType = await client.getAccountProfile<myProfileObject>();

console.log("Full JSON:", myProfile);

console.log("Member:", myProfileAsType.member);

console.log("You have used", myProfileAsType.credits, "credits this month.");

console.log("Displayed name:", myProfileAsType.display_name);

console.log("Account created on:", myProfileAsType.created);