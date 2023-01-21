import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { works } from "../../../Constants/Works";
import { BjornTextTop, fadeDelay } from "../../../style";
import { BackgroundText } from "./BackgroundText";
import { WorkImage } from "./WorkImage";
import arrowButton from "../../../assets/arrowButton.svg";
import useMousePos from "../../../utils/useMousePos";
import { useTranslation } from "react-i18next";
import { LanguageChange } from "../../../Components/LanguageChange";

const HomeWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr;
  height: ${window.innerHeight}px;
  max-height: 100vh;
  grid-gap: 2rem;
  background-color: ${(props) => props.backgroundcolor};
  transition: all 0.3s ease-in;
`;

const Footer = styled.a`
  font-size: 1vw;
  font-size: 2rem;
  grid-column: 1;
  grid-row: 1;
  align-self: flex-end;
  margin: 0 0 2rem 2rem;
  ${fadeDelay}
  font-family: Base Grotesk, sans-serif;
  text-decoration: none;
  z-index: 100;
`;

const WorkWrapper = styled.div`
  scroll-behavior: smooth;
  max-height: 100vh;
  overflow-y: scroll;
  overflow-x: hidden;
  scroll-snap-type: y mandatory;
  width: 100%;
  ${fadeDelay}
  ::-webkit-scrollbar {
    display: none;
  }
`;

const WorkCount = styled.p`
  grid-column: 2;
  font-size: 1vw;
  font-size: 2rem;
  grid-row: 1;
  align-self: flex-end;
  justify-self: flex-start;
  ${fadeDelay}
  margin-bottom: 2rem;
  font-family: Arial, Helvetica, sans-serif;
`;

const ShowReelWrapper = styled.div`
  grid-column: 1 / 5;
  grid-row: 1;
  align-self: center;
  display: flex;
  flex-flow: column;
  position: absolute;
  bottom: 0;
  top: 0;
  height: 100%;
`;

const NavWrapper = styled.div`
  grid-column: 1;
  grid-row: 1;
  margin: 2rem;
  z-index: 5;
  ${fadeDelay}
  overflow: visible;
  max-width: 25vw;
`;

const LinkWrapper = styled.div`
  margin: 0.5rem 0 0 0;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
  font-size: 0.8vw;
  font-size: 1.6rem;
  margin: 0;
  :hover {
    text-decoration: underline;
  }
`;

const ArrowButtonUp = styled.button`
  align-self: flex-end;
  opacity: ${(props) => (props.show ? "1" : "0")};
  pointer-events: ${(props) => (props.show ? "auto" : "none")};
  transition: opacity 0.3s ease-in;
`;

const ArrowButtonDown = styled.button`
  align-self: flex-start;
  transform: rotate(180deg);
  opacity: ${(props) => (props.show ? "1" : "0")};
  pointer-events: ${(props) => (props.show ? "auto" : "none")};
  transition: opacity 0.3s ease-in;
`;

export const Home = () => {
  const scrollRef = useRef();

  const [activeWork, setActiveWork] = useState(1);
  const [bgColor, setBgColor] = useState("white");
  const inputRefs = useRef([]);
  const [workRefs, setWorkRefs] = useState([]);

  const scrollDirectionDiv = (e) => {
    if (
      e.target.scrollTop >
      e.target.scrollHeight - (e.target.scrollHeight / 100) * 15
    ) {
      window.location.reload(true);
    }
    const devideBy = scrollRef.current.scrollHeight / works.length;
    const scrollDevided = e.target.scrollTop / devideBy + 1;
    setActiveWork(Math.round(scrollDevided));
  };
  const colors = ["#e3e3e3", "#e3e3e3", "#e3e3e3", "#e3e3e3"];

  useEffect(() => {
    const dividedNr = Math.floor(activeWork / 4);
    if (dividedNr < colors.length) {
      setBgColor(colors[dividedNr]);
    } else {
      setBgColor(colors[0]);
    }
  }, [activeWork]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    setTimeout(() => setActiveWork(1), 500);
  }
  useEffect(() => {
    let scroll;
    if (activeWork && workRefs.length) {
      scroll = setInterval(() => {
        const nextWork = activeWork === works.length ? 0 : activeWork + 1;
        if(workRefs[nextWork-1] && workRefs[nextWork-1].current) {
          workRefs[nextWork-1].current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        if (activeWork === works.length) {
          scrollToTop();
          setTimeout(() => {
            if(workRefs[0] && workRefs[0].current) {
              workRefs[0].current.scrollIntoView({ behavior: 'smooth', block: 'start' });
              setActiveWork(1);
            }
          }, 1000);
        } else {
          setActiveWork(nextWork);
        }
      }, 1000);
    }
    return () => clearInterval(scroll);
  }, [activeWork, workRefs, works.length]);


  const { t, i18n } = useTranslation();

  return (
    <HomeWrapper backgroundcolor={bgColor}>
      <NavWrapper>
        <BjornTextTop to="/">Bjornverlinde</BjornTextTop>
        <LinkWrapper>
          <StyledLink to={"/work"}>{t("Work")}, </StyledLink>
          <StyledLink to={"/studio"}>{t("Studio")}</StyledLink>
        </LinkWrapper>
      </NavWrapper>
      <ShowReelWrapper>
        <WorkWrapper ref={scrollRef} onScroll={(e) => scrollDirectionDiv(e)}>
          {works.map((work, index) => {
            const newRef = useRef();
            return (
              <WorkImage
                key={index}
                index={index}
                work={work}
                innerRef={newRef}
                inputRefs={inputRefs}
                workRefs={workRefs}
                setWorkRefs={setWorkRefs}
                worksLength={works.length}
              />
            );
          })}
        </WorkWrapper>
      </ShowReelWrapper>
      <BackgroundText />
      <WorkCount>
        {activeWork}/{works.length}
      </WorkCount>
      <Footer href="" target="">
        ©2022, SBV
      </Footer>
      <LanguageChange />
    </HomeWrapper>
  );
};
