import React from "react";
import { Helmet } from "react-helmet";

const NotFound = () => (
  <div className="error-page">
    <Helmet>
      <title>Error</title>
    </Helmet>
    <div className="error-message">
      <div className=" error-message-container container">
        <span>404 </span>
        <p>Page Not Found.</p>
        <a href="/">Return to the front page</a>
      </div>
    </div>
  </div>
);

export { NotFound };
