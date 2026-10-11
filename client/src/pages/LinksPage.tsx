import type { FormEvent } from "react";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router";
import type { Category } from "@shared/category";
import { createCategory } from "../api/categories";
import { createLink } from "../api/links";

const defaultCategoryImage = "/category-default.jpg";

function categoryImage(category: Category) {
  return category.imageUrl || defaultCategoryImage;
}

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
    <Container component="main" maxWidth="md" sx={{ py: 3 }}>
      {banner && (
        <Alert severity={banner.severity} onClose={() => setBanner(null)} sx={{ mb: 2 }}>
          {banner.message}
        </Alert>
      )}
      <Typography variant="h4" component="h1" gutterBottom>
        Categories
      </Typography>
      <Box
        sx={{
          maxHeight: 440,
          overflowY: "auto",
          mb: 4,
          pr: 0.5,
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
            gap: 2,
          }}
        >
          {categories.map((category) => (
            <Card
              key={category.id}
              component={RouterLink}
              to={`/categories/${category.id}`}
              sx={{
                textDecoration: "none",
                color: "inherit",
                borderRadius: 2,
                transition: "transform 160ms ease, box-shadow 160ms ease",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: 4,
                },
              }}
            >
              <CardMedia
                component="img"
                height="140"
                image={categoryImage(category)}
                alt=""
              />
              <CardContent>
                <Typography variant="subtitle1" component="h2">
                  {category.name}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>

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
