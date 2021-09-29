import React, { useState } from "react";
import {
  Drawer,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  IconButton,
  makeStyles,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import SignIn from "./SignIn";

const drawerWidth = 400


const useStyles = makeStyles({
  paper: {
    width: drawerWidth,
  },
});

export default function IsolatedSideBar() {
  const classes = useStyles();
  const [drawerOpened, setDrawerOpened] = useState(true);
  const [authOpened, setAuthOpened] = useState(false);

  return (
    <div>
      <IconButton
        style={{ position: "absolute", right: (drawerOpened && drawerWidth) || 0}}
        variant="contained"
        color="primary"
        onClick={() => setDrawerOpened(!drawerOpened)}
      >
        {drawerOpened ? <ChevronRight /> : <ChevronLeft />}
      </IconButton>
      <React.Fragment>
        <Drawer
          anchor={"right"}
          open={drawerOpened}
          onClose={() => setDrawerOpened(!drawerOpened)}
          classes={{ paper: classes.paper }}
        >
            <div style={{margin: 20}}>
            <Typography variant="h6">Welcome to the LBDserver plugin demo</Typography>
            <hr/>
            <Typography variant="body1">This drawer allows you to authenticate to a Solid IDP, to choose a consolid project and develop your plugin independent from a main container application.</Typography>
            <br/>
            <br/>
            <Typography variant="body1">Visit <a target="_blank" href="https://lbdserver.org">https://lbdserver.org</a> for more information.</Typography>
            </div>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Authentication</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <SignIn/>
            </AccordionDetails>
          </Accordion>{" "}
        </Drawer>
      </React.Fragment>
    </div>
  );
}
