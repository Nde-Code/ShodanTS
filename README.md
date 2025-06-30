# 🔍 ShodanTS:

A lightweight and modern [Shodan API](https://www.shodan.io/) client written in TypeScript, powered by the [Deno runtime](https://deno.land/). 

This client is fully built based on the Shodan API documentation: https://developer.shodan.io/api

Please note that this project is independently developed and not officially affiliated with or endorsed by Shodan. 

> At the beginning, I just needed a small client to help me with some personal projects. There was already a small client called [shodan_deno](https://github.com/aldinp16/shodan_deno), but it was too limited for my needs. So I decided to create my own from scratch with a completely reinvented structure and share it on my GitHub.

## Note:
Some methods are not currently implemented. These include:

- `Internet scan` via `shodan/scan/internet` (requires an enterprise license)
- `Network Alerts`
- `Notifiers`
- `Bulk Data` (requires an enterprise license)
- `Manage Organization` (requires an enterprise license)
- `Data Streams` (requires an enterprise license)

## 🚀 Getting Started:

### ✅ Requirements:

- [Deno](https://deno.land/) 
- A valid [Shodan API key](https://account.shodan.io/)
- Internet connection

### 📦 Usage:

1. **Clone the repository:**

```bash
git clone https://github.com/Nde-Code/ShodanTS.git
```

2. **Go in the ShodanTS cloned folder:**

```bash
cd ShodanTS
```

3. **Run the client:**

```bash
deno run --allow-net example.ts
```

#### Or use the code below:

```ts
import { shodanClient } from "https://raw.githubusercontent.com/Nde-Code/ShodanTS/v1.0.0/mod.ts";

const client = new shodanClient("API_KEY");

const myAPIInfo = await client.getAPIPlanInformation();

console.log(myAPIInfo);

````

Run your file with the following command:

```bash
deno run --allow-net your_file.ts
```

### Make sure you've set your API key in the code.

> Currently, I haven’t created a package on [JSR](https://jsr.io/) or any other package platforms, but I might do so later.

## 📚 Documentation:

For full usage examples, configuration details, and API command references, check out the [docs.md](./docs.md) file in this repo.

## 🤝 Contributions Welcome:

Contributions are highly encouraged! Whether it's a new feature, bug fix, or improvement to the documentation:

1. Fork the repository
2. Create your feature branch:  
   ```bash
   git checkout -b my-feature
   ```
3. Commit your changes:  
   ```bash
   git commit -am 'Add new feature'
   ```
4. Push to the branch:  
   ```bash
   git push origin my-feature
   ```
5. Open a pull request

> Please ensure your code is clean, typed, and aligned with Deno best practices.


## 🛡️ License:

This project is licensed under the MIT License — see the [LICENSE](./LICENSE) file for details.


## 🧠 Credits

Built with ❤️ using TypeScript + Deno by [Nde-Code](https://nde-code.github.io/).
