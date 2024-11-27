import React, { useEffect, useState } from 'react'
import "../../styles/Login.css"
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import toastOptions from '../../constants/toast';
import { toast } from "react-toastify";
import { loginUser } from '../../redux/Actions/userActions';

const RetailerLogin = () => {
    const spans = Array.from({ length: 128 });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, message, error, id, isAuthenticated } = useSelector(
    (state) => state.userAuth
  );
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password);
    dispatch(loginUser(email, password));
  };

  useEffect (() => {
    if (isAuthenticated) {
       return  navigate("/");
      }
    if (message) {
      console.log(message);
      toast.success(message, toastOptions);
      dispatch({
        type: "CLEAR_MESSAGE",
      });

    }
    if (error) {
      console.log(error);
      toast.error(error, toastOptions);
      dispatch({ type: "CLEAR_ERROR" });
    }
    
  }, [dispatch, message, error, isAuthenticated, id, navigate]);

  return (
    <section>
      <div className="login-cont">
        {spans.map((_, index) => (
          <span key={index} className="span"></span>
        ))}
        <div className="signin">
          <div className="content">
            <h2>Login</h2>
            <form className="form" onSubmit={handleSubmit}>
              <div className="inputBx">
              <i>Email</i>
                <input
                  type="email"
                  value={email}
                  placeholder='Email'
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                
              </div>
              <div className="inputBx">
              <i>Password</i>
                <input
                  type="password"
                  value={password}
                    placeholder='Password'
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                
              </div>
              <div className="links">
                <Link to="/forgot-password">Forgot Pasword?</Link>
                <Link to="/retailerRegister">Sign Up</Link>
              </div>
              <div className="inputBx">
                <button type="submit" disabled={loading}>
                  {loading === true ? (
                    <span className="spinner"></span>
                  ) : (
                    "Login"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default RetailerLogin