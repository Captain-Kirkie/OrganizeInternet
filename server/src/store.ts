import type { Link } from "@shared/link";

export const links: Link[] = [];

export function listLinks(): Link[] {
  throw new Error("not implemented");
}

export function createLink(_url: string, _title?: string): Link {
  throw new Error("not implemented");
}

export function deleteLink(_id: string): void {
  throw new Error("not implemented");
}
