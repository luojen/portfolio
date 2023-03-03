import React, { useEffect, useRef, useState, forwardRef } from 'react';
import Draggable from 'react-draggable';
import styled from 'styled-components';
import CloseEllipse from "../assets/icons/ellipse-close.svg";
import ExpandEllipse from "../assets/icons/ellipse-expand.svg";
import cx from "classnames";
import NonPassiveTouchTarget from "./NonPassiveTouchTarget";
import TouchCarousel, { clamp } from "react-touch-carousel";
import touchWithMouseHOC from "react-touch-carousel/lib/touchWithMouseHOC";
import "./Carousel.css";

const StyledCard = styled.div`
  border-style: solid;
  border-width: 2px;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, .5);
  width: 400px;
  height: 350px;
`;

const StyledHeader = styled.div`
  border-style: solid;
  border-top: 0ch;
  border-left: 0ch;
  border-right: 0ch;
  border-color: black;
  border-width: 3px;
  max-height: 15px;
  display: flex;
  background-color: rgba(0, 0, 0, .85);
  font-family: "p22-mackinac-pro", serif;
  font-weight: 700;
  font-style: normal;
  color: white;
  padding: 3px;
`;

const StyledHeaderContent = styled.div`
  color: #D1D1D1;
  font-size: small;
  margin-left: 10px;
  flex: 2;
  align-self: center;
`;

const StyledIcon = styled.img`
  margin-left: 6px;
  margin-right: 6px;
  max-height: 10px;
`;

const StyledIconContainer = styled.div`
  flex: 1;
  display: flex;
  padding-left: 2px;
  padding-top: 2px;
`;

const StyledBody = styled.div`
  font-family: 'InterBold';
  height: 75%;
  padding: 25px;
  margin-left: 5px;
  display: flex;
`;

const StyledPreviewImageContainer = styled.div`
  flex: 3;
`;

const StyledPreviewImage = styled.img`
  width: 200px;
  height: 200px;
  object-fit: cover;
`;

const StyledBodyContent = styled.div`
  flex: 2;
  padding-left: 20px;
  padding-top: 5px;
`;

const StyledBodyTitle = styled.div`
  color: rgba(0, 0, 0, .8);
  width: fit-content;
  max-width: 160px;
  white-space: pre-line;
  overflow-wrap: break-word;
  font-size: large;
  font-family: 'p22-mackinac-pro';
  font-style: italic;
  font-weight: 800;
`;

const StyledBodyDescription = styled.div`
  font-size: small;
  font-family: "neue-haas-grotesk-text", sans-serif;
  font-weight: 400;
  font-style: normal;
  padding-top: 10px;
`;

const cardSize = 200;
const cardPadCount = 2;
const carouselWidth = clamp(window.innerWidth, 0, 200);


export default function Card({ 
  props, 
  projects,
  setProjects,
  highestValue,
  setHighestValue,
}) {  

  const [z, setZ] = useState(0);
  const [top, setTop] = useState(Math.floor(Math.random()*(window.innerHeight-350)));
  const [left, setLeft] = useState(Math.floor(Math.random()*((window.innerWidth-400)-350) + 350));
  const [images, setImages] = useState([]);
  const [dragDisabled, setDragDisabled] = useState(false);
  const Chip = useRef();
  const CarouselRef = useRef();

  useEffect(() => {
    function handleMouseDown(event) {
      if (Chip.current && Chip.current.contains(event.target)) {
        setZ(highestValue + 1);
        setHighestValue(highestValue + 1);
      }
    }
    function handleMouseOver(event) {
      if (CarouselRef.current && CarouselRef.current.contains(event.target)) {
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
    setImages(props.preview_images);
  }, [props.order, props.preview_images])

  function renderCard(index, modIndex) {
    const item = images[modIndex];
    if (item) {
      return (
        <div
          key={index}
          className="carousel-card"
          onClick={() => console.log(`clicked card ${1 + modIndex}`)}
        >
          <div
            className="carousel-card-inner"
          >
            <StyledPreviewImage draggable={false} src={item}></StyledPreviewImage>
          </div>
          
        </div>
      );
    }
  }

  function CarouselContainer(props) {
    const {
      cursor,
      carouselState: { active, dragging },
      ...rest
    } = props;
    let current = -Math.round(cursor) % (images ? images.length : 0);
    while (current < 0) {
      current += images.length;
    }
    // Put current card at center
    const translateX =
      (cursor - cardPadCount) * cardSize + (carouselWidth - cardSize) / 2;
    return (
      <NonPassiveTouchTarget
        className={        
          cx("carousel-container", {
          "is-active": active,
          "is-dragging": dragging
        })}
      >
        <NonPassiveTouchTarget
          className="carousel-track"
          style={{ transform: `translate3d(${translateX}px, 0, 0)` }}
          {...rest}
        />
        <div className="carousel-pagination-wrapper">
          <ol className="carousel-pagination">
            {images && images.map((_, index) => (
              <li key={index} className={current === index ? "current" : ""} />
            ))}
          </ol>
        </div>
      </NonPassiveTouchTarget>
    );
  }
  
  const Container = touchWithMouseHOC(CarouselContainer);

  if (props.order > 0)
    return (
      <Draggable disabled={dragDisabled}>
          <StyledCard 
            style={{
              position: 'absolute',
              zIndex: z,
              top: top,
              left: left,
              background: props.color,
            }}
            ref={Chip}
          >
              <StyledHeader>
                <StyledIconContainer>
                  <StyledIcon src={CloseEllipse} alt="Close Window" onClick={() => {
                      const updatedProject = {...projects[props.category][props.key], order: 0};
                      const updatedCategory = {...projects[props.category], [props.key]: updatedProject};
                      const updatedProjects = {...projects, [props.category]: updatedCategory};
                      setProjects(updatedProjects);
                  }}/>
                  <StyledIcon src={ExpandEllipse} alt="Expand Window"/>
                </StyledIconContainer>  
                <StyledHeaderContent> {props.category} </StyledHeaderContent>  
              </StyledHeader>
              <StyledBody>
                <StyledPreviewImageContainer ref={CarouselRef}>
                    <TouchCarousel
                      component={Container}
                      cardSize={cardSize}
                      cardCount={images.length}
                      cardPadCount={cardPadCount}
                      loop={true}
                      renderCard={renderCard}
                    />
                </StyledPreviewImageContainer>
                <StyledBodyContent>
                  <div className="font-face-ebgr">
                    <StyledBodyTitle> {props.title} </StyledBodyTitle>                  
                    <StyledBodyDescription>{props.description}</StyledBodyDescription>
                  </div>
                </StyledBodyContent>
              </StyledBody>
          </StyledCard>
      </Draggable>
    );
}