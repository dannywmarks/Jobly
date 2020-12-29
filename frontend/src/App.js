import React, { useState, useEffect } from "react";
import { decode } from "jsonwebtoken";
import useLocalStorage from "./Hooks/useLocalStorage";
import Navbar from "./Components/Navbar/Navbar";
import Routes from "./Components/Routes/Routes";
import { BrowserRouter } from "react-router-dom";
import { Spinner } from "reactstrap";
import JoblyApi from "./api/JoblyApi";
import UserContext from "./UserContext";
import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";

export const TOKEN_STORAGE_ID = "jobly-token";

const App = () => {
  // state for infoLoaded : true or false
  const [infoLoaded, setInfoLoaded] = useState(false);
  // state for current user
  const [currentUser, setCurrentUser] = useState(null);
  const [applicationIds, setApplicationIds] = useState(new Set([]));

  //hook used for token state
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);

  console.debug(
    "App",
    "infoLoaded=",
    infoLoaded,
    "currentUser=",
    currentUser,
    "token=",
    token
  );
  // resets token and current user to null

  // api call to get current user token
  useEffect(
    function loadUserInfo() {
      console.debug("App useEffect loadUserInfo", "token=", token);

      async function getCurrentUser() {
        if (token) {
          try {
            // get username from the token
            let { username } = decode(token);
            JoblyApi.token = token;
            // search for user by user name
            let currentUser = await JoblyApi.getCurrentUser(username);
            setCurrentUser(currentUser);
          } catch (err) {
            console.error("App loadUserInfo: problem loading", err);
            setCurrentUser(null);
          }
        }
        setInfoLoaded(true);
      }

      setInfoLoaded(false);
      getCurrentUser();
    },
    [token]
  );

  //if info is not loaded show spinner waiting for load
  if (!infoLoaded) return <Spinner />;

  const handleLogOut = () => {
    setCurrentUser(null);
    setToken(null);
  };

  /** Checks if a job has been applied for. */
  function hasAppliedToJob(id) {
    return applicationIds.has(id);
  }

  /** Apply to a job: make API call and update set of application IDs. */
  function applyToJob(id) {
    if (hasAppliedToJob(id)) return;
    JoblyApi.applyToJob(currentUser.username, id);
    setApplicationIds(new Set([...applicationIds, id]));
  }

  // use context to access state through out app
  return (
    <BrowserRouter>
      <UserContext.Provider
        value={{ currentUser, setCurrentUser, hasAppliedToJob, applyToJob }}
      >
        <Navbar logout={handleLogOut} />
        <Routes setToken={setToken} />
      </UserContext.Provider>
    </BrowserRouter>
  );
};

export default App;
