import React from "react";
import { Router, Route, Link, Switch } from "react-router-dom";

import { history } from "../_helpers";
import { authenticationService } from "../_services";
import { PrivateRoute } from "../_components/PrivateRoute";
import { HomePage } from "../Page/HomePage";
import { LoginPage } from "../Page/LoginPage";
import { Receipt } from "../Page/ReceiptPage";
import { NotFound } from "../Page/ErrorPage";
import { LogoutConfirm } from "../_components/LogoutConfirm";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null
    };
  }

  componentDidMount() {
    authenticationService.currentUser.subscribe(x =>
      this.setState({ currentUser: x })
    );
    setTimeout(this.resetTimeLogout(), 300);
  }

  resetTimeLogout() {
    authenticationService.timeLogout();
  }

  render() {
    const { currentUser } = this.state;
    return (
      <Router history={history}>
        <div>
          {currentUser && (
            <nav className="navbar navbar-expand navbar-dark bg-dark">
              <div className="navbar-nav">
                <Link to="/" className="nav-item nav-link text-light">
                  Home
                </Link>
                <Link to="/receipt" className="nav-item nav-link text-light">
                  Receipt
                </Link>
              </div>
              <div className="navbar-nav ml-auto">
                <LogoutConfirm />
              </div>
            </nav>
          )}
          <Switch>
            <PrivateRoute exact path="/" component={HomePage} />
            <PrivateRoute path="/receipt" component={Receipt} />
            <Route path="/login" component={LoginPage} />
            <Route path="*" component={NotFound} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export { App };
