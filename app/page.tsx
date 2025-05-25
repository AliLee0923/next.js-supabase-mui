"use client";

import { useEffect, useState } from "react";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";

export default function Home() {
  const [tile, setTile] = useState<any>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/test")
      .then((res) => res.json())
      .then((data) => {
        if (data.error) setError(data.error);
        else setTile(data);
      })
      .catch((err) => setError(err.message));
  }, []);

  if (error) return <p>Error: {error}</p>;
  if (!tile) return <p>Loading...</p>;

  return (
    <Card sx={{ maxWidth: 600, margin: "2rem auto" }} elevation={3}>
      <CardMedia
        component="img"
        height="300"
        image={tile.imageURL}
        alt={tile.title}
      />
      <CardContent>
        <Typography variant="h5">{tile.title}</Typography>
        <Typography variant="body2" color="text.secondary">
          {tile.subtitle}
        </Typography>
      </CardContent>
    </Card>
  );
}
