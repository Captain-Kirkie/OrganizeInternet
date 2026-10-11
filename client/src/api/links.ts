import type { Link } from "@shared/link";

export async function fetchLinks(): Promise<Link[]> {
  try {
    const response = await fetch("/api/links");
    if (!response.ok) {
      throw new Error("Failed to fetch links");
    }
    const data = await response.json();
    return data as Link[];
  } catch (error) {
    console.error("Error fetching links", error);
    throw error;
  }
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
