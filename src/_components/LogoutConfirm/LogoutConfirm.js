import React from "react";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { authenticationService } from "../../_services";
import { history } from "../../_helpers";

class LogoutConfirm extends React.Component {
  isLogout() {
    authenticationService.logout();
    history.push("/login");
  }

  submit = () => {
    confirmAlert({
      title: "Logout",
      message: `Are you sure you what log out?`,
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            this.isLogout();
          }
        },
        {
          label: "No",
          onClick: () => {}
        }
      ]
    });
  };

  render() {
    return (
      <div>
        <a onClick={this.submit} className="nav-item nav-link text-light">
          Logout
        </a>
      </div>
    );
  }
}

export { LogoutConfirm };
