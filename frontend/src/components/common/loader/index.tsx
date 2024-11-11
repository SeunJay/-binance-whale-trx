import React from "react";
import { Oval } from "react-loader-spinner";

const Loader = (): JSX.Element => (
  <Oval
    visible={true}
    height="80"
    width="80"
    color="#fff"
    secondaryColor="#fff"
    ariaLabel="oval-loading"
    wrapperStyle={{}}
    wrapperClass=""
  />
);

export default Loader;
