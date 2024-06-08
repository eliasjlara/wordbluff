import { Box, CircularProgress, Typography } from "@mui/material";
import React, { useEffect } from "react";

import { onValue, ref } from "firebase/database";
import { database } from "./firebase"; // Import Firebase configuration

import { green, red } from "@mui/material/colors";

const GameStarted = () => {
  const [word, setWord] = React.useState("");
  const [imposter, setImposter] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  const checkForGameStart = () => {
    const playerRef = ref(
      database,
      `games/${window.gamePin}/players/${window.myGameName}`
    );
    const wordRef = ref(database, `games/${window.gamePin}/word`);

    console.log(window.myGameName);
    onValue(playerRef, (snapshot) => {
      const data = snapshot.val();

      if (data === true) {
        onValue(wordRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            setWord(data);
          }
        });
      } else {
        setImposter(true);
      }
      setLoading(false);
    });
  };

  useEffect(() => {
    checkForGameStart();
  }, []);

  return loading ? (
    <CircularProgress color="inherit" />
  ) : (
    <Box
      sx={{
        height: "100dvh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: imposter
          ? "linear-gradient(30deg, rgba(255,82,0,1) 0%, rgba(204,29,10,1) 23%, rgba(195,22,10,1) 35%, rgba(161,16,13,1) 49%, rgba(99,11,18,1) 66%, rgba(65,8,23,1) 82%, rgba(34,3,18,1) 93%, rgba(23,1,15,1) 100%)"
          : "linear-gradient(100deg, rgba(63,251,201,1) 0%, rgba(235,250,66,1) 100%)",
        backgroundSize: "150% 150%",
        animation: "gradientMove 10s ease infinite",
      }}
    >
      <Typography
        variant="h2"
        component="div"
        fontWeight="600"
        color={imposter ? red[100] : green[700]}
        sx={{ marginBottom: 2 }}
        align="center"
        width="80%"
      >
        {imposter ? (
          <>
            You are the imposter.
            <br />
            Good luck 💀
          </>
        ) : (
          <>
            You are safe 💚
            <br />
            The word is:{" "}
            <Box component="span" sx={{ textDecoration: "underline" }}>
              {word}
            </Box>
          </>
        )}
      </Typography>
    </Box>
  );
};

export default GameStarted;
