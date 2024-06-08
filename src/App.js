import {
  Box,
  Button,
  Card,
  CardContent,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { grey, lightBlue, purple, red } from "@mui/material/colors";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import * as React from "react";
import "./App.css"; // Import the CSS file where the font is defined

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import EnterName from "./EnterName";
import GameStarted from "./GameStarted";
import JoinedGame from "./JoinedGame"; // Import the Joined Game component
import NewGame from "./NewGame"; // Import the New Game component

import { ref, set } from "firebase/database";
import { useNavigate } from "react-router-dom";
import { database } from "./firebase"; // Import Firebase configuration


const theme = createTheme({
  typography: {
    fontFamily: "Yanone Kaffeesatz, sans-serif",
  },
  palette: {
    primary: {
      main: purple[500],
    },
    secondary: {
      main: "#f44336",
    },
    buttonOutline: {
      main: grey[500],
    },
    connectButton: {
      main: grey[800],
      contrastText: "#fff", //button text white instead of black
    },
    startGameButton: {
      main: lightBlue[800],
      contrastText: "#fff", //button text white instead of black
    },
    goback: {
      main: red[600],
    },
  },
});

function Home() {
  const [gamePin, setGamePin] = React.useState("");

  const navigate = useNavigate();

  const handleJoinGame = () => {
    window.gamePin = gamePin;
    navigate("/enter-name");
  };

  const handleCreateGame = () => {
    const newGamePin = Math.floor(100000 + Math.random() * 900000).toString();
    const gameRef = ref(database, `games/${newGamePin}`);

    window.gamePin = newGamePin;
    window.myGameName = "Game Creator";

    set(gameRef, {
      players: {
        "Game Creator": true,
      },
    })
      .then(() => {
        navigate("/new-game");
        // Navigate or update state as needed after the game is created
      })
      .catch((error) => {
        console.error("Error creating game:", error);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          height: "100dvh",
          background: "linear-gradient(-45deg, rgba(63,94,251,1), rgba(252,70,107,1))",
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
            variant="h1"
            component="div"
            fontWeight="600"
            sx={{ marginBottom: 2 }}
          >
            WordBluff!
          </Typography>
          <Card variant="plain" sx={{ minWidth: 275, borderRadius: 2.5 }}>
            <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
              <TextField
                label={gamePin === "" ? "Game PIN" : ""}
                variant="outlined"
                fullWidth
                margin="normal"
                value={gamePin}
                onChange={(e) => setGamePin(e.target.value)}
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
                sx={{ fontSize: 25 }}
              >
                Join
              </Button>
            </CardContent>
          </Card>
        </Box>
        <Box
          sx={{
            height: "30dvh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Link
            onClick={handleCreateGame}
            color="inherit"
            variant="h6"
            sx={{ cursor: "pointer" }}
          >
            Start a new game here
          </Link>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new-game" element={<NewGame />} />
          <Route path="/joined-game" element={<JoinedGame />} />
          <Route path="/enter-name" element={<EnterName />} />
          <Route path="/game-started" element={<GameStarted />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
