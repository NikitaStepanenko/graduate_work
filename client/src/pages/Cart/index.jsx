import {
  Breadcrumbs,
  Container,
  Grid,
  Paper,
  Typography,
  Link,
  Box,
  TabsContext,
  Tab,
  Button,
} from "@mui/material";
import { TabPanel, TabList, TabContext } from "@mui/lab";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import PetTypeGrid from "../../components/PetTypeGrid";
import ProductCard from "../../components/ProductCard";
import ProductsCategories from "../../components/ProductsCatagories";
import StyledRating from "../../components/StyledRating";
import { Image, Title } from "./styles";
import image from "../../assets/food.png";
import ButtonCounterer from "../../components/ButtonCounterer";
import ReviewCard from "../../components/ReviewCard";
import { StyledPageContainer } from "../../styles";
import CartCard from "../../components/CartCard";
import { useDispatch, useSelector } from "react-redux";
import {
  getBasket,
  removeBasket,
  removeFullPrice,
} from "../../redux/reducers/ProductSlice";
import { checkout } from "../../api/productApi";
import { wordEnding } from "../../helpers/wordEnding";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const basketProductsCount = useSelector(
    (store) => store.products.basketProductsCount
  );
  const fullPrice = useSelector((store) => store.products.basketProductsPrice);

  const products = useSelector((store) => store.products.basketProducts);

  useEffect(() => {
    dispatch(getBasket());
  }, []);

  const pay = async () => {
    const res = await checkout(fullPrice);

    const checkoutPay = new window.YooMoneyCheckoutWidget({
      confirmation_token: res.confirmation.confirmation_token,
      customization: {
        modal: true,
        colors: {
          control_primary: "#e3b23c",
        },
      },
      error_callback: (error) => {
        console.log(error);
      },
    });

    checkoutPay.on("complete", () => {
      dispatch(removeBasket());
      dispatch(removeFullPrice());
      checkoutPay.destroy();
      navigate('/')
    });
    checkoutPay.render("payment-form");
  };

  return (
    <>
      <Header />
      <StyledPageContainer sx={{ marginY: "30px" }}>
        <Paper sx={{ p: "30px", height: "100%", mt: "10px" }} fullWidth>
          <Box display="flex" flexDirection="column">
            <Typography variant="title">Корзина</Typography>
            {basketProductsCount ? (
              <Grid container mt="10px" columnSpacing={2}>
                <Grid item xs={8}>
                  {products.map((product) => (
                    <CartCard key={product.id} product={product} />
                  ))}
                </Grid>
                <Grid item xs={4}>
                  <Paper elevation={2} sx={{ p: "20px" }}>
                    <Box justifyContent="space-between" display="flex">
                      <Typography>{`${basketProductsCount} ${wordEnding(
                        basketProductsCount,
                        ["товар", "товара", "товаров"]
                      )}
                  `}</Typography>
                      <Typography sx={{ fontWeight: "600" }}>
                        {fullPrice} ₽
                      </Typography>
                    </Box>
                    <Button
                      onClick={() => pay()}
                      fullWidth
                      variant="contained"
                      sx={{ mt: "20px" }}
                    >
                      Оформить покупку
                    </Button>
                    <Box sx={{ mt: "20px" }} id="payment-form"></Box>
                  </Paper>
                </Grid>
              </Grid>
            ) : (
              <Grid container display="flex" justifyContent="center">
                <Typography variant="h4" component="h1">
                  Вы еще не добавили товар в корзину
                </Typography>
              </Grid>
            )}
          </Box>
        </Paper>
      </StyledPageContainer>
    </>
  );
};

export default Cart;
