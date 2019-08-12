import React from "react";
import { Helmet } from "react-helmet";

const HomePage = () => {
  return (
    <div style={{ textAlign: "center", margin: "10px" }}>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <p>Home Page</p>
    </div>
  );
};

export { HomePage };
