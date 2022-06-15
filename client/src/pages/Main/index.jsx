import { Container, Typography } from "@mui/material";
import React from "react";
import Header from "../../components/Header";
import PetTypeGrid from "../../components/PetTypeGrid";
import { CurvedBackground, CurvedContainer, Title } from "./styles";
import { StyledPageContainer } from "../../styles";

const Main = () => {
  return (
    <>
      <Header />
      <CurvedBackground>
        <CurvedContainer>
          <Typography color="text.secondary" variant="regTypography">
            Зарегистрируйтесь сейчас,
            <br /> чтобы гулять со своими любимцами в компании
          </Typography>
        </CurvedContainer>
      </CurvedBackground>
      <StyledPageContainer sx={{ marginY: "30px" }} spacing={3}>
        <Title variant="title">Каталог товаров по питомцу </Title>
        <PetTypeGrid />
      </StyledPageContainer>
    </>
  );
};

export default Main;
