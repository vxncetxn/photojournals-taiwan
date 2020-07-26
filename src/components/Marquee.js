import React from "react";
import styled, { keyframes } from "styled-components";

const MarqueeMove = keyframes`
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(-100%);
  }
`;

const MarqueeWrapper = styled.div`
  position: relative;
  z-index: 1;
  transform-origin: 100% 50%;
  transform: rotate(-3.5deg) translateY(30px);
  pointer-events: none;
  mix-blend-mode: exclusion;

  @media (max-width: 800px) {
    transform: rotate(-4.75deg);
  }

  @media (max-width: 700px) {
    transform: rotate(-6deg);
  }

  @media (max-width: 470px) {
    transform: rotate(-7deg);
  }

  @media (max-width: 410px) {
    transform: rotate(-8deg);
  }
`;

const Marquee = styled.h2`
  font-size: 12.5vw;
  font-family: var(--font-primary), var(--font-chinese), sans-serif;
  font-weight: 700;
  text-transform: uppercase;
  color: var(--color-secondary);
  text-shadow: calc(100vw - 200px) 0 0 var(--color-secondary);
  animation: ${MarqueeMove} 5s linear infinite;

  @media (max-width: 1100px) {
    text-shadow: calc(100vw - 140px) 0 0 var(--color-secondary);
  }

  @media (max-width: 800px) {
    text-shadow: calc(100vw - 100px) 0 0 var(--color-secondary);
  }

  @media (max-width: 520px) {
    text-shadow: calc(100vw - 60px) 0 0 var(--color-secondary);
  }
`;

const MarqueeComp = ({ children, ...others }) => {
  return (
    <MarqueeWrapper>
      <Marquee>{children}</Marquee>
    </MarqueeWrapper>
  );
};

export default MarqueeComp;
