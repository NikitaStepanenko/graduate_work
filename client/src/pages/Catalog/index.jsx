import {
  Box,
  CircularProgress,
  Container,
  Grid,
  Pagination,
  Paper,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/Header";
import PetTypeGrid from "../../components/PetTypeGrid";
import ProductCard from "../../components/ProductCard";
import ProductsCategories from "../../components/ProductsCatagories";
import { Title } from "./styles";
import {
  getAllProducts,
  getAllCategories,
} from "./../../redux/reducers/ProductSlice";
import { StyledPageContainer } from "../../styles";

const Main = () => {
  const dispatch = useDispatch();
  const products = useSelector((store) => store.products.products);
  const categories = useSelector((store) => store.products.categories);
  const loading = useSelector((store) => store.products.loading);
  const totalProductsCount = useSelector((store) => store.products.totalCount);
  const user = useSelector((store) => store.user.user);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [limit, setLimit] = useState(8);
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(getAllProducts({ selectedCategory, limit, page }));
    if (!categories.length) {
      dispatch(getAllCategories());
    }
  }, []);

  useEffect(() => {
    dispatch(getAllProducts({ typeId: selectedCategory, limit, page }));
  }, [selectedCategory, page]);

  const changePage = (page) => {
    setPage(page);
  };
  console.log(totalProductsCount, limit);
  return (
    <>
      <Header />
      <StyledPageContainer sx={{ marginY: "30px" }}>
        <Title variant="title">Каталог товаров</Title>
        <Grid container spacing={3}>
          <Grid item xs={3}>
            <ProductsCategories
              selectCategory={setSelectedCategory}
              categories={categories}
            />
          </Grid>
          <Grid item xs={9}>
            {loading ? (
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <CircularProgress disableShrink={true} />
              </Box>
            ) : products.length ? (
              <>
                <Grid container spacing={3}>
                  {products.map((product) => (
                    <Grid key={product.id} item lg={3} xs={4}>
                      <ProductCard product={product} user={user} />
                    </Grid>
                  ))}
                </Grid>
                <Pagination
                  sx={{ mt: 2 }}
                  size="large"
                  count={Math.ceil(totalProductsCount / limit)}
                  variant="outlined"
                  page={page}
                  color="primary"
                  onChange={(e, page) => changePage(page)}
                />
              </>
            ) : (
              <Box>
                <Grid container justify="center">
                  <Typography variant="h3" component="h1">
                    Товар не найден
                  </Typography>
                </Grid>
              </Box>
            )}
          </Grid>
        </Grid>
      </StyledPageContainer>
    </>
  );
};

export default Main;
