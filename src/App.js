import React, { useContext } from "react";
import { GlobalStyle } from "./styles/GlobalStyles";
import { Logo } from "./components/Logo";
import { NavBar } from "./components/NavBar";

import { Home } from "./pages/Home";
import { Detail } from "./pages/Detail";
import { Favorites } from "./pages/Favorites";
import { User } from "./pages/User";
import { NotRegisteredUser } from "./pages/NotRegisteredUser";
import { NotFound } from "./pages/NotFound";

import { Router, Redirect } from "@reach/router";
import { Context } from "./Context";

export const App = () => {
  const { isAuth } = useContext(Context);
  return (
    <div>
      <GlobalStyle />
      <Logo />
      <Router>
        <NotFound default />

        <Home path="/" />
        <Home path="/pet/:categoryId" />
        <Detail path="/detail/:detailId" />
        {!isAuth && <NotRegisteredUser path="/login" />}

        {!isAuth && <Redirect from="favorites" to="/login" />}
        {!isAuth && <Redirect from="user" to="/login" />}
        {isAuth && <Redirect from="/login" to="/" />}
        <Favorites path="/favorites" />
        <User path="/user" />
      </Router>

      <NavBar />
    </div>
  );
};
