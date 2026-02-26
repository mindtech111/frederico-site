import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  matcher: [
    // Match all paths except Sanity Studio, API routes, and static files
    "/((?!studio|api|_next|_vercel|.*\\..*).*)",
  ],
};
