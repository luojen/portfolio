import React, { useState } from 'react';
import ProjectTable from '../components/ProjectTable';
import styled from 'styled-components';

const StyledPage = styled.div`
    display: flex;
    flex-direction: row;
    height: 100%;
`;

const StyledName = styled.div`
    font-size: large;
    font-family: 'p22-mackinac-pro';
    font-weight: 800;
    font-style: italic;
    margin-bottom: 10%;
`;

const StyledDescription = styled.div`
    font-size: small;
    font-family: "neue-haas-grotesk-display", sans-serif;
    font-weight: 600;
    font-style: normal;
`;

const StyledNav = styled.div`
    margin-top: auto;
    font-family: 'p22-mackinac-pro';
    font-weight: 800;
    font-size: large;
`;

const StyledLink = styled.a`
    color: #FFFAE4;
    text-decoration: underline;
    &:hover {
        cursor: pointer;
        text-decoration: none;
    }
`;

const StyledAbout = styled.div`
    justify-self: flex-start;
    min-width: 250px;
    max-width: 250px;
    display: flex;
    flex-direction: column;
    flex: 2;
    padding-top: 10px;
    padding-left: 20px;
    padding-bottom: 20px;
`;

const StyledTable = styled.div`
    flex: 2;
    display: flex;
    flex-direction: column;
    min-width: 300px;
    max-width: 300px;
`;

const StyledSeparator = styled.div`
    flex: 2;
`;

export default function Home() {
    return (
        <StyledPage>  
            <StyledAbout>
                <StyledName>
                    Jen Luo is a product designer based in Los Angeles.
                </StyledName>
                <StyledDescription>
                    Recently, she has... <br/>
                    * Advised student research projects as a teaching assistant for <StyledLink target="_blank" href="https://hcicourses.stanford.edu/cs347/2023/">Stanford's capstone class in human-computer interaction research.</StyledLink> <br/>
                    * Graduated with a B.S. in computer science and M.S. in interaction design from Stanford University. <br/>
                    * Received a <StyledLink target="_blank" href="https://brown.stanford.edu/portfolio/down-ballots/">year-long grant in data journalism from the Brown Institute.</StyledLink> <br/>
                    * Worked on design and engineering problems at <StyledLink target="_blank" href="https://shopcanal.com/">Canal.</StyledLink> <br/>
                    * Exhibited at the Stanford Art Gallery. <br/> 
                    * <StyledLink>Taken photos commercially and personally.</StyledLink> <br/>
                    * <StyledLink target="_blank" href="https://www.goodreads.com/user/show/66194132-jen">Read many books.</StyledLink>  
                </StyledDescription>
                <StyledNav>
                    ABOUT<br/>
                    RESUME <br/>
                    EMAIL <br/>
                </StyledNav> 
            </StyledAbout>
            <StyledSeparator/>
            <StyledTable>
                <ProjectTable/>  
            </StyledTable>
        </StyledPage>
    );
}