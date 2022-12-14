import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import authentication from "../../firebase/authentication";
import { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/userContext";
import cloud from "../../firebase/cloud";

const theme = createTheme();

export default function LogIn() {
  const [isAwatingLoginResponse, setIsAwatingLoginResponse] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { currentUser, signInAdmin, setCurrentUser } = useAuth();
  const [logoUrl, setLogoUrl] = useState("");

  useEffect(() => {
    cloud.getLogo().then((url) => {
      setLogoUrl(url);
    });
    if (currentUser) {
      navigate("/");
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    setError(null);

    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");

    if (email === "" || password === "") {
      setError("Please fill in all the credentials");
      return;
    }

    setIsAwatingLoginResponse(true);
    signInAdmin(email, password)
      .then((user) => {
        setIsAwatingLoginResponse(false);
        if (currentUser) {
          navigate("/");
        }
      })
      .catch((e) => {
        setIsAwatingLoginResponse(false);
        setError(e.message);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img
            style={{ width: "200px" }}
            src={logoUrl}
            alt="Ghost logo"
          />
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <div
              style={
                error
                  ? { color: "red", fontSize: "12px" }
                  : { color: "red", fontSize: "12px", visibility: "hidden" }
              }
            >
              {error ? error : "."}
            </div>

            {!isAwatingLoginResponse && (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
            )}
            {isAwatingLoginResponse && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  marginY: "18.5px",
                }}
              >
                <CircularProgress />
              </Box>
            )}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
