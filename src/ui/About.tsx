import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Button from "@mui/material/Button";
import CheckIcon from "@mui/icons-material/Check";
import { connect } from "react-redux";
import styled, { keyframes } from "styled-components";
import Typography from "@mui/material/Typography";
import { useState } from "react";

import actions from "../actions/index";
import { AppState, Filter } from "../config/types";

const fadeInAnimation = keyframes`
 0% { margin-top: 128px; opacity: 0; }
 100% { margin-top: 0px; opacity: 1; }
`;

const fadeInCheckAnimation = keyframes`
 0% { opacity: 0; transform: scale(.5); }
 50% { opacity: 1; transform: scale(1.5); }
 100% { opacity: 1; transform: scale(1); }
`;

const AboutContainer = styled.div`
  animation-name: ${fadeInAnimation};
  animation-duration: 0.96s;
  animation-timing-function: ease;
  margin-left: 16px;
  margin-right: 16px;
`;

const CheckContainer = styled.div`
  margin-top: 6px;
  animation-name: ${fadeInCheckAnimation};
  animation-duration: 0.64s;
  animation-timing-function: ease;
`;

const CreditsContainer = styled.div`
  margin-left: 4px;
  margin-top: 56px;
  max-width: 680px;
  margin-bottom: 16px;
`;

const EmailContainer = styled.div`
  display: flex;
  margin-bottom: 48px;
`;

const HowToContainer = styled.div`
  margin-left: 4px;
  margin-top: 36px;
  margin-bottom: 24px;
  max-width: 640px;
`;

const About = (props: { filter: Filter; initializeFilter: Function }) => {
  const { filter, initializeFilter } = props;
  const [emailCopied, setEmailCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("peterwritescode@gmail.com");
    setEmailCopied(true);
  };

  const handleLetsGo = () => {
    // : React.MouseEventHandler<HTMLAnchorElement>
    initializeFilter();
  };

  return !filter.initialized ? (
    <AboutContainer>
      <Typography variant="h3">Dynamic Gallery Demo</Typography>
      <Typography variant="h6">
        An open source react, redux, and typescript demo by Peter Gorgenyi
      </Typography>

      <HowToContainer>
        <Typography variant="h5" gutterBottom>
          How to experience this demo?
        </Typography>
        <Typography variant="body1">
          • Use the filter chips above to update results
          <br />
          • Use the menu on the top right to change the filter theme
          <br />
          • Resize the browser or rotate your handheld device to see the gallery
          layout automatically update itself
          <br />
        </Typography>
      </HowToContainer>
      <Button
        variant="contained"
        onClick={handleLetsGo}
        endIcon={<ArrowForwardIcon />}
      >
        Let's go!
      </Button>
      <CreditsContainer>
        <Typography variant="subtitle1">
          <p>
            I am currently looking for a new opportunity as a Senior Principal
            Front End Engineer.
          </p>
          <p>
            Email <b>peterwritescode@gmail.com</b> to request a resume.
          </p>
        </Typography>
      </CreditsContainer>
      <EmailContainer>
        <Button variant="text" onClick={handleCopyEmail}>
          Copy email address
        </Button>
        {emailCopied ? (
          <CheckContainer>
            <CheckIcon color="primary" />
          </CheckContainer>
        ) : null}
      </EmailContainer>
    </AboutContainer>
  ) : null;
};

function mapStateToProps(state: AppState) {
  return {
    filter: state.filter,
  };
}

const mapDispatchToProps = {
  initializeFilter: actions.initializeFilter,
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
