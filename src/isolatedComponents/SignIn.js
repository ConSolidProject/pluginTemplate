import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link, Redirect } from "react-router-dom";
import {
  TextField,
  Button,
  Typography,
  Container,
  CircularProgress,
} from "@material-ui/core";
import {
  Session,
  handleIncomingRedirect,
  getDefaultSession,
  login,
} from "@inrupt/solid-client-authn-browser";
import { trigger as t, session as sess } from "../atoms";
import { useRecoilState, useRecoilValue } from "recoil";

async function getAuthentication() {
  try {
    if (!getDefaultSession().info.isLoggedIn) {
      const params = new URLSearchParams(window.location.search);
      const solidCode = params.get("code");
      if (solidCode) {
        console.log("checking code param");
        await handleIncomingRedirect();
      } else {
        console.log("checking previous session data");
        await handleIncomingRedirect({ restorePreviousSession: true });
      }
    }
    return getDefaultSession();
  } catch (error) {
    console.log(`error`, error);
  }
}

export default function SignIn() {
  const [oidcIssuer, setOidcIssuer] = useState("http://localhost:5000");
  const [loading, setLoading] = useState(false);
  const [trigger, setTrigger] = useRecoilState(t);
  // this function only runs when the component mounts. If the mount is the result of a redirect from a Solid Identity Provider, the Session is verified and extracted, and the user is authenticated.
  useEffect(() => {
    getAuthentication().then((s) => setTrigger((t) => t + 1));
    console.log(`getDefaultSession()`, getDefaultSession());
  }, []);

  // This function is called when the login button is clicked. If the user logs in as a guest, an unauthenticated solid session is created.
  const onLoginClick = async (e) => {
    try {
      setLoading(true);
      if (!getDefaultSession().info.isLoggedIn) {
        await login({
          oidcIssuer,
          redirectUrl: window.location.href,
          clientName: "lbdserver",
        });
      }
      setLoading(false);
    } catch (error) {
      console.log(`error`, error);
    }
  };

  const onLogoutClick = async (e) => {
    try {
      // await getMyProjects()
      setLoading(true);
      const sess = getDefaultSession();
      await sess.logout();
      const s = await getAuthentication();
      setTrigger((t) => t + 1);
      //   if (session.info.isLoggedIn) {
      //     localStorage.clear();
      //     setSession(new Session());
      //   }
      setLoading(false);
    } catch (error) {
      console.log(`error`, error);
      setLoading(false);
    }
  };

  return (
    <React.Fragment>
      {loading ? (
        <CircularProgress
          style={{ marginTop: 200, position: "absolute", left: "50%" }}
          size="80px"
          color="secondary"
        />
      ) : (
        <Container component="main">
          {getDefaultSession().info.isLoggedIn ? (
            <div>
              <p>Welcome! Your are logged in as:</p>
              <a style={{ fontSize: 12}} href={getDefaultSession().info.webId}>
                {getDefaultSession().info.webId}
              </a>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={onLogoutClick}
                style={{marginTop: 20}}
              >
                Sign out
              </Button>
            </div>
          ) : (
            <div>
              <form onSubmit={(e) => e.preventDefault()} noValidate>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  value={oidcIssuer}
                  onChange={(e) => setOidcIssuer(e.target.value)}
                  id="idp"
                  label="Identity Provider"
                  name="idp"
                  autoFocus
                />
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={onLoginClick}
                >
                  Sign in
                </Button>
              </form>
            </div>
          )}
        </Container>
      )}
    </React.Fragment>
  );
}
