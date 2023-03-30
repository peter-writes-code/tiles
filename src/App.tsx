import actions from "./actions/index";
import { Provider } from "react-redux";
import store from "./store/index";

import About from "./ui/About";
import Container from "./ui/Container";
import Filter from "./ui/Filter";
import ImageToShow from "./ui/ImageToShow";
import Linkback from "./ui/Linkback";
import Loader from "./ui/Loader";
import materialTheme from "./config/materialTheme";
import NoResults from "./ui/NoResults";
import Results from "./ui/Results";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useRef } from "react";

const RESIZE_DELAY = 244;

const handleResize = () => {
  store.dispatch(actions.updateScreenType());
};
const initializeApp = () => {
  handleResize();
};
let resizeTimeout: NodeJS.Timeout;

const App = () => {
  (window as any).containerRef = useRef(null);
  if (!window.onresize) {
    window.onresize = () => {
      resizeTimeout && clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(handleResize, RESIZE_DELAY);
    };
    setTimeout(initializeApp, 64);
  }
  const theme = createTheme(materialTheme);

  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Container ref={(window as any).containerRef}>
          <Filter />
          <Results />
          <About />
        </Container>
        <NoResults />
        <Loader />
        <ImageToShow />
        <Linkback />
      </Provider>
    </ThemeProvider>
  );
};

export default App;
