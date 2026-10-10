import React, { useState, useEffect } from 'react';
import type { Link } from '@shared/link';

type LinkListProps = {
    links: Link[]
}

export function LinkList({ links }: LinkListProps) {
    let [currentLinks, setCurrentLinks] = useState(links);

    useEffect(() => {
        setCurrentLinks(links);
    }, [links])


    if (currentLinks.length === 0) {
        return <p>No links found</p>;
    }

    return (
        <ul>
            {currentLinks.map((link) => {
                return <li key={link.id}>{link.title}</li>
            })}
        </ul>
    );
}
