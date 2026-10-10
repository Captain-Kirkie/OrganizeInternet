import type { FormEvent } from "react";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { LinkList } from "../components/LinkList";

export function LinksPage() {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    console.log("handling submit!!  Save the link here!!  ");
  }

  return (
    <Container component="main" maxWidth="sm" sx={{ py: 2 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Links
      </Typography>
      <LinkList links={[]} />
      <Stack component="form" spacing={1.5} onSubmit={handleSubmit}>
        <TextField name="url" type="url" label="URL" />
        <TextField name="title" label="Title" />
        <Button type="submit" variant="contained">
          Save
        </Button>
      </Stack>
    </Container>
  );
}
