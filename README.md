# Sublime Linguist Syntax

A collection of high quality and well-maintained syntax definations that used by [GitHub.com](https://github.com/github/linguist).

## How to generate(update) syntaxes?

- Install [Deno](https://deno.land).
- Clone this repo.
- Run `deno run ./scripts/generate.ts <path-to-store-syntaxes>`. Normally `<path-to-store-syntaxes>` should be `./syntaxes`, but you can change it to whatever you want if you wish.
- Done.

When running `generate.ts`, thanks to the Deno's permission API, the script can not access any network and disks without your permission. So there will be an interactive prompt to ask permissions for:

- network access to `github.com`, `api.github.com`, `objects.githubusercontent.com`, `raw.githubusercontent.com`, for download [linguist](https://github.com/github/linguist).
- write and read permissions to `/tmp`, in order to store the downloaded assets and process them.
- write permission to `<path-to-store-syntaxes>`

If you don't like prompts, you can pass them in the CLI arguments like this:

```
deno run --allow-net=github.com,api.github.com,objects.githubusercontent.com,raw.githubusercontent.com --allow-read=/tmp --allow-write=/tmp,<path-to-store-syntaxes> scripts/generate.ts <path-to-store-syntaxes>
```
