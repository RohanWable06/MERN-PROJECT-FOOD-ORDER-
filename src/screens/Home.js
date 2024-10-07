import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import Carousal from "../components/Carousal";

export default function Home() {
  return (
    <div>
      <div>
        <Navbar></Navbar>
      </div>
      <div >
        <Carousal></Carousal>
      </div >
      <div className="mx-3 my-5">
        <Card></Card>
        </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
