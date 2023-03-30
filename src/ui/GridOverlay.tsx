import { connect } from "react-redux";
import styled from "styled-components";
import { AppState, Grid, LayoutVBlock } from "../config/types";

const GridOverlayContainer = styled.div`
  position: relative;
  height: 0px;
  width: 0px;
`;

const GridBlock = styled.div`
  position: absolute;
  height: 16px;
  width: 16px;
  background: rgba(209, 114, 41, 0.59);
`;

const GridOverlay = (props: { grid: Grid }) => {
  const { grid } = props;

  return (
    <GridOverlayContainer>
      {grid.layout &&
        grid.layout.map((blockPosition: LayoutVBlock, index: number) => (
          <GridBlock
            key={index}
            style={{
              width: blockPosition.width,
              height: grid.block,
              left: blockPosition.x,
              top: 0,
            }}
          />
        ))}
    </GridOverlayContainer>
  );
};

function mapStateToProps(state: AppState) {
  return {
    grid: state.grid,
  };
}

const mapDispatchToProps = {
  //  userPacks: window.actions.userPacks,
};

export default connect(mapStateToProps, mapDispatchToProps)(GridOverlay);
