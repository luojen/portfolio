import React, { useEffect, useRef, useState, forwardRef } from 'react';
import Draggable from 'react-draggable';
import styled from 'styled-components';
import CloseEllipse from "../assets/icons/ellipse-close.svg";
import CloseEllipseFilled from "../assets/icons/ellipse-close-filled.svg";
import Background from "../assets/pages/about_background.png";
import Profile from "../assets/pages/profile_picture.png";

const StyledCard = styled.div`
  border-style: solid;
  border-width: 1px;
  border-radius: 10px;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, .5);
  width: 500px;
  height: 500px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  overflow: hidden;
`;

const StyledHeader = styled.div`
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;;
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
  padding-top: 5px;
  padding-bottom: 5px;
`;

const StyledHeaderContent = styled.span`
  color: #D1D1D1;
  font-size: x-small;
  flex: 1;
  text-align: center;
`;

const StyledIcon = styled.img`
  margin-left: 6px;
  margin-right: 6px;
  max-height: 10px;
`;

const StyledIconContainer = styled.span`
  flex: 1;
  display: flex;
  padding-left: 2px;
  padding-top: 2px;
`;

const StyledBody = styled.div`
  font-family: 'InterBold';
  max-height: 600px;
  padding-left: 50px;
  padding-right: 50px;
  padding-top: 30px;
  padding-bottom: 30px;
  display: flex;
  flex-direction: row;
`;

const ProfilePictureContainer = styled.div`
  flex: 1;
  height: 100%;
`;

const ProfilePicture = styled.img`
  object-fit: cover;
  max-width: 100%;
  max-height: 400px;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

const Description = styled.div`
  flex: 1;
  font-size: small;
  font-family: "neue-haas-grotesk-text", sans-serif;
  font-weight: 600;
  font-style: normal;
  padding-top: 20px;
  padding-bottom: 10px;
  white-space: pre-line;
`;

const DescriptionSection = styled.div`
  margin-bottom: 10px;
  &:hover {
      cursor: default;
  }
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

const Contact = styled.div`
  margin-top: 50px;
  font-weight: 600;
`;


const ContactEmail = styled.div`
  &::selection {
      background-color: black;
      color: white;
  }
`;

const ContactLinks = styled.div`
  margin-bottom: 10px;
  &:hover {
      cursor: default;
  }
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

const Link = styled.a`
    text-decoration: none;
    color: #444444;
    &:hover {
        color: white;
        cursor: pointer;
        text-decoration: none;
    }
`;

export default function About({ 
  highestValue,
  setHighestValue,
  setAboutPageIsOpen
}) {

  const Chip = useRef();
  const IconRef = useRef();
  const EmailRef = useRef();
  const LinkRef = useRef();
  const [z, setZ] = useState(highestValue + 1);
  const [showIconsFilled, setShowIconsFilled] = useState(false);
  const [dragDisabled, setDragDisabled] = useState(false);

  useEffect(() => {
    function handleMouseOver(event) {
      if (IconRef.current && IconRef.current.contains(event.target)) {
        setShowIconsFilled(true);
      } else {
        setShowIconsFilled(false);
      }
      if ((EmailRef.current && EmailRef.current.contains(event.target)) || (LinkRef.current && LinkRef.current.contains(event.target))) {
        setDragDisabled(true);
      } else {
        setDragDisabled(false);
      }
    }
    document.addEventListener("mouseover", handleMouseOver);
    function handleMouseDown(event) {
      if (Chip.current && Chip.current.contains(event.target)) {
        setZ(highestValue + 1);
        setHighestValue(highestValue + 1);
      }
    }
    document.addEventListener("mousedown", handleMouseDown);
    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
    }
  }, [Chip, highestValue]); 

    return (
      <Draggable disabled={dragDisabled}>
          <StyledCard 
            style={{
              position: 'absolute',
              backgroundImage: `url(${Background})`,
              zIndex: z,
            }}
            ref={Chip}
          >
              <StyledHeader>
                <StyledIconContainer ref={IconRef}>
                  {!showIconsFilled && <StyledIcon src={CloseEllipse} alt="Close Window" onClick={() => {
                    setAboutPageIsOpen(false);
                  }}/>}
                  {showIconsFilled && <StyledIcon src={CloseEllipseFilled} alt="Close Window" onClick={() => {
                    setAboutPageIsOpen(false);
                  }}/>}
                </StyledIconContainer>  
                <StyledHeaderContent> About </StyledHeaderContent>  
                <StyledIconContainer/>  
              </StyledHeader>
              <StyledBody>
                <ProfilePictureContainer>
                  <ProfilePicture src={Profile} alt="Profile Picture" draggable={false}/>   
                </ProfilePictureContainer>
                <Description>
                  <DescriptionSection>
                    Jen Luo is a multidisciplinary designer based in Los Angeles whose practice is rooted in accessibility, sustainability, and community care. 
                  </DescriptionSection>
                  <DescriptionSection>
                    She recently graduated from Stanford University where she received her B.S. in computer science and is currently a candidate for an M.S. in human-computer interaction design.  
                  </DescriptionSection>
                  <DescriptionSection>
                    Her interests span social computing, data visualization, libraries, art history, and poetry.
                  </DescriptionSection>
                  <Contact>
                    <ContactEmail ref={EmailRef}>
                      luojenniferr at gmail dot com
                    </ContactEmail>
                    <ContactLinks ref={LinkRef}>
                      <Link target="_blank" href="https://www.linkedin.com/in/luojen/"> Linkedin </Link> /
                      <Link target="_blank" href="https://docs.google.com/document/d/17bhGCeicRy4X_2zz8psLn6cdxp6C4yRBcmzf-BKorvc/edit?usp=sharing"> Resume </Link> /
                      <Link target="_blank" href="https://www.goodreads.com/user/show/66194132-jen/"> Goodreads </Link>
                    </ContactLinks> 
                  </Contact>
                  <DescriptionSection style={{
                    fontWeight: 400,
                  }}>
                    Built in React
                  </DescriptionSection>
                </Description>
              </StyledBody>
          </StyledCard>
      </Draggable>
    );
}