import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// Páginas
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import { NotFoundPage } from "./pages/NotFoundPage";

class PrivateRoute extends React.Component {
  estaAutenticado = () => {
    return localStorage.getItem("TOKEN")
  }

  render() {
    const { component: ComponenteQueVeioNoParametro, ...props } = this.props
    if (this.estaAutenticado()) {
      return <ComponenteQueVeioNoParametro {...props} />
    } else {
      return <Redirect to="/login" />
    }
  }
}

class Roteamento extends React.Component {
  render() {
    return (
      <Switch>
        <PrivateRoute path="/" component={HomePage} exact />
        <Route path="/login" component={LoginPage} />
        <Route component={NotFoundPage} />
      </Switch>
    );
  }
}

export default Roteamento;