import { $authHost, $host } from "./baseApi";

export const createSubCategory = async (subCategory, categoryId) => {
  const response = await $authHost.post("/products/subcategory", {
    name: subCategory,
    categoryId,
  });
  return response;
};

export const createBrand = async (brand) => {
  const response = await $authHost.post("/products/brand", {
    name: brand,
  });
  return response;
};

export const getCategories = async () => {
  const response = await $host.get("/products/categories");
  return response;
};

export const getBrands = async () => {
  const response = await $host.get("/products/brands");
  return response;
};

export const getProducts = async (typeId, limit, page) => {
  const response = await $host.get("/products", {
    params: {
      typeId,
      limit,
      page,
    },
  });
  return response.data;
};

export const getProductById = async (id) => {
  const response = await $host.get(`/products/${id}`);
  return response.data;
};

export const createProduct = async (product) => {
  try {
    const response = await $authHost.post("/products", product);
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const postRating = async (productId, rate, comment) => {
  try {
    const response = await $authHost.post("/products/rating", {
      productId,
      rate,
      comment,
    });
  } catch (err) { }
};

export const addToBasket = async (productId, count = 1) => {
  try {
    const response = await $authHost.post("/basket/add", {
      productId,
      count,
    });
  } catch (err) { }
};

export const removeFromBasket = async (productId, count = 1) => {
  try {
    const response = await $authHost.post("/basket/remove", {
      productId,
      count,
    });
  } catch (err) { }
};

export const getBasketProducts = async () => {
  try {
    const response = await $authHost.get("/basket");
    return response.data;
  } catch (err) { }
};

export const checkout = async (value) => {
  try {
    const response = await $authHost.post("/yoomoney", { value });
    return response.data;
  } catch (err) { }
};

export const removeAllBaskcetProducts = async () => {
  try {
    await $authHost.post("/basket/removeAll");
  } catch (err) { }
};
