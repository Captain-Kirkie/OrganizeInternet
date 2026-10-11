import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import List from "@mui/material/List";
import MuiLink from "@mui/material/Link";
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
        <List sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            {currentLinks.map((link) => (
                <LinkItem key={link.id} link={link} />
            ))}
        </List>
    );
}

export function LinkItem({ link }: { link: Link }) {
    return (
        <Card component="li" variant="outlined">
            <CardContent>
                <MuiLink href={link.url} target="_blank" rel="noopener noreferrer" variant="h6">
                    {link.title}
                </MuiLink>
                <Typography variant="body2" color="text.secondary">
                    {new Date(link.createdAt).toLocaleString()}
                </Typography>
            </CardContent>
        </Card>
    );
}
