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

async function getAuthentication(session) {
  try {
    if (!session.info.isLoggedIn) {
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
    const sess = await getDefaultSession();
    return sess;
  } catch (error) {
    console.log(`error`, error);
  }
}

export default function SignIn() {
  const [session, setSession] = useRecoilState(sess);
  const [trigger, setTrigger] = useRecoilState(t);
  const [oidcIssuer, setOidcIssuer] = useState("http://localhost:5000");
  const [loading, setLoading] = useState(false);

  // this function only runs when the component mounts. If the mount is the result of a redirect from a Solid Identity Provider, the Session is verified and extracted, and the user is authenticated.
  useEffect(() => {
    setLoading(true);
    getAuthentication(session).then((s) => {
      setSession(() => s);
      
    }).then(() => setLoading(false));
  }, []);

  // This function is called when the login button is clicked. If the user logs in as a guest, an unauthenticated solid session is created.
  const onLoginClick = async (e) => {
    try {
      setLoading(true);
      if (!session.info.isLoggedIn) {
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
      try {
        await session.logout();
        setTrigger((t) => t + 1);
      } catch (error) {
        if (session.info.isLoggedIn) {
          localStorage.clear();
          setSession(new Session());
        }
      }

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
          {session && session.info && session.info.isLoggedIn ? (
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={onLogoutClick}
            >
              Sign out
            </Button>
          ) : (
            <div>
              <form onSubmit={(e) => e.preventDefault()} noValidate>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={onLoginClick}
                >
                  {session && session.info.isLoggedIn ? "Log out" : "Log in"}
                </Button>
              </form>
            </div>
          )}
        </Container>
      )}
    </React.Fragment>
  );
}
