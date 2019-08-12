import React from "react";
import { render } from "react-dom";

import { App } from "./App";
import "./scss/index.scss";
import "react-datepicker/dist/react-datepicker.css";
import "react-notifications-component/dist/theme.css";
import { configureFakeBackend } from "./_helpers";
configureFakeBackend();

render(<App />, document.getElementById("app"));
