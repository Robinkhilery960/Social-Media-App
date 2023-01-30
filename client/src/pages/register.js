import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../redux/actions/authAction";

function Register() {
  const { auth, alert } = useSelector((state) => state);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initialState = {
    fullName: "",
    userName: "",
    email: "",
    password: "",
    cf_password: "",
    gender: "male",
  };

  const [userData, setUserData] = useState(initialState);

  const [typePass, setTypePass] = useState(false);
  const [typeCfPass, setTypeCfPass] = useState(false);

  const { fullName, userName, email, password, cf_password } = userData;

  // this use effect will run if there is change in the access token or in the history
  useEffect(() => {
    // access token exist  means already login
    if (auth.token) {
      // will take you to the home
      navigate("/");
    }
  }, [auth.token, navigate]);

  const handleChangeInput = (e) => {
    // console.log(e.target);
    const { name, value } = e.target;
    // console.log(name,value)
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register(userData));
  };
  return (
    <div className="auth_page">
      <h3 className="text-uppercase text-center mb-2">The NETWORK</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="exampleInputFullName"> Full Name</label>
          <input
            type="text"
            className="form-control"
            id="fullName"
            aria-describedby="emailHelp"
            onChange={handleChangeInput}
            name="fullName"
            value={fullName}
            style={{ background: `${alert.fullName ? "#fd2d6a14" : ""}` }}
          />
          <small className="form-text text-danger">
            {alert.fullName ? alert.fullName : ""}
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputUserName"> User Name</label>
          <input
            type="text"
            className="form-control"
            id="userName"
            onChange={handleChangeInput}
            name="userName"
            value={userName.toLowerCase().replace(/ /g, "")}
            style={{ background: `${alert.userName ? "#fd2d6a14" : ""}` }}
          />
          <small className="form-text text-danger">
            {alert.userName ? alert.userName : ""}
          </small>
        </div>
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
            style={{ background: `${alert.email ? "#fd2d6a14" : ""}` }}
          />
          <small className="form-text text-danger">
            {alert.email ? alert.email : ""}
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
              style={{ background: `${alert.password ? "#fd2d6a14" : ""}` }}
            />
            <small onClick={() => setTypePass(!typePass)}>
              {typePass ? "Hide" : "show"}
            </small>
          </div>
          <small className="form-text text-danger">
            {alert.password ? alert.password : ""}
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputConfirmPassword">Confirm Password</label>
          <div className="pass">
            <input
              type={typeCfPass ? "text" : "password"}
              className="form-control"
              id="exampleInputConfirmPassword1"
              aria-describedby="passwordHelp"
              onChange={handleChangeInput}
              name="cf_password"
              value={cf_password}
              style={{ background: `${alert.cf_password ? "#fd2d6a14" : ""}` }}
            />
            <small onClick={() => setTypeCfPass(!typeCfPass)}>
              {typeCfPass ? "Hide" : "show"}
            </small>
          </div>
          <small className="form-text text-danger">
            {alert.cf_password ? alert.cf_password : ""}
          </small>
        </div>
        <div className="row justify-content-between mx-0 mb-1">
          <label htmlFor="male">
            Male:{" "}
            <input
              type="radio"
              id="male"
              name="gender"
              value="male"
              defaultChecked
              onChange={handleChangeInput}
            />
          </label>
          <label htmlFor="female">
            Female:{" "}
            <input
              type="radio"
              id="female"
              name="gender"
              value="female"
              onChange={handleChangeInput}
            />
          </label>
          <label htmlFor="other">
            Other:{" "}
            <input
              type="radio"
              id="other"
              name="gender"
              value="other"
              onChange={handleChangeInput}
            />
          </label>
        </div>

        <button type="submit" className="btn btn-dark  w-100">
          Register
        </button>
        <p className="my-2">
          Already have an account?{" "}
          <Link to="/login" style={{ color: "crimson" }}>
            Login Now
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
