import { Box, Button, List, ListItem, ListItemText, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { alpha } from "@mui/material";
import { grey } from "@mui/material/colors";
import { onValue, ref, update } from "firebase/database";
import { database } from "./firebase"; // Import Firebase configuration

import { words_english, words_swedish } from "./words";

const NewGame = () => {
  const navigate = useNavigate();
  const [players, setPlayers] = useState([]);
  const [language, setLanguage] = React.useState("sv");
  const newGamePin = window.gamePin;

  useEffect(() => {
    const playersRef = ref(database, `games/${newGamePin}/players`);

    onValue(playersRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setPlayers(Object.keys(data));
      }
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startGame = () => {
    const gameRef = ref(database, `games/${newGamePin}`);

    const randomNumber = Math.floor(Math.random() * players.length);
    const selectedPlayer = players[randomNumber];

    // Update the game started status and the selected player
    const updates = {};
    updates[`started`] = true;
    updates[`players/${selectedPlayer}`] = false;

    console.log(language);

    if (language === "sv") {
      const randomWord = words_swedish[Math.floor(Math.random() * words_swedish.length)];
      updates[`word`] = randomWord.toString();
    } else {
      const randomWord = words_english[Math.floor(Math.random() * words_english.length)];
      updates[`word`] = randomWord.toString();
    }

    update(gameRef, updates)
      .then(() => {
        console.log(`Game started with pin: ${newGamePin}`);

        navigate("/game-started");
        // Navigate or update state as needed after the game is created
      })
      .catch((error) => {
        console.error("Error creating game:", error);
      });
  };

  const handleChange = (newLanguage) => {
    setLanguage(newLanguage);
  };

  return (
    <Box
      sx={{
        height: "100dvh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background:
          "radial-gradient( circle farthest-corner at 1.5% 1.4%,  rgba(159,227,255,1) 0%, rgba(255,177,219,1) 100.2% );linear-gradient( 109.6deg,  rgba(177,173,219,1) 11.2%, rgba(245,226,226,1) 91.1% )",
        backgroundSize: "200% 200%",
        animation: "gradientMove 15s ease infinite",
      }}
    >
      <Typography variant="h3" component="div" fontWeight="600" sx={{ marginBottom: 1 }}>
        Game PIN: {newGamePin}
      </Typography>
      <Typography variant="h4" component="div" fontWeight="500" sx={{ marginBottom: 4 }}>
        {players.length === 0
          ? "Waiting for players to join"
          : `${players.length} player${players.length > 1 ? "s" : ""} have joined`}
      </Typography>

      <List
        sx={{
          width: "1000px",
          maxWidth: "75%",
          bgcolor: alpha(grey[900], 0.5),
          position: "relative",
          overflow: "auto",
          height: "50dvh",
          "& ul": { padding: 0 },
          marginBottom: 2,
          borderRadius: 4,
        }}
        subheader={<li />}
      >
        <li key={"test"}>
          <ul>
            {players.map((item) => (
              <ListItem key={"test"}>
                <ListItemText
                  primaryTypographyProps={{ fontSize: 30, style: { color: "white" } }}
                  primary={`${item}`}
                />
              </ListItem>
            ))}
          </ul>
        </li>
      </List>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          alignContent: "center"
        }}
      >
        <Typography
          sx={{
            fontSize: 60,
            cursor: "pointer",
            filter: language === "sv" ? "" : "grayscale(100%)",
            transition: "color 0.3s",
            "-webkit-tap-highlight-color": "transparent", // Remove tap highlight color on mobile
          }}
          onClick={() => handleChange("sv")}
        >
          🇸🇪
        </Typography>
        <Typography
          sx={{
            fontSize: 60,
            cursor: "pointer",
            filter: language === "en" ? "" : "grayscale(100%)",
            transition: "color 0.3s",
            marginLeft: 2,
            marginRight: 2,
            "-webkit-tap-highlight-color": "transparent", // Remove tap highlight color on mobile
          }}
          onClick={() => handleChange("en")}
        >
          🇺🇸
        </Typography>

        <Button
          variant="contained"
          color="startGameButton"
          fontSize="large"
          disableElevation
          sx={{ fontSize: 25 }}
          onClick={startGame}
        >
          Start game
        </Button>
      </Box>
    </Box>
  );
};

/*

<SvgIcon alignment="end" sx={{width:80}}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            id="flag-icons-se"
            viewBox="0 0 640 480"
          >
            <path fill="#005293" d="M0 0h640v480H0z" />
            <path fill="#fecb00" d="M176 0v192H0v96h176v192h96V288h368v-96H272V0z" />
          </svg>
        </SvgIcon>
        <SvgIcon>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            id="flag-icons-us"
            viewBox="0 0 640 480"
          >
            <path fill="#bd3d44" d="M0 0h640v480H0" />
            <path
              stroke="#fff"
              stroke-width="37"
              d="M0 55.3h640M0 129h640M0 203h640M0 277h640M0 351h640M0 425h640"
            />
            <path fill="#192f5d" d="M0 0h364.8v258.5H0" />
            <marker id="us-a" markerHeight="30" markerWidth="30">
              <path fill="#fff" d="m14 0 9 27L0 10h28L5 27z" />
            </marker>
            <path
              fill="none"
              marker-mid="url(#us-a)"
              d="m0 0 16 11h61 61 61 61 60L47 37h61 61 60 61L16 63h61 61 61 61 60L47 89h61 61 60 61L16 115h61 61 61 61 60L47 141h61 61 60 61L16 166h61 61 61 61 60L47 192h61 61 60 61L16 218h61 61 61 61 60z"
            />
          </svg>
        </SvgIcon>

        */
export default NewGame;
