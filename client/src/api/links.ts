import type { Link } from "@shared/link";

export async function fetchLinks(categoryId?: string): Promise<Link[]> {
  const path = categoryId
    ? `/api/links?categoryId=${encodeURIComponent(categoryId)}`
    : "/api/links";
  try {
    const response = await fetch(path);
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
  url: string,
  title: string,
  categoryId: string,
): Promise<Link> {
  const response = await fetch("/api/links", {
    method: "POST",
    body: JSON.stringify({ url, title, categoryId }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Failed to create link");
  }
  return (await response.json()) as Link;
}

export async function deleteLink(_id: string): Promise<void> {
  throw new Error("not implemented");
}
