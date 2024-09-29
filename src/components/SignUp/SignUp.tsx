import React, { useContext, useReducer } from "react";
import { Button, TextField, Container, Typography, Box } from "@mui/material";
import { AppLoaderContext } from "../contexts/AppLoaderContext";
import { PassThrough } from "stream";
import { useNavigate } from "react-router-dom";
const Signup: React.FC = () => {
  // Form state tipleri
  type FormState = {
    username: string;
    password: string;
    confirmPassword: string;
    address: string;
    phone: string;
    error: string;
  };

  // Action tipleri
  type FormAction =
    | { type: "SET_FIELD"; field: string; value: string }
    | { type: "SET_ERROR"; error: string }
    | { type: "CLEAR_ERROR" };

  // Başlangıç durumu
  const initialState: FormState = {
    username: "",
    password: "",
    confirmPassword: "",
    address: "",
    phone: "",
    error: "",
  };
  const navigate = useNavigate();
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const { startLoading, stopLoading } = useContext(AppLoaderContext); // Context'ten loader'ı kontrol etmek için kullanılır
  // Reducer fonksiyonu
  function formReducer(state: FormState, action: FormAction): FormState {
    switch (action.type) {
      case "SET_FIELD":
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

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
   console.log(e.type)
    if (state.password !== state.confirmPassword) {
      dispatch({ type: "SET_ERROR", error: "Passwords do not match!" });
    } else {
      dispatch({ type: "CLEAR_ERROR" });
      startLoading(); // İşlem başlamadan önce loading durumunu aktif et  
      fetch(`${baseUrl}/api/user/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({"username": state.username, 
            "password":state.password,
            "address":state.address,
            "phone":state.phone
           }),
      })
        .then((response) => {
          if(response.ok){
          console.log("signup  başarılı");
            navigate("/"); // Başarılı giriş sonrası yönlendirme
        }
        else {
          response.text().then(x=>        dispatch({ type: "SET_ERROR", error: x || "signup unsuccesfull" }))
  
        } })      
        .catch((error) => {
          dispatch({ type: "SET_ERROR", error: "connection error to server occured" });
        })
        .finally(() => {
          stopLoading(); // İşlem tamamlandıktan sonra loading durumunu kapat
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
      <Box sx={{ mt: 5 }}>
        <Typography variant="h4" gutterBottom>
          Signup Form
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
            type="password"
            value={state.password}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            value={state.confirmPassword}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
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
