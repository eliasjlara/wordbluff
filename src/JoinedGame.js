import { Box, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { onValue, ref } from "firebase/database";
import { database } from "./firebase"; // Import Firebase configuration

const JoinedGame = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const playersRef = ref(database, `games/${window.gamePin}/started`);

    onValue(playersRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        navigate("/game-started");
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box
      sx={{
        height: "100dvh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background:
          "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 10%, rgba(6,71,162,1) 21%, rgba(108,230,255,1) 42%, rgba(4,68,188,1) 61%, rgba(148,7,117,1) 97%)",
        backgroundSize: "800% 800%",
        animation: "gradientMove 10s ease infinite",
      }}
    >
      <Typography
        variant="h2"
        component="div"
        fontWeight="600"
        sx={{ color: "white" }}
        width="80%"
        align="center"
      >
        Waiting for game to start!
      </Typography>
    </Box>
  );
};

/*
      <Button
        variant="contained"
        color="secondary"
        fontSize="large"
        disableElevation
        sx={{ fontSize: 15 }}
        onClick={handleBackToHome}
      >
        Not the right game? Go back to Home
      </Button>
*/
export default JoinedGame;
