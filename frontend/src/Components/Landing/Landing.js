import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../UserContext";
import './Landing.css'

const Landing = () => {
  const { currentUser } = useContext(UserContext);
  return (
    <div className="Home">
      <div className="container text-center">
        <h1 className="mb-4 font-weight-bold">Jobly</h1>
        <p className="lead">All the jobs in one, convenient place.</p>
        {currentUser ? (
          <h2>Welcome Back {currentUser.firstName}!</h2>
        ) : (
          <Link className="btn btn-primary font-weight-bold" to="/login">
            Log in
          </Link>
        )}
      </div>
    </div>
  );
}

export default Landing
