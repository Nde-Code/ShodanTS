# 🔍 ShodanTS:

A lightweight and modern [Shodan API](https://www.shodan.io/) client written in TypeScript, powered by the [Deno runtime](https://deno.land/). 

This client is fully built based on the Shodan API documentation: https://developer.shodan.io/api

Please note that this project is independently developed and not officially affiliated with or endorsed by Shodan. 

> At the beginning, I just needed a small client to help me with some personal projects. There was already a small nice client called [shodan_deno](https://github.com/aldinp16/shodan_deno), but it was too limited for my needs. So I decided to create my own from scratch with a completely reinvented structure and share it on my GitHub.

**Note**:
Some methods are not currently implemented. These include:

- **Internet scan** via `shodan/scan/internet` (requires an enterprise license)

- **Network Alerts**

- **Notifiers**

- **Bulk Data** (requires an enterprise license)

- **Manage Organization** (requires an enterprise license)

- **Data Streams** (requires an enterprise license)

## 🚀 Getting Started:

0. **Install the required items:**

If you haven't already, install the [Deno runtime](https://docs.deno.com/runtime/reference/cli/install/) and create an account on [Shodan](https://account.shodan.io/) to obtain your API key.

1. **Clone the repository:**

```bash
git clone https://github.com/Nde-Code/ShodanTS.git
```

2. **Go in the ShodanTS cloned folder:**

```bash
cd ShodanTS
```

3. **Run the client (make sure to insert your API key into the code beforehand):**

```bash
deno run --allow-net=api.shodan.io example.ts
```

#### Or use the code below:

```ts
import { shodanClient } from "https://raw.githubusercontent.com/Nde-Code/ShodanTS/v2.0.1/mod.ts";

// Of course, never do this in production (never put your secret key directly in the code)!
// Take a look at: https://docs.deno.com/runtime/reference/env_variables/
const client = new shodanClient("API_Key");

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
```

And run your file with the following command:

```bash
deno run --allow-net=api.shodan.io your_file.ts
```

Make sure you have correctly configured and installed the Deno extension for Visual Studio Code if you're using this client from a URL. 

For guidance, see the [Deno & Visual Studio Code documentation](https://docs.deno.com/runtime/reference/vscode/)

You can also use my `settings.json` file located at: [`.vscode/settings.json`](.vscode/settings.json)

## 📚 Documentation:

For full usage examples, configuration details, and API command references, check out the [docs.md](./docs.md) file in this repo.

## 🛡️ License:

This project is licensed under the MIT License — see the [LICENSE](./LICENSE) file for details.


## 🧠 Credits

Built with ❤️ using TypeScript + Deno by [Nde-Code](https://nde-code.github.io/).

> If you encounter any problems or need help, feel free to open an issue.
