import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Match all pathnames except:
  // - _next (Next.js internals)
  // - api and go routes
  // - static files with extensions (images, fonts, etc.)
  matcher: [
    "/((?!_next|api|go|.*\\..*).*)",
    // Also match root "/" to trigger locale redirect
    "/",
  ],
};
