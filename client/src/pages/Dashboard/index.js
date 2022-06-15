import {
  Paper,
  Typography,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FileUpload from "react-material-file-upload";
import { StyledPageContainer } from "../../styles";
import { StyledTextField } from "../Auth/styles";
import {
  createBrand,
  createProduct,
  createSubCategory,
} from "../../api/productApi";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllBrands,
  getAllCategories,
} from "../../redux/reducers/ProductSlice";
// import FileUpload from "../../components/FileUpload";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [brand, setBrand] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const [product, setProduct] = useState({});
  const [productInfo, setProductInfo] = useState([]);
  const [picture, setPicture] = useState(null);
  const [selectedProductCategory, setSelectedProductCategory] = useState("");
  const [selectedProductBrand, setSelectedProductBrand] = useState("");
  const [selectedProductSubCategory, setSelectedProductSubCategory] =
    useState("");

  const categories = useSelector((store) => store.products.categories);
  const brands = useSelector((store) => store.products.brands);

  useEffect(() => {
    if (!categories.length) {
      dispatch(getAllCategories());
    }
    if (!brands.length) {
      dispatch(getAllBrands());
    }
  }, []);

  const handleAddCategory = async () => {
    try {
      await createSubCategory(subCategory, selectedCategory);
      setSubCategory("");
      dispatch(getAllCategories());
    } catch (e) {}
  };

  const handleAddBrand = async () => {
    try {
      await createBrand(brand);
      setBrand("");
      dispatch(getAllBrands());
    } catch (e) {}
  };

  const handleChangeProduct = (e) => {
    setProduct((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAddInfo = () => {
    setProductInfo([
      ...productInfo,
      { title: "", description: "", number: Date.now() },
    ]);
  };

  const handleRemoveInfo = (number) => {
    setProductInfo(productInfo.filter((info) => info.number !== number));
  };

  const handleChangeInfo = (key, value, number) => {
    setProductInfo(
      productInfo.map((info) =>
        info.number === number ? { ...info, [key]: value } : info
      )
    );
  };

  const handleChangeCategory = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleAddProduct = () => {
    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("price", product.price);
    formData.append("description", product.description);
    formData.append("image", picture[0]);
    formData.append("brandId", selectedProductBrand);
    formData.append("typeId", selectedProductSubCategory);
    formData.append("info", JSON.stringify(productInfo));

    createProduct(formData);

    setProduct({});
    setProductInfo([]);
    setPicture(null);
    setSelectedProductCategory("");
    setSelectedProductBrand("");
    setSelectedProductSubCategory("");
  };

  const onChangeFile = (e) => {
    setPicture(e.target.files[0]);
  };

  return (
    <>
      <Header />
      <StyledPageContainer sx={{ marginY: "30px" }}>
        <Paper sx={{ p: "30px", height: "100%", mt: "10px" }}>
          <Box display="flex" flexDirection="column">
            <Typography variant="title">Панель Администратора</Typography>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Создание товара</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <Grid container spacing={3}>
                    <Grid item xs={4}>
                      <FileUpload
                        value={picture}
                        title="Перетащите файл сюда или нажмите, чтобы выбрать файл"
                        buttonText="Загрузить"
                        onChange={(files) => setPicture(files)}
                        onDelete={() => setPicture(null)}
                      />
                    </Grid>
                    <Grid item xs={8}>
                      <Grid container spacing={3}>
                        <Grid item xs={4}>
                          <StyledTextField
                            fullWidth
                            label="Название"
                            variant="standard"
                            name="name"
                            value={product.name || ""}
                            onChange={handleChangeProduct}
                          />
                        </Grid>
                        <Grid item xs={4}>
                          <StyledTextField
                            fullWidth
                            label="Стоимость"
                            variant="standard"
                            name="price"
                            value={product.price || ""}
                            onChange={handleChangeProduct}
                          />
                        </Grid>
                        <Grid item xs={4}>
                          <StyledTextField
                            fullWidth
                            label="Описание"
                            variant="standard"
                            name="description"
                            value={product.description || ""}
                            onChange={handleChangeProduct}
                          />
                        </Grid>
                        <Grid
                          item
                          xs={4}
                          sx={{ display: "flex", alignItems: "center" }}
                        >
                          <FormControl variant="standard" fullWidth>
                            <InputLabel id="demo-simple-select-label">
                              Бренд
                            </InputLabel>
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={selectedProductBrand}
                              onChange={(e) =>
                                setSelectedProductBrand(e.target.value)
                              }
                            >
                              {brands?.map((brand) => {
                                return (
                                  <MenuItem key={brand.id} value={brand.id}>
                                    {brand.name}
                                  </MenuItem>
                                );
                              })}
                            </Select>
                          </FormControl>
                        </Grid>
                        <Grid
                          item
                          xs={4}
                          sx={{ display: "flex", alignItems: "center" }}
                        >
                          <FormControl variant="standard" fullWidth>
                            <InputLabel id="demo-simple-select-label">
                              Категория
                            </InputLabel>
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={selectedProductCategory}
                              onChange={(e) =>
                                setSelectedProductCategory(e.target.value)
                              }
                            >
                              {categories?.map((category) => {
                                return (
                                  <MenuItem
                                    key={category.id}
                                    value={category.id}
                                  >
                                    {category.name}
                                  </MenuItem>
                                );
                              })}
                            </Select>
                          </FormControl>
                        </Grid>
                        <Grid
                          item
                          xs={4}
                          sx={{ display: "flex", alignItems: "center" }}
                        >
                          <FormControl
                            variant="standard"
                            fullWidth
                            disabled={!selectedProductCategory}
                          >
                            <InputLabel id="demo-simple-select-label">
                              Подкатегория
                            </InputLabel>
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={selectedProductSubCategory}
                              onChange={(e) =>
                                setSelectedProductSubCategory(e.target.value)
                              }
                            >
                              {categories
                                ?.find(
                                  (category) =>
                                    category.id === selectedProductCategory
                                )
                                ?.subCategories.map((subcategory) => {
                                  return (
                                    <MenuItem
                                      key={subcategory.id}
                                      value={subcategory.id}
                                    >
                                      {subcategory.name}
                                    </MenuItem>
                                  );
                                })}
                            </Select>
                          </FormControl>
                        </Grid>
                        {productInfo.map((info) => (
                          <Grid item key={info.number} xs={12}>
                            <Grid container spacing={3} alignItems="center">
                              <Grid item xs={4}>
                                <StyledTextField
                                  fullWidth
                                  label="Введите название поля"
                                  variant="standard"
                                  name="name"
                                  value={info.title || ""}
                                  onChange={(e) =>
                                    handleChangeInfo(
                                      "title",
                                      e.target.value,
                                      info.number
                                    )
                                  }
                                />
                              </Grid>
                              <Grid item xs={4}>
                                <StyledTextField
                                  fullWidth
                                  label="Введите описание поля"
                                  variant="standard"
                                  name="description"
                                  value={info.description || ""}
                                  onChange={(e) =>
                                    handleChangeInfo(
                                      "description",
                                      e.target.value,
                                      info.number
                                    )
                                  }
                                />
                              </Grid>
                              <Grid item xs={4}>
                                <Button
                                  onClick={() => handleRemoveInfo(info.number)}
                                  variant="contained"
                                  fullWidth
                                >
                                  Удалить поле
                                </Button>
                              </Grid>
                            </Grid>
                          </Grid>
                        ))}
                      </Grid>
                    </Grid>
                  </Grid>
                </Box>
                <Box sx={{ mt: 1 }}>
                  <Button variant="contained" onClick={() => handleAddInfo()}>
                    Добавить поле
                  </Button>
                  <Button
                    sx={{ ml: 1 }}
                    variant="contained"
                    onClick={() => handleAddProduct()}
                  >
                    Добавить продукт
                  </Button>
                </Box>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography>Создание подкатегории</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <Box>
                    <FormControl variant="standard" fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Категория
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={selectedCategory}
                        onChange={handleChangeCategory}
                      >
                        {categories?.map((category) => {
                          return (
                            <MenuItem key={category.id} value={category.id}>
                              {category.name}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                    <StyledTextField
                      fullWidth
                      label="Подкатегория"
                      variant="standard"
                      value={subCategory || ""}
                      onChange={(e) => setSubCategory(e.target.value)}
                    />
                  </Box>
                  <Button
                    variant="contained"
                    sx={{ maxWidth: "120px" }}
                    onClick={() => handleAddCategory()}
                  >
                    Добавить
                  </Button>
                </Box>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography>Создание бренда</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <StyledTextField
                    fullWidth
                    label="Бренд"
                    variant="standard"
                    value={brand || ""}
                    onChange={(e) => setBrand(e.target.value)}
                  />

                  <Button
                    variant="contained"
                    sx={{ maxWidth: "120px" }}
                    onClick={() => handleAddBrand()}
                  >
                    Добавить
                  </Button>
                </Box>
              </AccordionDetails>
            </Accordion>
          </Box>
        </Paper>
      </StyledPageContainer>
    </>
  );
};

export default Dashboard;
