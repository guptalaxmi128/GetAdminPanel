import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { signUpApi} from "../services/SignUpApi";
import authReducer from "../features/authSlice";
export const store = configureStore({
  reducer: {
    [signUpApi.reducerPath]: signUpApi.reducer,
    auth : authReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(signUpApi.middleware),
});

setupListeners(store.dispatch);
