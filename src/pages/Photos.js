import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Background from '../assets/pages/home_background.png';
import PhotoData from '../data/PhotoData';

const Page = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #444444;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    -webkit-background-size: cover;
    -moz-background-size: cover;
     -o-background-size: cover;
    overflow: hidden;
`;

const Image = styled.img`
    object-fit: cover;
    object-position: center;
    max-width: 700px;
    max-height: 600px;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
`;

export default function Photos() {

    const [currentImage, setCurrentImage] = useState(0);

    function changeImage() {
        if (currentImage < PhotoData.length - 1) {
            setCurrentImage(currentImage + 1);
        } else {
            setCurrentImage(0);
        }
    }

    useEffect(() => {
        document.body.style.backgroundImage = `url(${Background})`;
        return () => {
            document.body.style.backgroundImage = '';
        }
     },[]);

    return (
        <Page>
            <Image src={PhotoData[currentImage]} draggable={false} onClick={() => changeImage()}>
            </Image>
        </Page>
    );
}