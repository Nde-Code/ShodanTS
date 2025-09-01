import { ShodanClient } from "./mod.ts";

// Of course, never do this in production (never put your secret key directly in the code)!
// Take a look at: https://docs.deno.com/runtime/reference/env_variables/
const client = new ShodanClient("API_Key");

const myProfile = await client.getAccountProfile();
console.log("Full JSON:", myProfile);

interface myProfileObject {
   member: boolean;
   credits: number;
   display_name: unknown;
   created: string;
}

const myProfileAsType = await client.getAccountProfile<myProfileObject>();
console.log("Member:", myProfileAsType.member);
console.log("You have used", myProfileAsType.credits, "credits this month.");
console.log("Displayed name:", myProfileAsType.display_name);
console.log("Account created on:", myProfileAsType.created);