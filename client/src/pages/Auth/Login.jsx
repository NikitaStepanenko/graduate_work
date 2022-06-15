import {
  Alert,
  Box,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logoBg from "../../assets/loginBg.jpeg";
import { Image, StyledPaper, StyledTextField } from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/reducers/UserSlice";
import { useFormik } from "formik";
import { $host } from "../../api/baseApi";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [resError, setResError] = useState(null);

  function validate(values) {
    const errors = {};
    if (!values.password || values.password.length < 4) {
      errors.password = "Введите поле";
    }

    if (!values.login) {
      errors.login = "Введите поле";
    }
    return errors;
  }

  const {
    handleSubmit,
    handleChange,
    touched,
    values, // use this if you want controlled components
    errors,
    handleBlur,
  } = useFormik({
    initialValues: {
      password: "",
      login: "",
    },
    validate,
    onSubmit: async (values) => {
      try {
        const response = await $host.post("auth/login", values);
        localStorage.setItem("token", response.data.token);
        dispatch(login(response.data));
        navigate("/catalog");
      } catch (e) {
        setResError(e.response.data.message);
      }
    },
  });

  return (
    <form onSubmit={handleSubmit}>
      <Grid sx={{ height: "100vh" }} container spacing={0}>
        <Grid item xs={7}>
          <Image src={logoBg} />
        </Grid>
        <Grid
          display="flex"
          alignItems="center"
          justifyContent="center"
          item
          xs={5}
        >
          <StyledPaper>
            <Typography variant="loginTitle" color="primary.main">
              Авторизация
            </Typography>
            <Box
              alignContent="center"
              justifyContent="center"
              display="flex"
              flexDirection="column"
              width="85%"
            >
              <StyledTextField
                label="Логин"
                variant="standard"
                onBlur={handleBlur}
                name="login"
                error={touched.login && errors.login}
                helperText={errors.login}
                value={values.login || ""}
                onChange={handleChange}
                fullWidth
              />
              <StyledTextField
                name="password"
                label="Пароль"
                onBlur={handleBlur}
                error={touched.password && errors.password}
                helperText={
                  touched.password && errors.password && errors.password
                }
                variant="standard"
                onChange={handleChange}
                value={values.password || ""}
                fullWidth
                type="password"
              />
              {resError && (
                <Alert sx={{ mb: "10px" }} severity="error">
                  {resError}
                </Alert>
              )}
            </Box>
            <Box width="85%">
              <Button fullWidth variant="contained" type="submit">
                Войти
              </Button>
              <Button
                fullWidth
                variant="text"
                onClick={() => navigate("/registration")}
              >
                Зарегистрироваться
              </Button>
            </Box>
          </StyledPaper>
        </Grid>
      </Grid>
    </form>
  );
};

export default Login;

const resError = () => {};
