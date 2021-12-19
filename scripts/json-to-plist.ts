export function jsonToPlist(json: Record<string, unknown>) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
${toPlistString(json)}
</plist>
`;
}

function toISODateString(date: Date) {
  return `${date.getUTCFullYear()}-${
    (date.getUTCMonth() + 1).toString().padStart(2, "0")
  }-${date.getUTCDate().toString().padStart(2, "0")}T${
    date.getUTCHours().toString().padStart(2, "0")
  }:${date.getUTCMinutes().toString().padStart(2, "0")}:${
    date.getUTCSeconds().toString().padStart(2, "0")
  }Z`;
}

const xmlEscapeMap = {
  ">": "&gt;",
  "<": "&lt;",
  "'": "&apos;",
  '"': "&quot;",
  "&": "&amp;",
};
function xmlEscape(input: string) {
  return input.replace(
    /([&"<>'])/g,
    (_, item: keyof typeof xmlEscapeMap) => xmlEscapeMap[item],
  );
}

const SINGLE_INDENT = "\t";

function toPlistString(value: unknown, indentLevel = 0): string {
  const indent = Array.from({ length: indentLevel }, () => SINGLE_INDENT).join(
    "",
  );
  switch (typeof value) {
    case "boolean": {
      return `${indent}<${value} />`;
    }

    case "number": {
      const tagType = (value % 1 === 0) ? "integer" : "real";
      return `${indent}<${tagType}>${value}<${tagType}/>`;
    }

    case "string": {
      return `${indent}<string>${xmlEscape(value)}</string>`;
    }

    case "undefined":
    case "bigint":
    case "symbol":
    case "function": {
      throw new Error("Unsupported data type");
    }

    default: {
      if (value === null) {
        throw new Error("Unsupported data type");
      }

      if (value instanceof ArrayBuffer) {
        throw new Error("Not implement yet");
      }

      if (Array.isArray(value)) {
        return `${indent}<array>
${value.map((item) => toPlistString(item, indentLevel + 1)).join("\n")}
${indent}</array>`;
      }

      if (value instanceof Date) {
        return `${indent}<date>${toISODateString(value)}</date>`;
      }

      // deno-lint-ignore no-explicit-any
      const obj: Record<string, unknown> = value as any;

      return `${indent}<dict>
${
        Object.keys(obj).map((key) =>
          `${indent}${SINGLE_INDENT}<key>${key}</key>\n${
            toPlistString(obj[key], indentLevel + 1)
          }`
        ).join("\n")
      }
${indent}</dict>`;
    }
  }
}
