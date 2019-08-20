import React, { useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { window } from "browser-monads";

const cursorColorList = [
  "var(--color-secondary)",
  "var(--color-tertiary)",
  "gold",
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

  @media (max-width: 520px) {
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
  transform-origin: 60% 490%;

  //   &::after {
  //     position: absolute;
  //     top: 495%;
  //     left: 39%;
  //     width: 10px;
  //     height: 10px;
  //     content: "";
  //     background-color: #f0f;
  //     border-radius: 50%;
  //     transform: translate(-50%, -50%);
  //     pointer-events: none;
  //   }

  //   border: 1px solid red;

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

const CursorComp = ({ popped, cursorColor }) => {
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
        document.querySelector(".cursor-label").innerHTML = "View Image";
        document.querySelector(".cursor-label").style.display = "block";
        document.querySelector(".cursor-label").style.transformOrigin =
          "39% 495%";
        document.querySelector(".cursor-icon").innerHTML = `<svg
            enableBackground="new 0 0 488.85 488.85"
            viewBox="0 0 488.85 488.85"
            xmlns="http://www.w3.org/2000/svg"
            width="20px"
            fill="#fcfcfc"
          >
            <path d="m244.425 98.725c-93.4 0-178.1 51.1-240.6 134.1-5.1 6.8-5.1 16.3 0 23.1 62.5 83.1 147.2 134.2 240.6 134.2s178.1-51.1 240.6-134.1c5.1-6.8 5.1-16.3 0-23.1-62.5-83.1-147.2-134.2-240.6-134.2zm6.7 248.3c-62 3.9-113.2-47.2-109.3-109.3 3.2-51.2 44.7-92.7 95.9-95.9 62-3.9 113.2 47.2 109.3 109.3-3.3 51.1-44.8 92.6-95.9 95.9zm-3.1-47.4c-33.4 2.1-61-25.4-58.8-58.8 1.7-27.6 24.1-49.9 51.7-51.7 33.4-2.1 61 25.4 58.8 58.8-1.8 27.7-24.2 50-51.7 51.7z" />
          </svg>`;
        document.querySelector(".cursor-icon").style.display = "block";
      });
      node.addEventListener("mouseleave", () => {
        document.querySelector(".cursor").style.clipPath = "circle(30%)";
        document.querySelector(".cursor-label").innerHTML = null;
        document.querySelector(".cursor-label").style.display = "none";
        document.querySelector(".cursor-icon").innerHTML = null;
        document.querySelector(".cursor-icon").style.display = "none";
      });
    });
  }, []);

  useEffect(() => {
    if (popped) {
      document
        .querySelector(".popout-label")
        .addEventListener("mouseenter", () => {
          document.querySelector(".cursor").style.clipPath = "circle(50%)";
          document.querySelector(".cursor-label").innerHTML = "Close";
          document.querySelector(".cursor-label").style.display = "block";
          document.querySelector(".cursor-label").style.transformOrigin =
            "70% 490%";
          document.querySelector(".cursor-icon").innerHTML = "-";
          document.querySelector(".cursor-icon").style.display = "block";
        });
      document
        .querySelector(".popout-label")
        .addEventListener("mouseleave", () => {
          document.querySelector(".cursor").style.clipPath = "circle(30%)";
          document.querySelector(".cursor-label").innerHTML = null;
          document.querySelector(".cursor-label").style.display = "none";
          document.querySelector(".cursor-icon").innerHTML = null;
          document.querySelector(".cursor-icon").style.display = "none";
        });
    } else {
      document
        .querySelector(".popout-label")
        .addEventListener("mouseenter", () => {
          document.querySelector(".cursor").style.clipPath = "circle(50%)";
          document.querySelector(".cursor-label").innerHTML = "Expand";
          document.querySelector(".cursor-label").style.display = "block";
          document.querySelector(".cursor-label").style.transformOrigin =
            "60% 490%";
          document.querySelector(".cursor-icon").innerHTML = "+";
          document.querySelector(".cursor-icon").style.display = "block";
        });
      document
        .querySelector(".popout-label")
        .addEventListener("mouseleave", () => {
          document.querySelector(".cursor").style.clipPath = "circle(30%)";
          document.querySelector(".cursor-label").innerHTML = null;
          document.querySelector(".cursor-label").style.display = "none";
          document.querySelector(".cursor-icon").innerHTML = null;
          document.querySelector(".cursor-icon").style.display = "none";
        });
    }
  }, [popped]);

  return (
    <>
      <Cursor cursorColor={cursorColor} className="cursor" />
      <CursorLabel className="cursor-label"></CursorLabel>
      <CursorIcon className="cursor-icon"></CursorIcon>
    </>
  );
};

export default CursorComp;
