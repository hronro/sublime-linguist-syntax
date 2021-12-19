import { parse as parseYaml } from "https://deno.land/std@0.118.0/encoding/yaml.ts";
import { join } from "https://deno.land/std@0.118.0/path/mod.ts";

import { IBuiltinLangInfo } from "./sublime-builtins.ts";

const targetPath = Deno.args[0];

const ignoredDirs = new Set([".github"]);

const result: Record<string, IBuiltinLangInfo> = Object.create(null);

const textDecoder = new TextDecoder("utf-8");

for await (const subDir of Deno.readDir(targetPath)) {
  if (subDir.isDirectory && !ignoredDirs.has(subDir.name)) {
    for await (const file of Deno.readDir(join(targetPath, subDir.name))) {
      if (file.isFile && file.name.endsWith(".sublime-syntax")) {
        const lang = file.name.split(".")[0];
        if (result[lang] != null) {
          console.warn(`\`${lang}\` already exsit!`);
        } else {
          const contentBytes = await Deno.readFile(
            join(targetPath, subDir.name, file.name),
          );
          const content = textDecoder.decode(contentBytes);
          const contentObj: { scope: string; file_extensions?: string[] } =
            parseYaml(
              content,
              // deno-lint-ignore no-explicit-any
            ) as any;
          result[lang] = {
            scope: contentObj.scope,
            extensions: contentObj.file_extensions,
          };
        }
      }
    }
  }
}

console.log(JSON.stringify(result, null, 4));
