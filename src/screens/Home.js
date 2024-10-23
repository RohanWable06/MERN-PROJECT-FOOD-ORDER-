import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import Carousal from "../components/Carousal";
import axios from "axios";

export default function Home() {
  const[foodCat,setFoodCat] = useState([]);
  const[fooditem,setFoodItem]=useState([]);
  const[search,setSearch]=useState(' ');
  const URL = "http://localhost:5000/api/foodData";


  useEffect(()=>{
    loadData();
  },[])

  const loadData = async () =>{
    axios.post(URL)
    .then((res)=>{
      setFoodItem(res.data[0])
      setFoodCat(res.data[1])
    })
    .catch((err)=>{
      console.log(err)
    })
  }
  
  return (
    <div>
      <div>
        <Navbar></Navbar>
      </div>
      <div >
      <div
      id="carouselExampleFade"
      className="carousel slide carousel-fade "
      data-bs-ride="carousel"
      style={{objectFit:"contain !important "}}
    >
      <div className="carousel-inner mx-50" id="carousel">
        <div className="carousel-caption" style={{zIndex:"2"}}>
          <div className="d-flex justify-content-center">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={search} 
              onChange={(e)=>{setSearch(e.target.value)}}
            />
            <button className="btn btn-outline-success text-white bg-success" type="submit" value={search} onChange={(e)=>{setSearch(e.target.value)}}>
              Search
            </button>
          </div>
        </div>
        <div className="carousel-item active ">
          <img
            src="https://picsum.photos/1550/300?random=1"
            className="d-block "
            style={{filter:"brightness(50%)"}}
          />
        </div>
        <div className="carousel-item">
          <img
            src="https://picsum.photos/1550/300?random=2"
            className="d-block"
            style={{filter:"brightness(50%)"}}
          />
        </div>
        <div className="carousel-item">
          <img
            src="https://picsum.photos/1550/300?random=3"
            className="d-block w-100"
            style={{filter:"brightness(50%)"}}
          />
        </div>
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleFade"
        data-bs-slide="prev"
      >
        <span
          className="carousel-control-prev-icon"
          aria-hidden="true"
        ></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleFade"
        data-bs-slide="next"
      >
        <span
          className="carousel-control-next-icon"
          aria-hidden="true"
        ></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
      </div >
      <div className="container">
        {
          foodCat!= [] ? foodCat.map((data)=>{
            return(
              <div className="row mb-3">
              <div key={data._id} className="fs-3 m-3">
                {data.CategoryName} 
              </div>
              <hr/>
              
              { fooditem != [] ? fooditem
                .filter((item)=> (data.CategoryName === item.CategoryName) && (item.name.toLowerCase().includes(search.toLocaleLowerCase())))
                .map(filterItem=>{
                  return(
                    <div key={filterItem._id} className="col-12 col-md-6 col-lg-3">
                        <Card food = {filterItem} ></Card>
                    </div>
                  )
                }):<div>****************</div>
              }
              </div>
            )
          })
          :<div>****************</div>
        }
        
        </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
