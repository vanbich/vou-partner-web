import React from 'react';
import './App.css';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';

// Material helpers
import { ThemeProvider } from '@material-ui/styles';

// Theme
import theme from './theme';

// Styles
import 'react-perfect-scrollbar/dist/css/styles.css';
import './assets/scss/index.scss';

// Routes
import Routes from './Routes';

// Browser history
const browserHistory = createBrowserHistory();

function App() {
  return (
      <ThemeProvider theme={theme}>
        <Router history={browserHistory}>
          <Routes />
        </Router>
      </ThemeProvider>  );
}

export default App;
