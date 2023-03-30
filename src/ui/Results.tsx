import { connect } from "react-redux";
import styled from "styled-components";
import { AppState, ImageResultRendered, Results } from "../config/types";

import ResultCard from "./ResultCard";

const ResultsContainer = styled.div`
  font-size: 24px;
  position: relative;
  margin-top: 72px;
`;

const ResultsRendered = (props: { results: Results }) => {
  const { results } = props;
  const { renderedResults, renderedFillers } = results;

  return (
    <ResultsContainer>
      {renderedResults &&
        renderedResults.map((result: ImageResultRendered, index: number) => {
          return (
            <div
              key={index}
              style={{
                position: "absolute",
                width: result.width,
                height: result.height,
                left: result.x,
                top: result.y,
              }}
            >
              <ResultCard result={result} index={index} />
            </div>
          );
        })}
      {renderedFillers &&
        renderedFillers.map((filler: ImageResultRendered, index: number) => {
          return (
            <div
              key={index}
              style={{
                position: "absolute",
                width: filler.width,
                height: filler.height,
                left: filler.x,
                top: filler.y,
              }}
            >
              <ResultCard
                result={filler}
                index={renderedResults.length + index}
              />
            </div>
          );
        })}
      {/* <GridOverlay /> */}
    </ResultsContainer>
  );
};

function mapStateToProps(state: AppState) {
  return {
    grid: state.grid,
    results: state.results,
  };
}

const mapDispatchToProps = {
  //  userPacks: window.actions.userPacks,
};

export default connect(mapStateToProps, mapDispatchToProps)(ResultsRendered);
