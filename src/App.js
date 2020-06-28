import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';

// Material helpers
import { ThemeProvider } from '@material-ui/styles';

// Theme
import theme from './theme';

// Styles
import 'react-perfect-scrollbar/dist/css/styles.css';
import './assets/scss/index.scss';

// Routes
import Routes from './Routes';

function App() {
  return (
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </ThemeProvider>  );
}

export default App;
