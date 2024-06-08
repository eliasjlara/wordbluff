import * as React from "react";
import {
  Box,
  Button,
  Typography,
  TextField,
  Card,
  CardContent,
  Link,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./App.css"; // Import the CSS file where the font is defined
import { purple, grey, lightBlue } from "@mui/material/colors";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link as RouterLink,
} from "react-router-dom";
import NewGame from "./NewGame"; // Import the New Game component

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
      main: lightBlue[700],
      contrastText: "#fff", //button text white instead of black
    },
  },
});

function Home() {
  //const [lobbyCode, setLobbyCode] = React.useState("");
  const [gamePin, setGamePin] = React.useState("");

  /*
  const handleCreateGame = () => {
    // Implement create game logic here
  };
  */

  const handleJoinGame = () => {
    // Implement join game logic here
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          height: "100dvh",
          background:
            "linear-gradient(16deg, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%)",
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
          <Link component={RouterLink} to="/new-game" color="inherit" variant="h6">
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
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
