import React, { useState, useContext } from "react";
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Grid,
  Link,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import { AppLoaderContext } from "../contexts/AppLoaderContext"; // Yeni dosyadan içe aktarıyoruz
import { debug } from "console";

const Login: React.FC = () => {
  debugger; 
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
const baseUrl = process.env.REACT_APP_BASE_URL;
  const { startLoading, stopLoading } = useContext(AppLoaderContext); // Context'ten loader'ı kontrol etmek için kullanılır

  const handleLogin = () => {
    startLoading(); // İşlem başlamadan önce loading durumunu aktif et
    setError(""); // Hata mesajını temizle

    fetch(`${baseUrl}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userName, password }),
    })
      .then((response) => {
        if(response.ok){
        console.log("Giriş başarılı");
          navigate("/"); // Başarılı giriş sonrası yönlendirme
      }
      else {
        response.text().then(x=>     setError(x || "Giriş başarısız"))

      } })      
      .catch((error) => {
        setError("Sunucuya bağlanırken bir hata oluştu. Lütfen daha sonra tekrar deneyin.");
      })
      .finally(() => {
        stopLoading(); // İşlem tamamlandıktan sonra loading durumunu kapat
      });
  };

  return (
    <Container maxWidth="xs">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
      >
        <Typography variant="h5" component="h1" gutterBottom>
          Login
        </Typography>
        <TextField
          label="UserName"
          variant="outlined"
          fullWidth
          margin="normal"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required
        />
        <TextField
          label="Password"
          variant="outlined"
          fullWidth
          margin="normal"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && (
          <Typography color="error" variant="body2" gutterBottom>
            {error}
          </Typography>
        )}
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleLogin}
          sx={{ mt: 2 }}
        >
          Login
        </Button>
        <Grid container justifyContent="flex-end" sx={{ mt: 2 }}>
          <Grid item>
            <Link href="#" variant="body2">
              Forgot password?
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Login;
