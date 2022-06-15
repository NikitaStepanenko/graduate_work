import {
  Breadcrumbs,
  Grid,
  Paper,
  Typography,
  Link,
  Box,
  Tab,
  CircularProgress,
  Button,
} from "@mui/material";
import { TabPanel, TabList, TabContext } from "@mui/lab";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/Header";
import StyledRating from "../../components/StyledRating";
import { Image } from "./styles";
import image from "../../assets/food.png";
import ButtonCounterer from "../../components/ButtonCounterer";
import ReviewCard from "../../components/ReviewCard";
import { StyledPageContainer } from "../../styles";
import { getProductById } from "../../api/productApi";
import ReviewModal from "../../components/ReviewModal";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../../redux/reducers/ProductSlice";
import { getRating } from "../../helpers/getRating";

const Product = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const user = useSelector((store) => store.user.user);

  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState("1");

  const product = useSelector((store) => store.products.currentProduct);

  const handleChangeTab = (event, newValue) => {
    setTab(newValue);
  };

  useEffect(() => {
    if (!product || product.id !== id) {
      dispatch(getProduct(id));
    }
  }, []);

  const addProduct = () => {
    addToBasket(id);
  };

  return (
    <>
      <Header />
      <StyledPageContainer sx={{ marginY: "30px" }}>
        <Paper sx={{ p: "30px", height: "100%", mt: "10px" }} fullWidth>
          {product && product.id == id ? (
            <>
              <Breadcrumbs aria-label="breadcrumb">
                <Link
                  underline="hover"
                  color="inherit"
                  onClick={() => navigate("/catalog")}
                  sx={{ cursor: "pointer" }}
                >
                  Каталог
                </Link>
                <Link
                  underline="hover"
                  color="inherit"
                  onClick={() => navigate("/catalog")}
                  sx={{ cursor: "pointer" }}
                >
                  {product.subCategory.category.name}
                </Link>
                <Typography color="text.primary">
                  {product.subCategory.name}
                </Typography>
              </Breadcrumbs>
              <Box sx={{ mt: "10px" }} display="flex" flexDirection="column">
                <Typography variant="title">{product.name}</Typography>
                <Box display="flex" alignItems="center">
                  <StyledRating
                    name="size-small"
                    precision={0.25}
                    defaultValue={getRating(product)}
                    readOnly
                  />
                  <Typography ml="10px">
                    на основе {product.ratings.length} отзыва
                  </Typography>
                  {user && (
                    <Button
                      sx={{ ml: "10px" }}
                      variant="outlined"
                      onClick={() => setOpen(true)}
                    >
                      Оставить отзыв
                    </Button>
                  )}
                </Box>
                <Grid container mt="10px" columnSpacing={2}>
                  <Grid item xs={4}>
                    <Image
                      src={`${process.env.REACT_APP_BASE_API_URL}/${product.image}`}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={8}
                    fullWidth
                    display="flex"
                    flexDirection="column"
                    justifyContent="space-between"
                  >
                    <Grid container columnSpacing={2}>
                      <Grid xs={2} item flexDirection="column" display="flex">
                        <Typography variant="propertyTitle">Цена:</Typography>
                      </Grid>
                      <Grid
                        xs={10}
                        item
                        flexDirection="column"
                        display="flex"
                        fullWidth
                      >
                        <Typography variant="standard">
                          {product.price}
                        </Typography>
                      </Grid>
                    </Grid>
                    {user && (
                      <ButtonCounterer
                        productId={id}
                        isoncard={false}
                        price={product.price}
                      />
                    )}
                  </Grid>
                </Grid>
                <Box sx={{ width: "100%", typography: "body1" }}>
                  <TabContext value={tab}>
                    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                      <TabList
                        onChange={handleChangeTab}
                        aria-label="lab API tabs example"
                      >
                        <Tab label="Описание" value="1" />
                        <Tab label="Отзывы" value="2" />
                      </TabList>
                    </Box>
                    <TabPanel value="1">
                      <Grid container columnSpacing={2}>
                        <Grid item xs={7}>
                          {product.description}
                        </Grid>
                        <Grid item xs={5}>
                          <Grid container columnSpacing={2}>
                            <Grid
                              xs={6}
                              item
                              flexDirection="column"
                              display="flex"
                            >
                              {product.info.map((info) => {
                                return (
                                  <Typography
                                    key={info.id}
                                    variant="propertyTitle"
                                  >
                                    {info.title}
                                  </Typography>
                                );
                              })}
                            </Grid>
                            <Grid
                              xs={6}
                              item
                              flexDirection="column"
                              display="flex"
                              fullWidth
                            >
                              {product.info.map((info) => {
                                return (
                                  <Typography
                                    key={info.id}
                                    variant="propertyTitle"
                                  >
                                    {info.description}
                                  </Typography>
                                );
                              })}
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </TabPanel>
                    <TabPanel value="2">
                      {product.ratings.map((rating) => {
                        return <ReviewCard key={rating.id} rating={rating} />;
                      })}
                    </TabPanel>
                  </TabContext>
                </Box>
              </Box>
            </>
          ) : (
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <CircularProgress disableShrink={true} />
            </Box>
          )}
        </Paper>
      </StyledPageContainer>
      <ReviewModal open={open} setOpen={setOpen} productId={id} />
    </>
  );
};

export default Product;

// Артикул
// Направленность
// Тип корма

// Бренд

// Возраст

// Состав корма

// Спецпоказания

// Страна производства

// Упаковано

// В упаковке

// Вес

// Особенности ингредиентов
