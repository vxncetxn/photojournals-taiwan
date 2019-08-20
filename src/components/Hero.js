import React from "react";
import styled, { keyframes } from "styled-components";

const TopTitlePhaseOne = keyframes`
  100% {
    opacity: 1;
    transform: translateY(-5vw);
  }
`;

const BottomTitlePhaseOne = keyframes`
  100% {
    opacity: 1;
    transform: translateY(5vw);
  }
`;

const TopTitlePhaseTwo = keyframes`
  100% {
    transform: rotate(-4deg) translate(-1.875vw, -5vw);
  }
`;

const MiddleTitlePhaseTwo = keyframes`
  100% {
    transform: rotate(-4deg) translate(1.875vw, 0vw);
  }
`;

const BottomTitlePhaseTwo = keyframes`
  100% {
    transform: rotate(-4deg) translate(5.625vw, 5vw);
  }
`;

const Hero = styled.div`
  height: 100vh;
  min-height: 710px;
  padding: 30px 60px;
  @media (max-width: 520px) {
    padding: 30px 30px;
  }
  display: flex;
  flex-direction: column;
`;

const HeroNav = styled.ul`
  display: flex;
  justify-content: space-between;
  align-items: center;

  // border: 1px solid green;

  & span,
  a {
    font-family: var(--font-nav), sans-serif;
    font-size: 1.6rem;
    font-weight: 300;
    text-transform: uppercase;
    color: var(--color-white);

    // border: 1px solid blue;
  }

  & > li + li {
    margin-left: 50px;
  }
`;

const HeroTitleGroup = styled.div`
  position: relative;
  margin: auto 0;

  //   border: 1px solid green;
`;

const HeroTitle = styled.h1`
  font-family: var(--font-primary), sans-serif;
  font-size: 9.75vw;
  line-height: 0.5;
  color: var(--color-secondary);
  margin-left: 2.5vw;
  mix-blend-mode: difference;
  animation: ${MiddleTitlePhaseTwo} 0.6s 0.8s forwards;

  //   @media (max-width: 1100px) {
  //     font-size: 9vw;
  //   }

  @media (max-width: 800px) {
    font-size: 9.2vw;
  }

  @media (max-width: 520px) {
    display: none;
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
    <Hero className="hero-section">
      <HeroNav>
        <li>
          <a href="/">All Photo Journals</a>
        </li>
        <li>
          <a href="/">Portfolio</a>
        </li>
      </HeroNav>
      <HeroTitleGroup>
        <HeroTitle>
          HELLO TAIWAN <span className=".chinese-char">臺灣</span>!
        </HeroTitle>
        <HeroTitleTop>
          HELLO TAIWAN <span className=".chinese-char">臺灣</span>!
        </HeroTitleTop>
        <HeroTitleBottom>
          HELLO TAIWAN <span className=".chinese-char">臺灣</span>!
        </HeroTitleBottom>
      </HeroTitleGroup>
    </Hero>
  );
};

export default HeroComp;
