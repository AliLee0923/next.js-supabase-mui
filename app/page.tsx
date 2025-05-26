"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CssBaseline,
  Container,
} from "@mui/material";

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
    <>
      <CssBaseline />
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Card elevation={3} sx={{ borderRadius: 3 }}>
          <CardMedia
            component="img"
            height="300"
            image={tile.imageURL}
            alt={tile.title}
            sx={{ borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
          />
          <CardContent>
            <Typography variant="h5" gutterBottom>
              {tile.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {tile.subtitle}
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </>
  );
}
