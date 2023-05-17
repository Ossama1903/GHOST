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
import CustomSnackbar from "../../components/Toast/CustomSnackbar";

const theme = createTheme({
  typography: {
    fontFamily: "Nunito",
  },
  palette: {
    primary: {
      main: "#0D3B5C", // Specify your desired primary color
    },
    // Customize other color options if needed
  },
});

export default function LogIn() {
  const [isAwatingLoginResponse, setIsAwatingLoginResponse] = useState(false);
  const [error, setError] = useState("");
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
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
      setIsSnackbarOpen(true);
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
        setIsSnackbarOpen(true);
      });
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 10,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img
              style={{ width: "410px" }}
              src={"./navLogo.png"}
              alt="Ghost logo"
            />
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 4 }}
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
                <Button
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  disabled
                >
                  <CircularProgress size={23} />
                </Button>
              )}
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
      <CustomSnackbar
        open={isSnackbarOpen}
        setOpen={setIsSnackbarOpen}
        severity={"error"}
        message={error}
        duration={5000}
      />
    </>
  );
}
