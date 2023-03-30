import styled from "styled-components";

const MAX_WIDTH = 1376;
const MARGIN = 9;
const Container = styled.div`
  @media (max-width: ${MAX_WIDTH + 2 * MARGIN - 1}px) {
    width: vw;
    margin-left: ${MARGIN}px;
    margin-right: ${MARGIN}px;
  }
  @media (min-width: ${MAX_WIDTH + 2 * MARGIN}px) {
    width: ${MAX_WIDTH}px;
    margin: auto;
  }
`;

export default Container;
