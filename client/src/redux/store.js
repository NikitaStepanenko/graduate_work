import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/UserSlice";
import ProductReducer from "./reducers/ProductSlice";
import PointReducer from "./reducers/PointSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    products: ProductReducer,
    points: PointReducer,
  },
});
