import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

// Typed Link, redirect, useRouter, usePathname — use these instead of next/navigation
export const { Link, redirect, useRouter, usePathname, getPathname } =
  createNavigation(routing);
