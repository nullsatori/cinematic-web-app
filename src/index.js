import React from 'react';
import { render } from 'react-dom';
import './login/index.scss';
import Auth from './App';
import Home from './App';

import { BrowserRouter } from "react-router-dom";
const rootElement = document.getElementById("root");
render(
    <BrowserRouter>
        <Auth/>
    </BrowserRouter>,
    rootElement
);
