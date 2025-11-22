# 🔍 ShodanTS:

A lightweight and modern [Shodan](https://www.shodan.io/)  API client written in TypeScript, powered by the [Deno runtime](https://deno.land/). 

This client is fully built based on the Shodan API documentation: https://developer.shodan.io/api

Please note that this project is independently developed and not officially affiliated with or endorsed by Shodan. 

> At the beginning, I just needed a small client to help me with some personal projects. There was already a small nice client called [shodan_deno](https://github.com/aldinp16/shodan_deno), but it was too limited for my needs. So I decided to create my own from scratch with a completely reinvented structure and share it on my GitHub.

**Note**:
Some methods are not currently implemented. These include:

- **Internet scan** via `shodan/scan/internet` *(requires an enterprise license)*

- **Network Alerts**

- **Notifiers**

- **Bulk Data** *(requires an enterprise license)*

- **Manage Organization** *(requires an enterprise license)*

- **Data Streams** *(requires an enterprise license)*

## 🚀 Getting Started:

Just initialize a Deno project, create a file (e.g., `your_file.ts`), and insert the following code:

> Create a `.env` file in the same directory as `your_file.ts` and add `SHODAN_KEY="<Your_Shodan_key>"`. For more details, see the [Deno environment variables documentation](https://docs.deno.com/runtime/reference/env_variables/).

```ts
import { ShodanClient } from "https://raw.githubusercontent.com/Nde-Code/ShodanTS/v4.0.0/mod.ts";

const client = new ShodanClient(Deno.env.get("SHODAN_KEY") ?? "");

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

and run your file with the following command:

```bash
deno run --allow-net=api.shodan.io your_file.ts
```

Make sure you have properly configured and installed the Deno extension for Visual Studio Code to ensure a smooth and comfortable setup.

For guidance, see the [Deno & Visual Studio Code documentation](https://docs.deno.com/runtime/reference/vscode/)

You can also use my `settings.json` file located at: [`.vscode/settings.json`](.vscode/settings.json)

## 🔧 Working on this project locally:

0. **Install the required items:**

If you haven't already, install the [Deno runtime](https://docs.deno.com/runtime/reference/cli/install/) and create an account on [Shodan](https://account.shodan.io/) to obtain your API key.

1. **Clone the repository:**

```bash
git clone https://github.com/Nde-Code/ShodanTS.git
```

2. **Go into the cloned ShodanTS folder by clicking on it, or by running the following command in your terminal:**

```bash
cd ShodanTS
```

3. **Run the client to ensure everything works correctly (make sure to create a `.env` file and add `SHODAN_KEY="<Your_Shodan_key>"`)**

```bash
deno run --allow-net=api.shodan.io --allow-env --env-file=.env tests.ts
```

## 📚 Documentation:

For full usage examples, configuration details, and API command references, check out the [docs.md](./docs.md) file in this repo.

## 🛡️ License:

This project is licensed under the MIT License, see the [LICENSE](./LICENSE) file for details.


## 🧠 Credits

Built with ❤️ using TypeScript + Deno by [Nde-Code](https://nde-code.github.io/).

> If you encounter any problems or need help, feel free to open an issue.
