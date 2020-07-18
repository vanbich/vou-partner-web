import React from "react";
import "./App.css";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import { applyMiddleware, createStore } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./reducers/index.js";
import thunk from "redux-thunk";

// Externals
import { Chart } from "react-chartjs-2";

// ChartJS helpers
import { chartjs } from "./helpers";

// Material helpers
import { ThemeProvider } from "@material-ui/styles";

// Theme
import theme from "./theme";

// Styles
import "react-perfect-scrollbar/dist/css/styles.css";
import "./assets/scss/index.scss";

// Routes
import Routes from "./Routes";

// Browser history
const browserHistory = createBrowserHistory();

const store = createStore(rootReducer, applyMiddleware(thunk));

// Configure ChartJS
Chart.helpers.extend(Chart.elements.Rectangle.prototype, {
  draw: chartjs.draw
});

function App() {
  return (
    <Provider store={store}>
      <Router history={browserHistory}>
        <ThemeProvider theme={theme}>
          <Routes />
        </ThemeProvider>
      </Router>
    </Provider>
  );
}

export default App;
