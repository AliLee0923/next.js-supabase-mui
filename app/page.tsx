"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CssBaseline,
  Container,
  Box,
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
        <Card
          elevation={1}
          sx={{ borderRadius: "24px", backgroundColor: "#f8f1f6" }}
        >
          <Box
            sx={{
              position: "relative",
              width: "100%",
              pt: "56.25%",
              borderRadius: "24px",
              overflow: "hidden",
            }}
          >
            <CardMedia
              component="img"
              image={tile.imageURL}
              alt={tile.title}
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </Box>
          <CardContent>
            <Typography
              variant="subtitle1"
              sx={{ fontSize: "24px", fontWeight: 475, lineHeight: "32px" }}
              gutterBottom
            >
              {tile.title}
            </Typography>

            <Typography
              variant="body2"
              sx={{
                fontSize: "14px",
                fontWeight: 400,
                lineHeight: "20px",
              }}
            >
              {tile.subtitle}
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </>
  );
}
