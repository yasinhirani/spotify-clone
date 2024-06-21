import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import AppRoutes from "./AppRoutes.tsx";
import { Provider } from "react-redux";
import store from "./store/store.ts";
import Interceptor from "./core/utilities/service/interceptor.ts";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <AppRoutes />
      <Interceptor />
      <Toaster />
    </Provider>
  </React.StrictMode>
);
