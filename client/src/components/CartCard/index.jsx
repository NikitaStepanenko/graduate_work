import { Avatar, Box, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import { CardContainer, Image } from "./styles";
import StyledRating from "../StyledRating";
import food from "../../assets/food.png";
import ButtonCounterer from "../ButtonCounterer";

const CartCard = ({ product }) => {
  const [fullPrice, setFullPrice] = useState(
    product.product.price * product.count
  );

  return (
    <CardContainer>
      <Grid container columnSpacing={3} alignItems="center">
        <Grid item xs={2}>
          <Image
            src={`${process.env.REACT_APP_BASE_API_URL}/${product.product.image}`}
          />
        </Grid>
        <Grid item xs={5}>
          <Box display="flex" flexDirection="column" sx={{ ml: "10px" }}>
            <Typography>{product.product.name}</Typography>
          </Box>
        </Grid>
        <Grid item xs={3}>
          <ButtonCounterer
            isoncard={true}
            initialNum={product.count}
            price={product.product.price}
            cart
            productId={product.product.id}
            setFullPrice={setFullPrice}
          />
        </Grid>
        <Grid item xs={2}>
          <Typography>{fullPrice} ₽</Typography>
        </Grid>
      </Grid>
    </CardContainer>
  );
};

export default CartCard;
