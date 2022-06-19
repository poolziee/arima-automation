import theme from './style/theme/theme';
import {ThemeProvider, CssBaseline} from "@mui/material";

import App from './App.js';
import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter as Router} from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
            <Router>
                <ThemeProvider theme={theme}>
                    <CssBaseline/>
                    <App/>
                    </ThemeProvider>
            </Router>
);