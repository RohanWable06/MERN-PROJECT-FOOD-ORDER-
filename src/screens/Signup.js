import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
export default function Signup() {
    const URL="http://localhost:5000/api/createuser";
  const [credentials, setcredentials] = useState({
    name: "",
    email: "",
    password: "",
    location: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios.post(URL,credentials)
    .then((res)=>{
        if(res.data.success){
            emptyForm();
            alert("Registerd Successfully")
           

        }else{
            alert("Enter Valid Credentials")
        }
    })
    .catch((err)=>{
        alert("Enter Valid Credentials")
        
    })

    const emptyForm=()=>{
        setcredentials({
            name: "",
            email: "",
            password: "",
            location: ""
        })
    }
  };

  const myStyle = {
    backgroundImage:
      "url(https://t4.ftcdn.net/jpg/03/72/39/47/240_F_372394700_WNMuR1TgPkayi2x3gtrQGpBDUvFEZT2v.jpg)",
    height: "100vh",
    marginTop: "10px",
    fontSize: "20px",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    color:"white"
  };

  return (
    <div style={myStyle}>
        <div>
        <Navbar></Navbar>
      </div>
      <div className="container my-5" >
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label for="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={credentials.name}
              onChange={(e)=>{setcredentials({...credentials,name:e.target.value})}}
              required
            />
          </div>
          <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              name="email"
              value={credentials.email}
              onChange={(e)=>{setcredentials({...credentials,email:e.target.value})}}
              required
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label for="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              name="password"
              value={credentials.password}
              onChange={(e)=>{setcredentials({...credentials,password:e.target.value})}}
              required
            />
          </div>
          <div className="mb-3">
            <label for="location" className="form-label">
              Location
            </label>
            <input
              type="text"
              className="form-control"
              name="location"
              value={credentials.location}
              onChange={(e)=>{setcredentials({...credentials,location:e.target.value})}}
              required
            />
          </div>
          <button type="submit" className="m-3 btn btn-primary">
            Submit
          </button>
          <Link to="/login" className="m-2 btn btn-danger">
            Already User
          </Link>
        </form>
      </div>
    </div>
  );
}
