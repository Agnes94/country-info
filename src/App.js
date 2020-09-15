import React from "react";
import { SearchBar } from "Components/SearchBar";
import "Components/style.css";

export const App = () => {
  return (
    <div className="main-div">
      <h1 className="title">Search for countries</h1>
      <SearchBar />
    </div>
  );
};
