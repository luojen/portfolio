import React, { useEffect, useState, useCallback, useMemo } from 'react';
import styled from 'styled-components';
import ProjectData from '../data/ProjectData';
import Card from './Card';

const StyledTable = styled.div`
    flex: 1;
    padding: 5% 10%;
    &:hover {
        cursor: default;
    }
`;

const StyledTableTitle = styled.div`
    font-size: large;
    font-family: 'p22-mackinac-pro';
    font-weight: 800;
    font-style: italic;
    text-align: right;
    margin-bottom: 10%;
    margin-bottom: 2%;
`;

const StyledTableSection = styled.div`
    margin-bottom: 10%;
`;

const StyledTableProject = styled.div`
    font-family: "neue-haas-grotesk-display", sans-serif;
    font-weight: 600;
    font-style: normal;
    font-size: small;
    text-align: right;
`;

export default function ProjectTable() {

    const [highestValue, setHighestValue] = useState(0);
    const [projects, setProjects] = useState(ProjectData);

    function handleProjectClick(category, project) {
        if (projects[category][project].order < 1) {
            const updatedProject = {...projects[category][project], order: highestValue + 1};
            const updatedCategory = {...projects[category], [project]: updatedProject};
            const updatedProjects = {...projects, [category]:updatedCategory};
            setProjects(updatedProjects);
            setHighestValue(highestValue + 1);
        } else {
            const updatedProject = {...projects[category][project], order: 0};
            const updatedCategory = {...projects[category], [project]: updatedProject};
            const updatedProjects = {...projects, [category]:updatedCategory};
            setProjects(updatedProjects);
        }
    }

    return (
        <StyledTable>
            {Object.keys(projects).map((category) => {
                return (
                    <StyledTableSection key={category}>
                        <StyledTableTitle> {category} </StyledTableTitle>
                        {Object.keys(projects[category]).map((project) => {
                            return (
                                <div key={project}>
                                    <StyledTableProject onClick={() => handleProjectClick(category, project)}> {projects[category][project].preview_title}</StyledTableProject>
                                    <Card 
                                        key={projects[category][project].key} 
                                        props={projects[category][project]}
                                        projects={projects}
                                        setProjects={setProjects}
                                        highestValue={highestValue}
                                        setHighestValue={setHighestValue}
                                    />
                                </div>
                            );
                            
                        })}
                    </StyledTableSection>
                );
            })}
        </StyledTable>  
    );
}