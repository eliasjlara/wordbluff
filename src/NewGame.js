import React from "react";
import {
  Box,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const NewGame = () => {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate("/");
  };

  const players = ["Elias", "Klara", "Matteus", "Darth Vader", "Test1", "Test2"]

  return (
    <Box
      sx={{
        height: "100dvh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background:
          "linear-gradient(16deg, rgba(219,63,251,1) 0%, rgba(111,250,66,1) 79%)",
      }}
    >
      <Typography variant="h3" component="div" fontWeight="600" sx={{ marginBottom: 2 }}>
        Game PIN: {Math.floor(100000 + Math.random() * 900000)}
      </Typography>
      <Typography variant="h3" component="div" fontWeight="600" sx={{ marginBottom: 2 }}>
        {players.length} players have joined
      </Typography>

      <Typography
        variant="h4"
        component="div"
        fontWeight="600"
        sx={{ marginBottom: 2 }}
      ></Typography>

      <List
        sx={{
          width: "70%",
          bgcolor: "background.transparent",
          position: "relative",
          overflow: "auto",
          height: "50dvh",
          "& ul": { padding: 0 },
          alignContent: "center"
        }}
        subheader={<li />}
      >
        <li key={"test"}>
          <ul>
            {players.map((item) => (
              <ListItem key={"test"}>
                <ListItemText
                  primaryTypographyProps={{ fontSize: 30 }}
                  primary={`${item}`}
                />
              </ListItem>
            ))}
          </ul>
        </li>
      </List>

      <Button
        variant="contained"
        color="startGameButton"
        fontSize="large"
        disableElevation
        sx={{ fontSize: 25 }}
        onClick={handleBackToHome}
      >
        Start game
      </Button>
    </Box>
  );
};

export default NewGame;
