import CircularProgress from "@mui/material/CircularProgress";
import { connect } from "react-redux";
import styled, { keyframes } from "styled-components";
import { useState } from "react";

import actions from "../actions";
import { AppState, ImageResultRendered } from "../config/types";

const fadeInAnimation = keyframes`
 0% { margin-top: 128px; opacity: 0; }
 100% { margin-top: 0px; opacity: 1; }
`;

const fadeInImageAnimation = keyframes`
 0% { opacity: 0; }
 100% { opacity: 1; }
`;

const ImageLoader = styled.img`
  opacity: 0;
  position: absolute;
  width: 0px;
  height: 0px;
`;

const ResultCardBackground = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  opacity: 0.72;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ResultCardContainer = styled.div`
  border-radius: 4px;
  overflow: hidden;
  position: relative;
  width: 100%;
  height: 100%;
  animation-name: ${fadeInAnimation};
  animation-duration: 0.44s;
  animation-timing-function: ease;
  cursor: pointer;
`;

const ResultCardImage = styled.div`
  background-size: cover;
  background-position: center center;
  width: 100%;
  height: 100%;
  position: absolute;
  animation-name: ${fadeInImageAnimation};
  animation-duration: 0.44s;
  animation-timing-function: ease;
`;

const ResultCard = (props: {
  showImage: Function;
  index: number;
  result: ImageResultRendered;
}) => {
  const { showImage, index, result } = props;

  const [faded, setFaded] = useState(false);
  const [hover, setHover] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const handleShowImage = () => {
    showImage(result.imageResult);
  };

  setTimeout(() => setFaded(true), index * 64 + 400);
  return (
    <ResultCardContainer
      style={{
        animationDelay: `${index * 0.064}s`,
        opacity: faded ? 1 : 0,
      }}
      onMouseOver={() => setHover(true)}
      onMouseOut={() => setHover(false)}
      onMouseDown={handleShowImage}
    >
      <ResultCardBackground
        style={{
          backgroundColor: result.imageResult.avg_color,
        }}
      >
        {!loaded ? (
          <CircularProgress
            color="inherit"
            style={{ color: "rgba(255, 255, 255, .36)" }}
            size={36}
            thickness={6.4}
          />
        ) : null}
      </ResultCardBackground>
      {!loaded ? (
        <ImageLoader src={result.src} onLoad={() => setLoaded(true)} />
      ) : null}
      {loaded ? (
        <ResultCardImage
          style={{
            backgroundImage: `url(${result.src})`,
            opacity: hover ? 0.72 : 1,
          }}
        />
      ) : null}
    </ResultCardContainer>
  );
};

function mapStateToProps(state: AppState) {
  return {};
}

const mapDispatchToProps = {
  showImage: actions.showImage,
};

export default connect(mapStateToProps, mapDispatchToProps)(ResultCard);
