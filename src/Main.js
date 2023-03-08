import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Photos from './pages/Photos';

const Main = () => {
  return (
    <Routes>
      <Route exact path='/' component={Home}></Route>
      <Route exact path='/photos' component={Photos}></Route>
    </Routes>
  );
}

export default Main;