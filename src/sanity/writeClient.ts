import { createClient, type SanityClient } from "next-sanity";
import { sanityConfig } from "./config";

/**
 * Write-capable Sanity client for server-side mutations (e.g. creating subscribers).
 * Uses the API token and disables CDN since mutations require direct API access.
 *
 * Lazily initialized so the token is read at request time (important for
 * Cloudflare Workers where secrets may not be available at module-load time).
 */
let _writeClient: SanityClient | null = null;

export function getWriteClient(): SanityClient {
  if (!_writeClient) {
    const token = process.env.SANITY_API_TOKEN;
    if (!token) {
      throw new Error("SANITY_API_TOKEN is not set");
    }
    _writeClient = createClient({
      ...sanityConfig,
      useCdn: false,
      token,
    });
  }
  return _writeClient;
}
