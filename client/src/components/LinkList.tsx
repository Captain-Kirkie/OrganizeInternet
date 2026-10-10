import { useEffect, useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import type { Link } from "@shared/link";

type LinkListProps = {
  links: Link[];
};

export function LinkList({ links }: LinkListProps) {
  const [currentLinks, setCurrentLinks] = useState(links);

  useEffect(() => {
    setCurrentLinks(links);
  }, [links]);

  if (currentLinks.length === 0) {
    return <Typography>No links found</Typography>;
  }

  return (
    <List>
      {currentLinks.map((link) => (
        <ListItem key={link.id}>
          <ListItemText primary={link.title} />
        </ListItem>
      ))}
    </List>
  );
}
