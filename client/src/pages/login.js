import React, { useState,useEffect } from "react";
import { Link ,useNavigate} from "react-router-dom";
import { login } from "../redux/actions/authAction";
import { useDispatch, useSelector } from "react-redux";

function Login() {
  const initialState = { email: "", password: "" };

  const [userData, setUserData] = useState(initialState);

  const [typePass, setTypePass] = useState(false);

  const { email, password } = userData;
  const {auth}=useSelector(state=>state)
  const dispatch = useDispatch();
  const navigate=useNavigate()


  const handleChangeInput = (e) => {
    // console.log(e.target);
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(userData));
  };


  useEffect(() => {
    // access token exist  means already login
    if (auth.token) {
      // will take you to the home
      navigate("/");

    }
  }, [auth.token, navigate]);

  
  return (
    <div className="auth_page">
      <h3 className="text-uppercase text-center mb-2">The NETWORK</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="exampleInputEmail">Email Address</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            onChange={handleChangeInput}
            name="email"
            value={email}
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else{" "}
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword">Password</label>
          <div className="pass">
            <input
              type={typePass ? "text" : "password"}
              className="form-control"
              id="exampleInputPassword1"
              aria-describedby="passwordHelp"
              onChange={handleChangeInput}
              name="password"
              value={password}
            />
            <small onClick={() => setTypePass(!typePass)}>
              {typePass ? "Hide" : "show"}
            </small>
          </div>
          
        </div>
        <button
          type="submit"
          className="btn btn-dark  w-100"
          disabled={email && password ? false : true}
        >
          Login
        </button>
        <p className="my-2">
          You don't have an account?{" "}
          <Link to="/register" style={{ color: "crimson" }}>
            Register Now
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
