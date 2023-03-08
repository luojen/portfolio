import React, { useState, useEffect } from 'react';
import ProjectTable from '../components/ProjectTable';
import About from './About.js'
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Background from '../assets/pages/home_background.png';

const Page = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #444444;
    background-image: url("${Background}");
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    -webkit-background-size: cover;
    -moz-background-size: cover;
     -o-background-size: cover;
    overflow: hidden;
`;

const Content = styled.div`
    display: flex;
    flex-direction: column;
`;

const Title = styled.div`
    font-size: x-large;
    font-family: 'p22-mackinac-pro';
    font-weight: 800;
    font-style: italic;
    text-align: center;
    align-self: center;
    max-width: 400px;
    &:hover {
        color: white;
        cursor: default;
    }
    &::selection {
        background-color: black;
        color: white;
    }
`;

const Star = styled.span`
    font-style: normal;
    &::selection {
        background-color: black;
        color: white;
    }
`;

const Information = styled.div`
    width: 100%;
    max-width: 500px;
    display: flex;
    flex-direction: row;
`;

const Description = styled.div`
    flex: 1;
    max-width: 200px;
    text-align: right;
    padding: 15px;
    font-size: small;
    font-family: "neue-haas-grotesk-display", sans-serif;
    font-weight: 600;
    font-style: normal;
`;

const DescriptionItem = styled.div`
    cursor: default;
    margin-bottom: 5px;
    &::selection {
        background-color: black;
        color: white;
    }
`;

const ExternalLink = styled.a`
    text-decoration: none;
    color: #444444;
    &:hover {
        color: white;
        cursor: default;
        text-decoration: none;
    }
    &::selection {
        background-color: black;
        color: white;
    }
`;

const InternalLink = styled(Link)`
  text-decoration: none;
  color: #444444;
  &:hover {
        color: white;
        cursor: default;
        text-decoration: none;
    }
    &::selection {
        background-color: black;
        color: white;
    }
`;


export default function Home() {

    const [aboutPageIsOpen, setAboutPageIsOpen] = useState(false);
    const [highestValue, setHighestValue] = useState(0);

    useEffect(() => {
        document.body.style.backgroundImage = `url(${Background})`;
        return () => {
            document.body.style.backgroundImage = '';
        }
     },[]);

    return (
        <Page>  
            <Content>
                {aboutPageIsOpen && <About highestValue={highestValue} setHighestValue={setHighestValue} setAboutPageIsOpen={setAboutPageIsOpen}/>}
                <Title onClick={() => setAboutPageIsOpen(true)}>
                    Jen Luo is a product designer based in Los Angeles. <Star>✦</Star> 
                </Title>
                <Information>
                    <Description>
                        <DescriptionItem> Recently, she... </DescriptionItem>
                        <DescriptionItem> ＊ Taught <ExternalLink target="_blank" href="https://hcicourses.stanford.edu/cs347/2023/"> Stanford's capstone course in human-computer interaction research. </ExternalLink> </DescriptionItem>
                        <DescriptionItem> ＊ Received a <ExternalLink target="_blank" href="https://brown.stanford.edu/portfolio/down-ballots/"> year-long grant in data journalism from the Brown Institute. </ExternalLink> </DescriptionItem>
                        <DescriptionItem> ＊ Worked on <ExternalLink target="_blank" href="https://shopcanal.com/"> design and engineering problems at  Canal. </ExternalLink> </DescriptionItem>
                        <DescriptionItem> ＊ Exhibited at the Stanford Art Gallery. </DescriptionItem>
                        <DescriptionItem> ＊ Graduated with a B.S. in computer science from Stanford University. </DescriptionItem>
                        <DescriptionItem> ＊ Pursuing a M.S. in interaction design from Stanford University. </DescriptionItem>
                        <DescriptionItem> ＊ <InternalLink to="photos" target="_blank"> Took some photos. </InternalLink> </DescriptionItem>
                    </Description>
                    <ProjectTable highestValue={highestValue} setHighestValue={setHighestValue}/>  
                </Information>
            </Content>
        </Page>
    );
}