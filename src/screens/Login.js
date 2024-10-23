import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
export default function Login() {
  const URL = "http://localhost:5000/api/loginuser";
  const navigate=useNavigate();
  const [credentials, setcredentials] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios
      .post(URL, credentials)
      .then((res) => {
        if (res.status === 200) {
          localStorage.setItem("authToken",res.data.authToken);
          navigate("/");
        } else {
          alert("Enter Valid Credentials");
        }
      })
      .catch((e) => {
        alert("Enter Valid Credentials");
      });
  };

  const myStyle = {
    backgroundImage:
      "url(https://img.freepik.com/free-photo/top-view-food-frame-with-copy-space_23-2148723447.jpg?w=996&t=st=1728247071~exp=1728247671~hmac=01c3051a7ee79abe4d78fb7e4a4be760802bc31094b859279c12e3b806d23c00)",
    height: "100vh",
    fontSize: "20px",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };

  return (
    <div >
      <div>
        <Navbar></Navbar>
      </div>
      <div style={myStyle}>
        <section className="vh-100">
          <div className="container py-5 h-100">
            <div className="row d-flex align-items-center justify-content-center h-100">
              <div className="col-md-8 col-lg-7 col-xl-6"></div>
              <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
                <form>
                  <div>
                    <label
                      className="form-label "
                      for="form1Example13"
                      style={{ color: "white", fontSize: "50px" }}
                    >
                      Login
                    </label>
                  </div>
                  {/* <!-- Email input --> */}
                  <div data-mdb-input-init className="form-outline mb-4">
                    <input
                      type="email"
                      id="email"
                      className="form-control form-control-lg"
                      placeholder="abc@gmail.com"
                      value={credentials.email}
                      onChange={(e) => {
                        setcredentials({
                          ...credentials,
                          email: e.target.value,
                        });
                      }}
                    />
                    <label
                      className="form-label"
                      for="form1Example13"
                      style={{ color: "white" }}
                    >
                      Email address
                    </label>
                  </div>

                  {/* <!-- Password input --> */}
                  <div data-mdb-input-init className="form-outline mb-4">
                    <input
                      type="password"
                      id="password"
                      className="form-control form-control-lg"
                      placeholder="password"
                      value={credentials.password}
                      onChange={(e) => {
                        setcredentials({
                          ...credentials,
                          password: e.target.value,
                        });
                      }}
                    />
                    <label
                      className="form-label"
                      for="form1Example23"
                      style={{ color: "white" }}
                    >
                      Password
                    </label>
                  </div>
                  {/* <!-- Submit button --> */}
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg btn-block m-3"
                    onClick={handleSubmit}
                  >
                    Sign in
                  </button>
                  <Link
                    to="/createuser"
                    className=" btn btn-danger btn-lg btn-block m-2 "
                  >
                    Sign up
                  </Link>
                  <Link href="#!" className="mx-5">
                    Forgot password?
                  </Link>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
