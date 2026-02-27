import { createClient } from "next-sanity";
import { sanityConfig } from "./config";

/**
 * Write-capable Sanity client for server-side mutations (e.g. creating subscribers).
 * Uses the API token and disables CDN since mutations require direct API access.
 */
export const writeClient = createClient({
  ...sanityConfig,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});
