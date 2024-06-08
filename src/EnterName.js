import { Box, Button, Card, CardContent, TextField, Typography } from "@mui/material";
import React from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";

import { ref, set } from "firebase/database";
import { database } from "./firebase"; // Import Firebase configuration

const EnterName = () => {
  const [name, setName] = React.useState("");

  const navigate = useNavigate();

  const handleJoinGame = () => {
    // Set the player's name directly as the key
    window.myGameName = name;

    set(ref(database, `games/${window.gamePin}/players/${name}`), true)
      .then(() => {
        navigate("/joined-game");
      })
      .catch((error) => {
        console.error("Error joining game:", error);
      });
  };

  return (
    <Box
      sx={{
        height: "100dvh",
        background:
          "linear-gradient(16deg, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%)",
        backgroundSize: "200% 200%",
        animation: "gradientMove 15s ease infinite",
        fontFamily: "Yanone Kaffeesatz, sans-serif",
      }}
    >
      <Box
        sx={{
          height: "70dvh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "end",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h2"
          component="div"
          fontWeight="600"
          sx={{ marginBottom: 2 }}
        >
          Enter your name!
        </Typography>
        <Card variant="plain" sx={{ minWidth: 275, borderRadius: 2.5 }}>
          <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
            <TextField
              label={name === "" ? "Enter name" : ""}
              variant="outlined"
              fullWidth
              margin="normal"
              value={name}
              onChange={(e) => setName(e.target.value)}
              InputLabelProps={{
                style: {
                  fontFamily: "Yanone Kaffeesatz",
                  fontWeight: 700,
                  textAlign: "center", // Center the label text
                  width: "100%", // Ensure full width for centering
                  fontSize: 22,
                },
                shrink: false,
              }}
              inputProps={{
                style: {
                  fontFamily: "Yanone Kaffeesatz",
                  fontWeight: 700,
                  textAlign: "center", // Center the input text
                  fontSize: 22,
                },
              }}
              color="buttonOutline"
              focused
              sx={{ marginTop: 0 }}
            />
            <Button
              variant="contained"
              color="connectButton"
              fullWidth
              onClick={handleJoinGame}
              fontSize="large"
              disableElevation
              component={RouterLink}
              to="/joined-game"
              sx={{ fontSize: 25 }}
            >
              Enter game!
            </Button>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default EnterName;
