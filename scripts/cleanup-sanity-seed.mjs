import fs from "node:fs";
import path from "node:path";
import { createClient } from "next-sanity";

function loadEnvFile(filename) {
  const envPath = path.join(process.cwd(), filename);
  if (!fs.existsSync(envPath)) return;

  for (const line of fs.readFileSync(envPath, "utf8").split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;

    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    if (!process.env[key]) {
      process.env[key] = value;
    }
  }
}

loadEnvFile(".env.local");
loadEnvFile(".env");

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01";
const token = process.env.SANITY_API_TOKEN;

if (!projectId || !dataset || !token) {
  console.error(
    "Missing Sanity env vars. Set NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, and SANITY_API_TOKEN in .env.local"
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false,
});

const REMOVED_TYPES = [
  "aboutPage",
  "fightingStyle",
  "boxingLegend",
  "trainingSchool",
  "liveStream",
];

async function main() {
  console.log(`Cleaning unused seed document types from "${dataset}"...\n`);

  const documents = await client.fetch(
    `*[_type in $types]{ _id, _type, title, name, category }`,
    { types: REMOVED_TYPES }
  );

  if (documents.length === 0) {
    console.log("No matching documents found. Studio is already clean.");
    return;
  }

  console.log(`Found ${documents.length} document(s) to delete:\n`);
  for (const doc of documents) {
    const label =
      doc.title || doc.name || doc.category || doc._id;
    console.log(`  - [${doc._type}] ${label} (${doc._id})`);
  }

  console.log("\nDeleting...");

  for (const doc of documents) {
    await client.delete(doc._id);
  }

  console.log(`\nDeleted ${documents.length} document(s).`);
  console.log("Sanity Studio should no longer show the removed content types after a refresh.");
}

main().catch((error) => {
  console.error("\nCleanup failed:");
  console.error(error);
  process.exit(1);
});
