import React from "react"

import { useState, CSSProperties } from "react";
import MoonLoader from "react-spinners/ClipLoader";
const override: CSSProperties = {
    display: "block",
    margin: "10 10 auto",
    borderColor: "#7096bf",
  };

const Spinner = ()=>{
 

    let [color, setColor] = useState("#ffffff");


    return(
 
        <MoonLoader
        color={color}
        size={150}
        cssOverride={override}
        aria-label="Loading Spinner"
        data-testid="loader"
      />

    )


}
export default Spinner;