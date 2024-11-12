import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // Import BrowserRouter
import App from "./App";
import { ToastContainer } from "react-toastify";
import { Slide, Zoom, Flip, Bounce } from "react-toastify";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { AuthProvider } from "./store/auth";
import "react-toastify/dist/ReactToastify.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <AuthProvider>
      <Provider store={store}>
        <App />
        {/* <BrowserRouter>
      </BrowserRouter> */}
        <ToastContainer
          position="bottom-center"
          transition={Slide}
          autoClose={2000}
          closeButton={false}
          pauseOnFocusLoss={false}
          theme="colored"
        />
      </Provider>
    </AuthProvider>
  </>
);
