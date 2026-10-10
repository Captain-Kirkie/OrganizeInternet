import { Category } from "@shared/category";

export async function createCategory(category: string) {
    console.log("creating category!!  ", category);

    const response = await fetch("/api/categories", {
        method: "POST",
        body: JSON.stringify({ name: category, description: category }),
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (!response.ok) {
        throw new Error("Failed to create category");
    }
    const data = await response.json();

    console.log("Category created successfully", data);
    return data as Category;
}