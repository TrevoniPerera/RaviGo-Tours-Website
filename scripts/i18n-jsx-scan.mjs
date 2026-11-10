import fs from "node:fs";
import path from "node:path";

const TARGET_DIRS = [
  path.join(process.cwd(), "src", "components"),
  path.join(process.cwd(), "src", "app"),
];

// Allowed non-translatable brand names or universal symbols
const ALLOWED_LITERALS = new Set([
  "RaviGo Tours",
  "404",
  "•",
  "/",
  "+",
]);

function walkFiles(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkFiles(fullPath, files);
    } else if (fullPath.endsWith(".tsx")) {
      files.push(fullPath);
    }
  }
  return files;
}

const hits = [];

for (const dir of TARGET_DIRS) {
  if (!fs.existsSync(dir)) continue;
  for (const filePath of walkFiles(dir)) {
    const relPath = path.relative(process.cwd(), filePath).replace(/\\/g, "/");
    const content = fs.readFileSync(filePath, "utf8");
    const lines = content.split(/\r?\n/);

    lines.forEach((line, idx) => {
      const lineNo = idx + 1;

      // 1. Check user-facing JSX string attributes: aria-label="...", alt="...", title="...", placeholder="..."
      const attrRegex = /\b(aria-label|alt|title|placeholder)\s*=\s*"([^"]+)"/g;
      let match;
      while ((match = attrRegex.exec(line)) !== null) {
        const [, attrName, attrVal] = match;
        const trimmed = attrVal.trim();
        if (trimmed && /[A-Za-z]{2,}/.test(trimmed) && !ALLOWED_LITERALS.has(trimmed)) {
          hits.push({
            file: relPath,
            line: lineNo,
            kind: `attribute (${attrName})`,
            text: trimmed,
          });
        }
      }

      // 2. Check literal JSX text between > and < on the same line (ignoring expressions {...})
      const textRegex = />([^<>{]+)</g;
      while ((match = textRegex.exec(line)) !== null) {
        const rawText = match[1]
          .replace(/&[a-zA-Z0-9#]+;/g, "")
          .trim();
        if (
          rawText &&
          /[A-Za-z]{2,}/.test(rawText) &&
          !ALLOWED_LITERALS.has(rawText)
        ) {
          hits.push({
            file: relPath,
            line: lineNo,
            kind: "jsx-text",
            text: rawText,
          });
        }
      }
    });
  }
}

if (hits.length === 0) {
  console.log(
    "✓ JSX i18n scan passed: 0 untranslated literal strings found in src/components and src/app."
  );
} else {
  console.warn(`! JSX i18n scan found ${hits.length} literal string(s):`);
  for (const h of hits) {
    console.warn(`  - ${h.file}:${h.line} [${h.kind}] "${h.text}"`);
  }
  process.exit(1);
}

