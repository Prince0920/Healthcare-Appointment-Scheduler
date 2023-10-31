import React from "react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import Leftsidebar from "../layout/Leftsidebar";

const Layouts = ({ children }) => {
  return (
    <div className="wrapper">
      <Header />
      <Leftsidebar />
      {children}
      <Footer />
    </div>
  );
};

export default Layouts;
