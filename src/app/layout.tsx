import type { ReactNode } from "react";
import "./globals.css";

type Props = {
  children: ReactNode;
};

// Since we have a `[locale]` dynamic segment wrapping all pages,
// the html and body tags are defined in src/app/[locale]/layout.tsx.
// This root layout serves as a passthrough.
export default function RootLayout({ children }: Props) {
  return children;
}
