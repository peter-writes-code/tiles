import CircularProgress from "@mui/material/CircularProgress";
import { connect } from "react-redux";
import styled, { keyframes } from "styled-components";
import Typography from "@mui/material/Typography";
import { useState } from "react";

import actions from "../actions/index";
import calculateDisplayDimensions from "../util/calculateDisplayDimensions";
import { AppState, DisplayDimensions, ImageResult, ScreenType } from "../config/types";

const fadeInAnimation = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`;
const fadeInDetailsAnimation = keyframes`
  0% { margin-bottom: -128px; opacity: 0; }
  100% { margin-bottom: 16px; opacity: 1; }
`;
const fadeInImageAnimation = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`;
const DetailsContent = styled.div`
  border-radius: 0 9px 9px 0;
  background-color: rgba(0, 0, 0, 0.75);
  position: relative;
  margin-bottom: 16px;
  padding-top: 12px;
  padding-bottom: 14px;
  padding-left: 16px;
  padding-right: 24px;
  animation-name: ${fadeInDetailsAnimation};
  animation-duration: 0.44s;
  animation-timing-function: ease;
`;
const DetailsContainer = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: start;
  justify-content: end;
  flex-direction: column;
`;
const LoaderContainer = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ImageDisplay = styled.div`
  background-size: cover;
  background-position: center center;
  position: relative;
  left: 0;
  top: 0;
  animation-name: ${fadeInImageAnimation};
  animation-duration: 0.44s;
  animation-timing-function: ease;
`;
const ImageLoader = styled.img`
  opacity: 0;
  position: absolute;
  width: 0px;
  height: 0px;
`;
const ImageToShowContainer = styled.div`
  position: fixed;
  z-index: 9999;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.84);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  animation-name: ${fadeInAnimation};
  animation-duration: 0.44s;
  animation-timing-function: ease;
`;

const ImageToShow = (props: {
  hideImage: Function;
  imageShown: ImageResult;
  screenType: ScreenType;
}) => {
  const { hideImage, imageShown, screenType } = props;
  const displayWidth = window.innerWidth || 0;
  const displayHeight = window.innerHeight || 0;
  const displayDimensions: DisplayDimensions = calculateDisplayDimensions(
    imageShown.width,
    imageShown.height,
    displayWidth,
    displayHeight
  );
  const [loaded, setLoaded] = useState(false);

  const handleHide = () => {
    setLoaded(false);
    hideImage();
  };
  const isMobile = screenType === "mobile";

  return imageShown.src ? (
    <ImageToShowContainer onClick={handleHide}>
      {!loaded ? (
        <div>
          <LoaderContainer>
            <ImageLoader
              src={imageShown.src.large2x}
              onLoad={() => setLoaded(true)}
            />
            <CircularProgress color="primary" size={72} thickness={6.4} />
          </LoaderContainer>
        </div>
      ) : null}
      {loaded ? (
        <div>
          <ImageDisplay
            style={{
              backgroundImage: `url(${imageShown.src.large2x})`,
              width: displayDimensions.width,
              height: displayDimensions.height,
            }}
          />
          <DetailsContainer>
            <DetailsContent>
              <Typography variant={isMobile ? "body1" : "h6"} align="left">
                {imageShown.alt || "Untitled"}
              </Typography>
              <Typography variant={isMobile ? "caption" : "body1"}>
                {`by ${imageShown.photographer || "unknown"}`}
              </Typography>
            </DetailsContent>
          </DetailsContainer>
        </div>
      ) : null}
    </ImageToShowContainer>
  ) : null;
};

function mapStateToProps(state: AppState) {
  return {
    imageShown: state.imageShown,
    screenType: state.screenType,
  };
}

const mapDispatchToProps = {
  hideImage: actions.hideImage,
};

export default connect(mapStateToProps, mapDispatchToProps)(ImageToShow);
