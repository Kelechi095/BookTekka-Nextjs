"use client"

import React from "react";

import { Audio, Circles, LineWave, Oval } from "react-loader-spinner";

const UiLoader = () => {
  return (
    <div className="h-[80vh] flex justify-center items-center">
      <Oval
        height="36"
        width="36"
        color="black"
        ariaLabel="loading"
      />
    </div>
  );
};

export default UiLoader;
