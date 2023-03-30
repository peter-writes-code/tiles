import { connect } from "react-redux";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import styled, { keyframes } from "styled-components";
import { AppState, Filter } from "../config/types";

const fadeInAnimation = keyframes`
 0% { margin-top: 128px; opacity: 0; }
 100% { margin-top: 0px; opacity: 1; }
`;

const NoResultsContainer = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999999;
  font-size: 96px;
  pointer-events: none;
  animation-name: ${fadeInAnimation};
  animation-duration: 0.44s;
  animation-timing-function: ease;
  animation-iteration-count: 1;
`;

const NoResults = (props: { filter: Filter }) => {
  const { filter } = props;
  const { selection, theme } = filter;

  return theme && !selection.length ? (
    <NoResultsContainer>
      <CancelPresentationIcon fontSize="inherit" color="primary" />
    </NoResultsContainer>
  ) : null;
};

function mapStateToProps(state: AppState) {
  return {
    filter: state.filter,
  };
}

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(NoResults);
