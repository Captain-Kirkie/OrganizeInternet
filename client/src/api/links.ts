import type { Link } from "@shared/link";

export async function fetchLinks(): Promise<Link[]> {
  throw new Error("not implemented");
}

export async function createLink(
  _url: string,
  _title?: string,
): Promise<Link> {
  throw new Error("not implemented");
}

export async function deleteLink(_id: string): Promise<void> {
  throw new Error("not implemented");
}
