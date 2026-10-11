import type { FormEvent } from "react";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useState, useEffect } from "react";
import type { Category } from "@shared/category";
import { createCategory } from "../api/categories";
import Alert from "@mui/material/Alert";
import MenuItem from "@mui/material/MenuItem";
import MuiLink from "@mui/material/Link";
import { createLink } from "../api/links";
import { Link as RouterLink } from "react-router";

function clearForm(form: HTMLFormElement) {
  form.reset();
}

export function LinksPage() {
  async function handleCreateCategory(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const category = String(new FormData(form).get("category") ?? "");

    const newCategory = await createCategory(category);
    setCategories([...categories, newCategory]);
    clearForm(form);
  }
  const [categories, setCategories] = useState<Category[]>([]);
  const [banner, setBanner] = useState<{ severity: "success" | "error"; message: string } | null>(null);

  useEffect(() => {
    fetch("/api/categories").then(response => response.json()).then((data: { categories: Category[] }) => {
      setCategories(data.categories);
    });
  }, [])


  async function handleCreateLink(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      await createLink(
        String(formData.get("url") ?? ""),
        String(formData.get("title") ?? ""),
        String(formData.get("categoryId") ?? ""),
      );
      setBanner({ severity: "success", message: `Link successfully created` });
      clearForm(form);
    } catch {
      setBanner({ severity: "error", message: "Failed to create link" });
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
      <Stack spacing={1} sx={{ mb: 4 }}>
        {categories.map((category) => (
          <MuiLink
            key={category.id}
            component={RouterLink}
            to={`/categories/${category.id}`}
            underline="hover"
          >
            {category.name}
          </MuiLink>
        ))}
      </Stack>

      <Stack direction="column" spacing={2}>
        <Stack spacing={6}>
          <Stack component="form" spacing={1.5} onSubmit={handleCreateLink}>
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
