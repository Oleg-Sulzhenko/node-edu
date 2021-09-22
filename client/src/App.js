import React, { Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'

import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';

import './App.css';

const App = () => (
  <Fragment>
    <Navbar/>
    <Landing/>
    <FontAwesomeIcon icon={faCoffee} />
  </Fragment>
);

export default App;
