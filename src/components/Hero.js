import React from "react";
import styled, { keyframes } from "styled-components";

const TopTitlePhaseOne = keyframes`
  100% {
      opacity: 1;
    transform: translateY(-80px);
  }
`;

const BottomTitlePhaseOne = keyframes`
  100% {
      opacity: 1;
    transform: translateY(80px);
  }
`;

const TopTitlePhaseTwo = keyframes`
100% {
    transform: rotate(-4deg) translate(-30px, -80px);
  }
`;

const MiddleTitlePhaseTwo = keyframes`
100% {
    transform: rotate(-4deg) translate(30px, 0px);
  }
`;

const BottomTitlePhaseTwo = keyframes`
100% {
    transform: rotate(-4deg) translate(90px, 80px);
  }
`;

const Hero = styled.div`
  height: 100vh;
  min-height: 710px;
`;

const HeroNav = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 50px;
  font-family: "Lato", sans-serif;
  font-size: 1.6rem;
  font-weight: 300;
  text-transform: uppercase;

  & > a {
    color: var(--color-white);
  }
`;

const HeroTitleGroup = styled.div`
  position: relative;
  margin-top: 270px;

  //   border: 1px solid green;
`;

const HeroTitle = styled.h1`
  font-family: var(--font-secondary), sans-serif;
  //   font-size: 14.5rem;
  font-size: calc(9.5vw);
  line-height: 0.5;
  color: var(--color-secondary);
  padding: 0 100px;
  mix-blend-mode: difference;
  animation: ${MiddleTitlePhaseTwo} 0.6s 0.8s forwards;

  @media (max-width: 1100px) {
    font-size: calc(9vw);
  }

  @media (max-width: 900px) {
    font-size: calc(8.5vw);
  }

  //   border: 1px solid red;
`;

const HeroTitleTop = styled(HeroTitle)`
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
  color: var(--color-primary-light);
  animation: ${TopTitlePhaseOne} 0.6s 0.2s forwards,
    ${TopTitlePhaseTwo} 0.6s 0.8s forwards;
`;

const HeroTitleBottom = styled(HeroTitle)`
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
  color: var(--color-tertiary);
  animation: ${BottomTitlePhaseOne} 0.6s 0.2s forwards,
    ${BottomTitlePhaseTwo} 0.6s 0.8s forwards;
`;

const HeroComp = () => {
  return (
    <Hero>
      <HeroNav>
        <a href="/">All Photo Journals</a>
        <a href="/">Portfolio</a>
      </HeroNav>
      <HeroTitleGroup>
        <HeroTitle>
          HELLO TAIWAN <span class=".chinese-char">臺灣</span>!
        </HeroTitle>
        <HeroTitleTop>
          HELLO TAIWAN <span class=".chinese-char">臺灣</span>!
        </HeroTitleTop>
        <HeroTitleBottom>
          HELLO TAIWAN <span class=".chinese-char">臺灣</span>!
        </HeroTitleBottom>
      </HeroTitleGroup>
    </Hero>
  );
};

export default HeroComp;
