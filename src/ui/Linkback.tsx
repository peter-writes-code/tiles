import { connect } from "react-redux";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import styled, { keyframes } from "styled-components";
import Typography from "@mui/material/Typography";
import { AppState, Filter } from "../config/types";

const fadeInAnimation = keyframes`
  0% { left: -128px; }
  100% { left: -8px; }
`;

const LinkbackContainer = styled.div`
  position: fixed;
  left: -8px;
  bottom: 24px;
  animation-name: ${fadeInAnimation};
  animation-duration: 0.48s;
  animation-timing-function: ease;
`;

const LinkbackContent = styled.div`
  margin-top: -12px;
  margin-bottom: -18px;
  margin-left: 8px;
`;

const LinkbackImage = styled.img`
  height: 29px;
`;

const Linkback = (props: { filter: Filter; }) => {
  const { filter } = props;
  const { initialized } = filter;

  return initialized ? (
    <LinkbackContainer>
      <Card>
        <CardContent>
          <LinkbackContent>
            <Typography variant="caption" gutterBottom>
              IMAGE API BY
            </Typography>
            <div>
              <a href="https://www.pexels.com" target="_blank" rel="noreferrer">
                <LinkbackImage src="https://images.pexels.com/lib/api/pexels.png" />
              </a>
            </div>
          </LinkbackContent>
        </CardContent>
      </Card>
    </LinkbackContainer>
  ) : null;
};

function mapStateToProps(state: AppState) {
  return {
    filter: state.filter,
  };
}

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Linkback);
