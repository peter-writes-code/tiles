import CircularProgress from "@mui/material/CircularProgress";
import { connect } from "react-redux";
import styled from "styled-components";
import { AppState, Filter } from "../config/types";

const LoaderContainer = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.64);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Loader = (props: { filter: Filter }) => {
  const { filter } = props;
  const { loading } = filter;

  return loading && loading.length ? (
    <LoaderContainer>
      <CircularProgress color="primary" size={72} thickness={6.4} />
    </LoaderContainer>
  ) : null;
};

function mapStateToProps(state: AppState) {
  return {
    filter: state.filter,
  };
}

const mapDispatchToProps = {
  // selectOption: actions.selectOption,
  // unselectOption: actions.unselectOption,
};

export default connect(mapStateToProps, mapDispatchToProps)(Loader);
