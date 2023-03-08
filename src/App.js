import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Photos from './pages/Photos';
import styled from 'styled-components';
import Background from "./assets/pages/home_background.png";

const StyledPage = styled.div`
    height: 100vh;
    width: 100vw;
`;

function App() {
  return (
    <StyledPage className="App">
        <Routes>
          <Route path="/" element={ <Home/> } />
          <Route path="photos" element={ <Photos/> } />
      </Routes>
    </StyledPage>
  );
}

export default App;