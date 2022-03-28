import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router } from "react-router-dom";
import { StrictMode } from 'react';
import { ThemeSwitcherProvider } from "react-css-theme-switcher";

const themes = {
  dark: `${process.env.PUBLIC_URL}/dark-theme.css`,
  light: `${process.env.PUBLIC_URL}/light-theme.css`,
};


ReactDOM.render(
  <StrictMode>
    <Router>
      <ThemeSwitcherProvider 
        themeMap={themes} 
        defaultTheme="light"              
      >
        <App />
      </ThemeSwitcherProvider>
    </Router>
  </StrictMode>,
  document.getElementById('root')
);