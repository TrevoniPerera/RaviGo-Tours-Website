import fs from "node:fs";
import path from "node:path";

const MESSAGES_DIR = path.join(process.cwd(), "messages");
const SOURCE_LOCALE = "en";
const TARGET_LOCALES = ["de", "fr", "ja", "it"];

// Brand names, proper place names, and universal tokens allowed to match English
const IDENTICAL_VALUE_ALLOWLIST = new Set([
  "nav.home", // "Home" in IT
  "nav.contact", // "Contact" in FR
  "nav.whatsapp", // "WhatsApp"
  "nav.email", // "Email" in IT
  "nav.logoAlt", // "RaviGo Tours Logo" in DE
  "experience.years", // "20+"
  "destinations.sigiriya.name", // "Sigiriya"
  "destinations.nuwara-eliya.name", // "Nuwara Eliya"
  "destinations.mirissa.name", // "Mirissa"
  "destinations.anuradhapura.name", // "Anuradhapura"
  "destinations.polonnaruwa.name", // "Polonnaruwa"
  "contact.form.groupSizePlaceholder", // "2"
  "footer.copyright", // "© {year} RaviGo Tours. All rights reserved." in JA
]);

function flattenMessages(obj, prefix = "", result = new Map()) {
  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (Array.isArray(value)) {
      result.set(fullKey, { type: "array", length: value.length, value });
      value.forEach((item, idx) => {
        if (typeof item === "object" && item !== null) {
          flattenMessages(item, `${fullKey}[${idx}]`, result);
        } else {
          result.set(`${fullKey}[${idx}]`, { type: typeof item, value: item });
        }
      });
    } else if (typeof value === "object" && value !== null) {
      flattenMessages(value, fullKey, result);
    } else {
      result.set(fullKey, { type: typeof value, value });
    }
  }
  return result;
}

const enPath = path.join(MESSAGES_DIR, `${SOURCE_LOCALE}.json`);
const enData = JSON.parse(fs.readFileSync(enPath, "utf8"));
const enFlat = flattenMessages(enData);

let hasErrors = false;
let totalWarnings = 0;

for (const locale of TARGET_LOCALES) {
  const filePath = path.join(MESSAGES_DIR, `${locale}.json`);
  if (!fs.existsSync(filePath)) {
    console.error(`[ERROR] Missing locale file: messages/${locale}.json`);
    hasErrors = true;
    continue;
  }

  const localeData = JSON.parse(fs.readFileSync(filePath, "utf8"));
  const localeFlat = flattenMessages(localeData);

  const missingKeys = [];
  const extraKeys = [];
  const typeMismatches = [];
  const identicalWarnings = [];

  for (const [key, enEntry] of enFlat.entries()) {
    if (!localeFlat.has(key)) {
      missingKeys.push(key);
      continue;
    }
    const locEntry = localeFlat.get(key);
    if (enEntry.type !== locEntry.type) {
      typeMismatches.push(`${key} (expected ${enEntry.type}, got ${locEntry.type})`);
      continue;
    }
    if (
      enEntry.type === "string" &&
      enEntry.value.trim() === locEntry.value.trim() &&
      !IDENTICAL_VALUE_ALLOWLIST.has(key)
    ) {
      identicalWarnings.push(`${key}: "${locEntry.value}"`);
    }
  }

  for (const key of localeFlat.keys()) {
    if (!enFlat.has(key)) {
      extraKeys.push(key);
    }
  }

  if (missingKeys.length > 0) {
    hasErrors = true;
    console.error(`[ERROR] [${locale}] Missing ${missingKeys.length} key(s):`);
    for (const k of missingKeys) console.error(`  - ${k}`);
  }

  if (extraKeys.length > 0) {
    hasErrors = true;
    console.error(`[ERROR] [${locale}] Extra ${extraKeys.length} key(s) not in en.json:`);
    for (const k of extraKeys) console.error(`  + ${k}`);
  }

  if (typeMismatches.length > 0) {
    hasErrors = true;
    console.error(`[ERROR] [${locale}] Type mismatch on ${typeMismatches.length} key(s):`);
    for (const m of typeMismatches) console.error(`  ! ${m}`);
  }

  if (identicalWarnings.length > 0) {
    totalWarnings += identicalWarnings.length;
    console.warn(
      `[WARN] [${locale}] ${identicalWarnings.length} value(s) identical to English:`
    );
    for (const w of identicalWarnings) console.warn(`  ~ ${w}`);
  }
}

if (hasErrors) {
  console.error("\n✗ i18n check failed due to missing, extra, or mismatched keys.");
  process.exit(1);
}

console.log(
  `✓ i18n check passed across [${ SOURCE_LOCALE }, ${ TARGET_LOCALES.join(", ") }] (${enFlat.size} entries checked, ${totalWarnings} warning(s)).`
);

