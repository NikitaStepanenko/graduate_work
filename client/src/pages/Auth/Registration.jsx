import {
  Alert,
  Box,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { $host } from "../../api/baseApi";
import logoBg from "../../assets/loginBg.jpeg";
import { registration } from "../../redux/reducers/UserSlice";
import { Image, StyledPaper, StyledTextField } from "./styles";

const Registration = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [resError, setResError] = useState(null);

  function validate(values) {
    const errors = {};
    if (!values.password || values.password.length < 4) {
      errors.password = "Должен быть больше 4 символов";
    }

    if (!values.login) {
      errors.login = "Введите поле";
    }

    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = "Некоррекнтый email";
    }

    if (values.password !== values.passwordCheck) {
      errors.passwordCheck = "Пароли должны совпадать";
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
      email: "",
      login: "",
      passwordCheck: "",
    },
    validate,
    onSubmit: async (values) => {
      try {
        const { password, email, login } = values;
        const response = await $host.post("auth/registration", {
          password,
          email,
          login,
        });
        localStorage.setItem("token", response.data.token);
        dispatch(registration(response.data));
        navigate("/catalog");
        // values = {"favoriteFood":"ramen","favoritePlace":"mountains"}
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
              Регистрация
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
                name="login"
                value={values.login || ""}
                variant="standard"
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.login && errors.login}
                helperText={touched.login && errors.login}
                fullWidth
              />
              <StyledTextField
                label="Эл.почта"
                name="email"
                value={values.email || ""}
                variant="standard"
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.email && errors.email}
                helperText={touched.email && errors.email}
                fullWidth
              />
              <StyledTextField
                label="Пароль"
                name="password"
                value={values.password || ""}
                variant="standard"
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.password && errors.password}
                helperText={touched.password && errors.password}
                type="password"
                fullWidth
              />
              <StyledTextField
                name="passwordCheck"
                value={values.passwordCheck || ""}
                label="Повторите пароль"
                variant="standard"
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.passwordCheck && errors.passwordCheck}
                helperText={touched.passwordCheck && errors.passwordCheck}
                type="password"
                fullWidth
              />
              {resError && (
                <Alert sx={{ mb: "10px" }} severity="error">
                  {resError}
                </Alert>
              )}
            </Box>
            <Box width="85%">
              <Button fullWidth variant="contained" type="submit">
                Зарегистрироваться
              </Button>
              <Button
                fullWidth
                variant="text"
                onClick={() => navigate("/login")}
              >
                Войти
              </Button>
            </Box>
          </StyledPaper>
        </Grid>
      </Grid>
    </form>
  );
};

export default Registration;
