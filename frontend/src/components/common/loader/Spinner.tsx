import React from "react";
import Loader from "./index";

const Spinner = (): JSX.Element => {
  return (
    <div
      style={{
        position: "fixed",
        top: "0%",
        left: "0%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: "200",
        background: "rgba(57, 57, 56, 0.391)",
        width: "100%",
        height: "100%",
      }}
    >
      <Loader />
    </div>
  );
};

export default Spinner;
