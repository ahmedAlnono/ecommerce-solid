/* @refresh reload */
import { render } from "solid-js/web";

import "./index.css";
import App from "./App";
import { Route, Router, Routes } from "@solidjs/router";
import Header from "./components/header/header";
import Login from "./pages/login/login";
import Profile from "./pages/profile/profile";
import Product from "./pages/product/product";
import MobileHeader from "./components/header/mobile-header";
import ErrorPage from "./pages/error/error";
import { createSignal } from "solid-js";
import Orders from "./pages/order/orders";
import SellProduct from "./pages/sellProduct/sellProduct";

const root = document.getElementById("root");

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    "Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?"
  );
}

render(() => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" component={<App />} />
        <Route path="/home" component={<App />} />
        <Route path="/login" component={<Login />} />
        <Route path="/profile" component={<Profile />} />
        <Route path="/product/:id" component={<Product />} />
        <Route path="*" component={<ErrorPage />} />
        <Route path="/orders" component={<Orders/>}/>
        <Route path="/sell" component={<SellProduct/>}/>
      </Routes>
      <MobileHeader />
    </Router>
  );
}, root);
