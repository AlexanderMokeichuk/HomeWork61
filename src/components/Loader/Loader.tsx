import React from "react";
import "./Loader.css";

const Loader: React.FC = React.memo(() => {
  return (
    <span className={"loader"}></span>
  );
});

export default Loader;