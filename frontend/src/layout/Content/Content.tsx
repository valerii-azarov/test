import React from "react";

import Header from "../../components/Header/Header";
import Main from "../../components/Main/Main";

import "./style.css";

const Content: React.FC = () => {
  return (
    <div className="content">
      <Header />
      <Main />
    </div>
  );
};

export default Content;
