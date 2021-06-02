import React, { useState } from "react";
import "./App.css";
import Footer from "./Footer";
import Header from "./Header";
import Products from "./Products";
import {Route, Routes } from 'react-router-dom';
import Details from "./Detail";
import Cart from "./Cart";


export default function App() {
  
  return (
    <>
      <div className="content">
        <Header />
        <main>
          <Products />
        </main>
      </div>
      <Footer />
    </>
  );
}
