import React, { useContext, useReducer, useState } from "react";
import {
  Button,
  TextField,
  Container,
  Typography,
  Box,
  IconButton,
  InputAdornment,
  Select,
  MenuItem,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { AppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";
import { UserRole } from "../../types/types";

const Signup: React.FC = () => {
  type FormState = {
    username: string;
    password: string;
    confirmPassword: string;
    address: string;
    phone: string;
    error: string;
    roleId: number; // Add roleId to the state
  };

  type FormAction =
    | { type: "SET_FIELD"; field: string; value: string }
    | { type: "SET_ERROR"; error: string }
    | { type: "CLEAR_ERROR" };

  const initialState: FormState = {
    username: "",
    password: "",
    confirmPassword: "",
    address: "",
    phone: "",
    error: "",
    roleId: UserRole.StandartUser, // Default role is StandartUser
  };

  const navigate = useNavigate();
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const { startLoading, stopLoading } = useContext(AppContext);

  function formReducer(state: FormState, action: FormAction): FormState {
    switch (action.type) {
      case "SET_FIELD":
        if(action.field == "phone" && !(/^\d+$/).test (action.value )){
          return { ...state};
          // console.log(action.value);
        }
        return { ...state, [action.field]: action.value };
      case "SET_ERROR":
        return { ...state, error: action.error };
      case "CLEAR_ERROR":
        return { ...state, error: "" };
      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(formReducer, initialState);
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordVisibilityToggle = () => {
    setShowPassword((prevShow) => !prevShow);
  };

  const roleLov = Object.entries(UserRole)
    .filter(([key]) => Number.isNaN(Number(key)))
    .map(([key, value]) => ({
      id: value as number,
      name: key,
    }));
  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (state.password !== state.confirmPassword) {
      dispatch({ type: "SET_ERROR", error: "Passwords do not match!" });
    } else {
      dispatch({ type: "CLEAR_ERROR" });
      startLoading();
      fetch(`${baseUrl}/api/user/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: state.username,
          password: state.password,
          address: state.address,
          phone: state.phone,
          roleId: state.roleId, // Include roleId in the request body
        }),
      })
        .then((response) => {
          if (response.ok) {
            console.log("Signup başarılı");
            navigate("/login");
          } else {
            response.text().then((x) =>
              dispatch({
                type: "SET_ERROR",
                error: x || "Signup unsuccessful",
              })
            );
          }
        })
        .catch(() => {
          dispatch({
            type: "SET_ERROR",
            error: "Connection error to server occurred",
          });
        })
        .finally(() => {
          stopLoading();
        });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "SET_FIELD",
      field: e.target.name,
      value: e.target.value,
    });
  };

  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="flex-start"
        minHeight="100vh"
        paddingTop={4}
      >
        <Typography variant="h5" component="h1" gutterBottom>
          Signup
        </Typography>
        <div>
          <TextField
            label="Username"
            name="username"
            value={state.username}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={state.password}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handlePasswordVisibilityToggle}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            label="Confirm Password"
            name="confirmPassword"
            type={showPassword ? "text" : "password"}
            value={state.confirmPassword}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handlePasswordVisibilityToggle}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
            <Select
              labelId="role-select-label"
              id="role-select"
              fullWidth
              value={state.roleId.toString()}
              name="roleId"
              onChange={(e) => dispatch({ type: "SET_FIELD", field: "roleId", value: e.target.value })}
            >
              {roleLov.map((role) => (
                <MenuItem key={role.id} value={role.id}>
                  {role.name}
                </MenuItem>
              ))}
            </Select>
          <TextField
            label="Address"
            name="address"
            value={state.address}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Phone"
            name="phone"  
            value={state.phone}
            onChange={handleChange}
            fullWidth
            margin="normal"
            type="tel"
            slotProps={{
              htmlInput: {
               pattern:".{10,10}",
                maxLength: 10,
              },
            }}
          />

          {state.error && (
            <Typography color="error" variant="body1">
              {state.error}
            </Typography>
          )}

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 3 }}
            onClick={handleSubmit}
          >
            Signup
          </Button>
        </div>
      </Box>
    </Container>
  );
};

export default Signup;
