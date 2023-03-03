import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './pages/Home';
import styled from 'styled-components';


const StyledPage = styled.div`
    height: 100vh;
    width: 100vw;
`;


const App = () => {
    return (
        <StyledPage>
            <Home/>
        </StyledPage>
    );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App/>);