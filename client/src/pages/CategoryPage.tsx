import { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import MuiLink from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { Link as RouterLink, useParams } from "react-router";
import { fetchLinks } from "../api/links";
import { LinkList } from "../components/LinkList";
import type { Link } from "@shared/link";

export function CategoryPage() {
  const { categoryId } = useParams();
  const [links, setLinks] = useState<Link[]>([]);

  useEffect(() => {
    if (!categoryId) {
      return;
    }
    fetchLinks(categoryId).then(setLinks);
  }, [categoryId]);

  return (
    <Container component="main" maxWidth="sm" sx={{ py: 2 }}>
      <MuiLink component={RouterLink} to="/" underline="hover">
        Home
      </MuiLink>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mt: 2 }}>
        Links
      </Typography>
      <LinkList links={links} />
    </Container>
  );
}
