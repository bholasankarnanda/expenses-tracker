import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import "./store/store";
import { Provider } from "react-redux";
import { store, persistor } from "./store/store";
import { PersistGate } from "redux-persist/integration/react";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading="null" persistor={persistor}>
        <ToastContainer position="top-right" autoClose={1500} theme="colored" />
        <App />
      </PersistGate>
    </Provider>
  </StrictMode>
);
