// active sidebar item

import { cn } from "./utils";
export const active = (
  href: string,
  pathname: string,
  open?: boolean
): string =>
  cn({
    "bg-green-600 !text-white rounded-lg":
      (href === "/" && pathname === "/") || pathname.startsWith(href),
    "px-4 py-3": open,
    "px-2.5 py-2": !open,
  });

export function formatPackageType(text: string) {
  return text
    ?.replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}
