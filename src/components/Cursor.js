import React, { useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { window } from "browser-monads";

const cursorColorList = [
  "var(--color-primary)",
  "var(--color-secondary)",
  "var(--color-tertiary)",
  "silver"
];

const CursorRotate = keyframes`
//   0% {
//     transform: rotate(-45deg);
//   }
  100% {
    transform: rotate(360deg);
  }
`;

const Cursor = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  mix-blend-mode: difference;
  z-index: 999;

  width: 140px;
  height: 140px;
  clip-path: circle(30%);
  mix-blend-mode: difference;
  background-color: ${props => cursorColorList[props.cursorColor]};

  transition: clip-path 0.3s ease;
  pointer-events: none;

  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 660px) {
    display: none;
  }
`;

const CursorLabel = styled.span`
  position: fixed;
  top: 0;
  left: 0;
  display: none;
  font-family: var(--font-secondary), sans-serif;
  font-size: 16px;
  font-weight: 700;
  text-transform: uppercase;
  color: #e6e6e6;
  transform-origin: 60% 420%;

  animation: ${CursorRotate} 10s linear infinite;
`;

const CursorIcon = styled.span`
  position: fixed;
  top: 0;
  left: 0;
  display: none;
  font-family: var(--font-secondary), sans-serif;
  font-size: 32px;
  font-weight: 700;
  text-transform: uppercase;
  color: whitesmoke;
  pointer-events: none;
  isolation: isolate;
  z-index: 999;

  animation: ${CursorRotate} 10s linear infinite;
`;

const CursorComp = ({ cursorColor }) => {
  useEffect(() => {
    window.addEventListener("mousemove", e => {
      document.querySelector(".cursor").style.left = `${e.clientX - 70}px`;
      document.querySelector(".cursor").style.top = `${e.clientY - 70}px`;

      document.querySelector(".cursor-label").style.left = `${e.clientX -
        35}px`;
      document.querySelector(".cursor-label").style.top = `${e.clientY - 90}px`;

      document.querySelector(".cursor-icon").style.left = `${e.clientX - 10}px`;
      document.querySelector(".cursor-icon").style.top = `${e.clientY - 21}px`;
    });

    document.querySelectorAll(".gatsby-image-wrapper").forEach(node => {
      node.addEventListener("mouseenter", () => {
        document.querySelector(".cursor").style.clipPath = "circle(50%)";
        document.querySelector(".cursor-label").style.display = "block";
        document.querySelector(".cursor-icon").style.display = "block";
      });
      node.addEventListener("mouseleave", () => {
        document.querySelector(".cursor").style.clipPath = "circle(30%)";
        document.querySelector(".cursor-label").style.display = "none";
        document.querySelector(".cursor-icon").style.display = "none";
      });
    });
  }, []);

  return (
    <>
      <Cursor cursorColor={cursorColor} className="cursor" />
      <CursorLabel className="cursor-label">Expand</CursorLabel>
      <CursorIcon className="cursor-icon">+</CursorIcon>
    </>
  );
};

export default CursorComp;
