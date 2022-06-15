import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { $authHost, $host } from "../../api/baseApi";
import {
  getBasketProducts,
  getBrands,
  getCategories,
  getProductById,
  getProducts,
  removeAllBaskcetProducts,
} from "../../api/productApi";

const initialState = {
  products: [],
  totalCount: null,
  categories: [],
  brands: [],
  loading: false,
  currentProduct: null,
  basketProducts: [],
  basketProductsCount: 0,
  basketProductsPrice: 0,
};

export const getAllCategories = createAsyncThunk(
  "products/categories",
  async (payload, thunkAPI) => {
    try {
      const response = await getCategories();
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const getAllBrands = createAsyncThunk(
  "products/brands",
  async (payload, thunkAPI) => {
    try {
      const response = await getBrands();
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const getAllProducts = createAsyncThunk(
  "products/one",
  async (payload, thunkAPI) => {
    try {
      const { typeId, limit, page } = payload;
      const response = await getProducts(typeId, limit, page);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const getProduct = createAsyncThunk("products", async (id, thunkAPI) => {
  try {
    const response = await getProductById(id);
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue({ error: error.message });
  }
});

export const getBasket = createAsyncThunk(
  "products/basket",
  async (payload, thunkAPI) => {
    try {
      const response = await getBasketProducts();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const removeBasket = createAsyncThunk(
  "products/basket/remove",
  async (payload, thunkAPI) => {
    try {
      await removeAllBaskcetProducts();
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    incrementBasket: (state, action) => {
      state.basketProductsCount += 1;
      if (action.payload) {
        state.basketProductsPrice += action.payload.price;
      }
    },
    decrementBasket: (state, action) => {
      state.basketProductsCount -= 1;
      if (action.payload) {
        state.basketProductsPrice -= action.payload.price;
      }
    },
    removeFullPrice: (state) => {
      state.basketProductsPrice = 0;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
    });
    builder.addCase(getAllCategories.rejected, (state, action) => {
      state.error = action.payload.error;
    });

    builder.addCase(getAllBrands.fulfilled, (state, action) => {
      state.brands = action.payload;
    });
    builder.addCase(getAllBrands.rejected, (state, action) => {
      state.error = action.payload.error;
    });

    builder.addCase(getAllProducts.fulfilled, (state, action) => {
      state.products = action.payload.rows;
      state.totalCount = action.payload.count;
      state.loading = false;
    });
    builder.addCase(getAllProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllProducts.rejected, (state, action) => {
      state.error = action.payload.error;
      state.loading = false;
    });

    builder.addCase(getProduct.fulfilled, (state, action) => {
      state.currentProduct = action.payload;
    });
    builder.addCase(getProduct.rejected, (state, action) => {
      state.error = action.payload.error;
    });

    builder.addCase(getBasket.fulfilled, (state, action) => {
      state.basketProducts = action.payload.products;

      let count = 0;
      let fullPrice = 0;
      action.payload.products.forEach((product) => {
        console.log(product);
        count += product.count;
        fullPrice += product.product.price * product.count;
      });
      state.basketProductsCount = count;
      state.basketProductsPrice = fullPrice;
    });
    builder.addCase(getBasket.rejected, (state, action) => {
      state.error = action.payload.error;
    });

    builder.addCase(removeBasket.fulfilled, (state, action) => {
      state.basketProducts = [];
      state.basketProductsCount = 0;
    });
    builder.addCase(removeBasket.rejected, (state, action) => {
      state.error = action.payload.error;
    });
  },
});

export const { decrementBasket, incrementBasket, removeFullPrice } =
  productSlice.actions;

export default productSlice.reducer;
