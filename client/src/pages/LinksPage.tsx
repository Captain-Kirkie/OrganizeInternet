import type { FormEvent } from "react";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { LinkList } from "../components/LinkList";
import Box from "@mui/material/Box";

export function LinksPage() {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    console.log("handling submit!!  Save the link here!!  ");
  }

  function createCategory(category: string) {
    console.log("creating category!!  ", category);
  }

  function handleCreateCategory(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const category = String(new FormData(event.currentTarget).get("category") ?? "");
    createCategory(category);
  }

  return (
    <Container component="main" maxWidth="sm" sx={{ py: 2 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Links
      </Typography>
      <Stack direction="column" spacing={2}>
        <LinkList links={[]} />
        <Stack component="form" spacing={1.5} onSubmit={handleSubmit}>
          <TextField name="url" type="url" label="URL" />
          <TextField name="title" label="Title" />
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
    </Container>
  );
}
