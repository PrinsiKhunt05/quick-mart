import React from "react";
import { Modal, Box, Typography, TextField, Button, Stack } from "@mui/material";
import { useAppContext } from "../Context/AppContext";
import toast from "react-hot-toast";

const Login = () => {
  const { SetShowUserLogin, setUser, axios, navigate } = useAppContext();

  const [state, setState] = React.useState("login");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const onSubmitHandler = async (event) => {
    try {
      event.preventDefault();
      const emailLower = String(email || "").trim().toLowerCase();
      if (!emailLower.includes("@") || !emailLower.endsWith(".com")) {
        toast.error("Please enter a valid email that contains '@' and ends with '.com'");
        return;
      }

      const { data } = await axios.post(`/api/user/${state}`, {
        name,
        email: emailLower,
        password,
      });
      if (data.success) {
        navigate("/");
        setUser(data.user);
        SetShowUserLogin(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }

    SetShowUserLogin(false);
  };

  return (
    <Modal open onClose={() => SetShowUserLogin(false)} sx={{ zIndex: (t) => t.zIndex.drawer + 2 }}>
      <Box
        component="form"
        onSubmit={onSubmitHandler}
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "90%", sm: 352 },
          bgcolor: "background.paper",
          border: 1,
          borderColor: "grey.200",
          borderRadius: 2,
          boxShadow: 6,
          p: 4,
        }}
      >
        <Stack spacing={2}>
          <Typography variant="h6" textAlign="center" fontWeight={500}>
            <Typography component="span" color="primary">
              User
            </Typography>{" "}
            {state === "login" ? "Login" : "Sign Up"}
          </Typography>
          {state === "register" && (
            <TextField
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="type here"
              required
              fullWidth
              size="small"
            />
          )}
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="type here"
            required
            fullWidth
            size="small"
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="type here"
            required
            fullWidth
            size="small"
          />
          {state === "register" ? (
            <Typography variant="body2" color="text.secondary">
              Already have account?{" "}
              <Typography component="span" color="primary" onClick={() => setState("login")} sx={{ cursor: "pointer" }}>
                click here
              </Typography>
            </Typography>
          ) : (
            <Typography variant="body2" color="text.secondary">
              Create an account?{" "}
              <Typography component="span" color="primary" onClick={() => setState("register")} sx={{ cursor: "pointer" }}>
                click here
              </Typography>
            </Typography>
          )}
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ py: 1.25, textTransform: "none" }}>
            {state === "register" ? "Create Account" : "Login"}
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default Login;
