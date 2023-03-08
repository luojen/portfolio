import React, { useEffect, useRef, useState, forwardRef } from 'react';
import Draggable from 'react-draggable';
import styled from 'styled-components';
import CloseEllipse from "../assets/icons/ellipse-close.svg";
import ExpandEllipse from "../assets/icons/ellipse-expand.svg";
import CloseEllipseFilled from "../assets/icons/ellipse-close-filled.svg";
import ExpandEllipseFilled from "../assets/icons/ellipse-expand-filled.svg";

const StyledCard = styled.div`
  border-style: solid;
  border-width: 1px;
  border-radius: 10px;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, .5);
  width: 450px;
  height: fit-content;
  max-height: 375px;
`;

const Header = styled.div`
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  border-bottom: solid;
  border-width: 0.5px;
  border-color: black;
  max-height: 15px;
  display: flex;
  background-color: #323232;
  font-family: "neue-haas-grotesk-text", sans-serif;
  font-weight: 600;
  font-style: normal;
  color: white;
  padding: 3px;
  padding-top: 4px;
  padding-bottom: 4px;
`;

const StyledHeaderContent = styled.span`
  color: #D1D1D1;
  font-size: x-small;
  flex: 1;
  text-align: center;
`;

const Icons = styled.div`
  width: fit-content;
  display: flex;
  flex-direction: row;
  padding-left: 5px;
`;

const Icon = styled.img`
  flex: 1;
  margin-right: 10px;
  position: relative;
  max-height: 10px;
`;

const HeaderElement = styled.span`
  flex: 1;
  display: flex;
  padding-left: 2px;
  padding-top: 2px;
`;

const StyledBody = styled.div`
  font-family: 'InterBold';
  max-height: 600px;
  padding: 15px;
  padding-top: 10px;
  display: table;
  flex-direction: row;
`;

const StyledPreviewImageContainer = styled.div`
  display: table-cell;
  display: flex;
  max-height: 300px;
  width: 200px;
  flex-direction: column;
  margin-top: 10px;
  overflow-y: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
     display: none;
  }
  &:hover {
      cursor: s-resize;
  }
`;

const StyledBodyContent = styled.div`
  display: table-cell;
  vertical-align: top;
  padding-top: 10px;
  padding-left: 20px;
  width: auto;
  max-height: 300px;
`;

const StyledPreviewImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
`;

const StyledBodyDescription = styled.div`
  font-size: small;
  font-family: "neue-haas-grotesk-text", sans-serif;
  font-weight: 400;
  font-style: normal;
  padding-top: 10px;
  padding-bottom: 10px;
  white-space: pre-line;
`;

const StyledBodyTitleContainer = styled.div`
  margin-bottom: 9px;
  color: #444444;
  width: fit-content;
  white-space: pre-line;
  overflow-wrap: break-word;
  font-size: large;
  font-family: 'p22-mackinac-pro';
  font-style: italic;
  font-weight: 800;
`;


const StyledBodyTitleLink = styled.a`
  color: #444444;
  text-decoration: none;
  &:hover {
      color: #FFFAE4;
      cursor: pointer;
  }
`;

const StyledBodyTags = styled.div`
  font-size: x-small;
  font-family: 'ibm-plex-mono', sans-serif;
  font-weight: 800;
  font-style: normal;
  display: flex;
  flex-direction: row;
`;

const StyledBodyPosition = styled.div`
  border-style: solid;
  padding-left: 3px;
  padding-right: 3px;
`;

const StyledBodyYear = styled.div`
  border-style: solid;
  padding-left: 3px;
  padding-right: 3px;
  margin-right: 8px;
`;

export default function Card({ 
  props, 
  projects,
  setProjects,
  highestValue,
  setHighestValue,
}) {  

  const [z, setZ] = useState(0);
  const [top, setTop] = useState(Math.floor(Math.random()*(window.innerHeight-350)));
  const [left, setLeft] = useState(Math.floor(Math.random()*((window.innerWidth-400)-400)));
  const [dragDisabled, setDragDisabled] = useState(false);
  const [showIconsFilled, setShowIconsFilled] = useState(false);
  const Chip = useRef();
  const CarouselRef = useRef();
  const LinkRef = useRef();
  const IconRef = useRef();

  useEffect(() => {
    function handleMouseDown(event) {
      if (Chip.current && Chip.current.contains(event.target)) {
        setZ(highestValue + 1);
        setHighestValue(highestValue + 1);
      }
    }
    function handleMouseOver(event) {
      if (IconRef.current && IconRef.current.contains(event.target)) {
        setShowIconsFilled(true);
      } else {
        setShowIconsFilled(false);
      }
      if ((CarouselRef.current && CarouselRef.current.contains(event.target)) || (LinkRef.current && LinkRef.current.contains(event.target))) {
        setDragDisabled(true);
      } else {
        setDragDisabled(false);
      }
    }
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseover", handleMouseOver);
    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
    }
  }, [Chip, highestValue]); 

  useEffect(() => {
    setZ(props.order);
  }, [props.order, props.preview_images]);

  

  if (props.order > 0)
    return (
      <Draggable disabled={dragDisabled}>
          <StyledCard 
            style={{
              position: 'absolute',
              zIndex: z,
              top: top,
              left: left,
              backgroundImage: `url(${props.background})`,
            }}
            ref={Chip}
          >
              <Header>
                <HeaderElement>
                  <Icons ref={IconRef}>
                    {!showIconsFilled && <Icon 
                      src={CloseEllipse} 
                      onClick={() => {
                          const updatedProject = {...projects[props.category][props.key], order: 0};
                          const updatedCategory = {...projects[props.category], [props.key]: updatedProject};
                          const updatedProjects = {...projects, [props.category]: updatedCategory};
                          setProjects(updatedProjects);
                      }}
                    />}
                    {(!showIconsFilled && props.expandable) && <Icon src={ExpandEllipse}/>}
                    {showIconsFilled && <Icon 
                      src={CloseEllipseFilled} 
                      onClick={() => {
                          const updatedProject = {...projects[props.category][props.key], order: 0};
                          const updatedCategory = {...projects[props.category], [props.key]: updatedProject};
                          const updatedProjects = {...projects, [props.category]: updatedCategory};
                          setProjects(updatedProjects);
                      }}
                    />}
                    {(showIconsFilled && props.expandable) && <Icon src={ExpandEllipseFilled}/>}
                  </Icons>
                </HeaderElement> 
                <HeaderElement><StyledHeaderContent> {props.header} </StyledHeaderContent></HeaderElement>
                <HeaderElement/>  
              </Header>
              <StyledBody>
                <StyledPreviewImageContainer ref={CarouselRef}>
                    {props.preview_images.map((i) => (
                      <span key={i}><StyledPreviewImage src={i} draggable={false}/></span>
                    ))}
                </StyledPreviewImageContainer>
                <StyledBodyContent>
                    <StyledBodyTitleContainer>
                      {props.preview_link && <StyledBodyTitleLink target="_blank" href={props.preview_link} ref={LinkRef}> {props.title} </StyledBodyTitleLink>}
                      {!props.preview_link && props.title}
                    </StyledBodyTitleContainer>
                    <StyledBodyTags> <StyledBodyYear>{props.year}</StyledBodyYear> <StyledBodyPosition>{props.position}</StyledBodyPosition></StyledBodyTags>                 
                    <StyledBodyDescription>{props.description}</StyledBodyDescription>
                </StyledBodyContent>
              </StyledBody>
          </StyledCard>
      </Draggable>
    );
}