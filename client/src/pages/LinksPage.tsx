import type { FormEvent } from "react";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { LinkList } from "../components/LinkList";
import { useState, useEffect } from "react";
import type { Category } from "@shared/category";
import { createCategory } from "../api/categories";
import Alert from "@mui/material/Alert";
import MenuItem from "@mui/material/MenuItem";

export function LinksPage() {
  async function handleCreateCategory(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const category = String(new FormData(event.currentTarget).get("category") ?? "");

    const newCategory = await createCategory(category);
    setCategories([...categories, newCategory]);
  }
  // state
  const [categories, setCategories] = useState<Category[]>([]);
  const [banner, setBanner] = useState<{ severity: "success" | "error"; message: string } | null>(null);


  useEffect(() => {
    // intially fetch the categories from the server
    fetch("/api/categories").then(response => response.json()).then((data: { categories: Category[] }) => {
      setCategories(data.categories);
    });
  }, [])


  async function createLink(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const response = await fetch("/api/links", {
      method: "POST",
      body: JSON.stringify({ url: formData.get("url"), title: formData.get("title"), categoryId: formData.get("categoryId") }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      setBanner({ severity: "error", message: "Failed to create link" });
    }
    else {
      const data = await response.json();
      console.log("Link created successfully", data);
      setBanner({ severity: "success", message: `Link successfully created` });
    }

    setTimeout(() => {
      setBanner(null);
    }, 3000);
  }

  return (
    <Container component="main" maxWidth="sm" sx={{ py: 2 }}>
      {banner && (
        <Alert severity={banner.severity} onClose={() => setBanner(null)} sx={{ mb: 2 }}>
          {banner.message}
        </Alert>
      )}
      <Typography variant="h4" component="h1" gutterBottom>
        Links
      </Typography>
      <Stack direction="column" spacing={2}>
        <LinkList links={[]} />
        <Stack spacing={6}>
          <Stack component="form" spacing={1.5} onSubmit={createLink}>
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
