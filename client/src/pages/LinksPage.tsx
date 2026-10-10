import type { FormEvent } from "react";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { LinkList } from "../components/LinkList";
import { useState, useEffect } from "react";
import type { Category } from "@shared/category";

import MenuItem from "@mui/material/MenuItem";

export function LinksPage() {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log("handling submit!!  Save the link here!!  ");
  }

  async function createCategory(category: string) {
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
    setCategories([...categories, { id: data.id, name: category, description: category }]);
  }

  function handleCreateCategory(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const category = String(new FormData(event.currentTarget).get("category") ?? "");
    createCategory(category);
  }

  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    // intially fetch teh categories from the server
    fetch("/api/categories").then(response => response.json()).then((data: { categories: Category[] }) => {
      setCategories(data.categories);
    });
  }, [])

  return (
    <Container component="main" maxWidth="sm" sx={{ py: 2 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Links
      </Typography>
      <Stack direction="column" spacing={2}>
        <LinkList links={[]} />
        <Stack spacing={6}>
          <Stack component="form" spacing={1.5} onSubmit={handleSubmit}>
            <TextField name="url" type="url" label="URL" />
            <TextField name="title" label="Title" />

            <TextField name="categoryId" label="Category" select defaultValue="">
              {categories.map((c: Category) => {
                return <MenuItem key={c.id} value={c.id}>{c.description}</MenuItem>
              })}
            </TextField>
            <Button type="submit" variant="contained">
              Save
            </Button>
          </Stack>
          <Stack component="form" spacing={1.5} onSubmit={handleCreateCategory}>
            <TextField name="category" label="Create a new category" />
            <Button type="submit" variant="contained">
              Create Category
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
}
