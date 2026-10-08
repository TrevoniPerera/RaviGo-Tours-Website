import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Match all pathnames except:
  // - _next (Next.js internals)
  // - api routes
  // - static files with extensions (images, fonts, etc.)
  matcher: [
    "/((?!_next|api|.*\\..*).*)",
    // Also match root "/" to trigger locale redirect
    "/",
  ],
};
