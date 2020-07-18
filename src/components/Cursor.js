import React, { useEffect, memo } from "react";
import styled, { keyframes } from "styled-components";
import { window } from "browser-monads";

const cursorColorList = [
  "var(--color-secondary)",
  "var(--color-tertiary)",
  "gold",
  "silver"
];

const CursorRotate = keyframes`
  0% {
    transform: rotate(-135deg);
  }
  100% {
    transform: rotate(225deg);
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
  clip-path: ${props =>
    props.cursorLoc === "neutral" ? "circle(30%)" : "circle(50%)"};
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
  width: 200px;
  text-align: center;
  font-family: var(--font-secondary), sans-serif;
  font-size: 16px;
  font-weight: 700;
  text-transform: uppercase;
  color: #e6e6e6;
  transform-origin: 50% 485%;
  z-index: 999;

  //   &::after {
  //     position: absolute;
  //     top: 500%;
  //     left: 50%;
  //     width: 10px;
  //     height: 10px;
  //     content: "";
  //     background-color: #f0f;
  //     border-radius: 50%;
  //     transform: translate(-50%, -50%);
  //     pointer-events: none;
  //   }

  //   border: 1px solid red;

  animation: ${CursorRotate} 10s linear infinite forwards;
`;

const CursorIcon = styled.span`
  position: fixed;
  top: 0;
  left: 0;

  box-sizing: border-box;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;

  font-family: var(--font-secondary), sans-serif;
  font-size: 32px;
  font-weight: 700;
  text-transform: uppercase;
  color: var(--color-white);
  pointer-events: none;
  isolation: isolate;
  z-index: 999;
  //   border: 1px solid gold;

  animation: ${CursorRotate} 10s linear infinite forwards;
`;

const CursorComp = memo(({ cursorLoc, popped, cursorColor }) => {
  useEffect(() => {
    window.addEventListener("mousemove", e => {
      document.querySelector(".cursor").style.left = `${e.clientX - 70}px`;
      document.querySelector(".cursor").style.top = `${e.clientY - 70}px`;

      document.querySelector(".cursor-label").style.left = `${e.clientX -
        101}px`;
      document.querySelector(".cursor-label").style.top = `${e.clientY - 90}px`;
      document.querySelector(".cursor-icon").style.left = `${e.clientX - 25}px`;
      document.querySelector(".cursor-icon").style.top = `${e.clientY -
        23.5}px`;
    });

    document.querySelectorAll(".gatsby-image-wrapper").forEach(node => {
      node.addEventListener("mouseenter", () => {
        // document.querySelector(".cursor").style.clipPath = "circle(50%)";
        // document.querySelector(".cursor-label").innerHTML = "View Image";
        // document.querySelector(".cursor-icon").innerHTML = `<svg
        //     enableBackground="new 0 0 488.85 488.85"
        //     viewBox="0 0 488.85 488.85"
        //     xmlns="http://www.w3.org/2000/svg"
        //     width="20px"
        //     fill="#fcfcfc"
        //   >
        //     <path d="m244.425 98.725c-93.4 0-178.1 51.1-240.6 134.1-5.1 6.8-5.1 16.3 0 23.1 62.5 83.1 147.2 134.2 240.6 134.2s178.1-51.1 240.6-134.1c5.1-6.8 5.1-16.3 0-23.1-62.5-83.1-147.2-134.2-240.6-134.2zm6.7 248.3c-62 3.9-113.2-47.2-109.3-109.3 3.2-51.2 44.7-92.7 95.9-95.9 62-3.9 113.2 47.2 109.3 109.3-3.3 51.1-44.8 92.6-95.9 95.9zm-3.1-47.4c-33.4 2.1-61-25.4-58.8-58.8 1.7-27.6 24.1-49.9 51.7-51.7 33.4-2.1 61 25.4 58.8 58.8-1.8 27.7-24.2 50-51.7 51.7z" />
        //   </svg>`;
      });
      node.addEventListener("mouseleave", () => {
        // document.querySelector(".cursor").style.clipPath = "circle(30%)";
        // document.querySelector(".cursor-label").innerHTML = null;
        // document.querySelector(".cursor-icon").innerHTML = null;
      });
    });
  }, []);

  return (
    <>
      <Cursor
        cursorLoc={cursorLoc}
        cursorColor={cursorColor}
        className="cursor"
      />
      <CursorLabel className="cursor-label">
        {cursorLoc === "image"
          ? "View Image"
          : cursorLoc === "anchor"
          ? "Visit Link"
          : cursorLoc === "choice"
          ? "Change Cursor"
          : cursorLoc === "unpopped-label"
          ? "Expand"
          : cursorLoc === "popped-label"
          ? "Close"
          : null}
      </CursorLabel>
      <CursorIcon className="cursor-icon">
        {cursorLoc === "image" ? (
          <svg
            enableBackground="new 0 0 488.85 488.85"
            viewBox="0 0 488.85 488.85"
            xmlns="http://www.w3.org/2000/svg"
            width="20px"
            fill="#fcfcfc"
          >
            <path d="m244.425 98.725c-93.4 0-178.1 51.1-240.6 134.1-5.1 6.8-5.1 16.3 0 23.1 62.5 83.1 147.2 134.2 240.6 134.2s178.1-51.1 240.6-134.1c5.1-6.8 5.1-16.3 0-23.1-62.5-83.1-147.2-134.2-240.6-134.2zm6.7 248.3c-62 3.9-113.2-47.2-109.3-109.3 3.2-51.2 44.7-92.7 95.9-95.9 62-3.9 113.2 47.2 109.3 109.3-3.3 51.1-44.8 92.6-95.9 95.9zm-3.1-47.4c-33.4 2.1-61-25.4-58.8-58.8 1.7-27.6 24.1-49.9 51.7-51.7 33.4-2.1 61 25.4 58.8 58.8-1.8 27.7-24.2 50-51.7 51.7z" />
          </svg>
        ) : cursorLoc === "anchor" ? (
          <span style={{ marginBottom: "7px" }}>&rarr;</span>
        ) : cursorLoc === "choice" ? (
          <svg
            enableBackground="new 0 0 383.344 383.345"
            height="383.345"
            viewBox="0 0 383.344 383.345"
            width="20px"
            height="20px"
            fill="#fcfcfc"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="m273.217 106.899c-27.181-44.864-57.413-83.693-73.016-102.846-2.088-2.565-5.221-4.054-8.528-4.053-3.308 0-6.44 1.489-8.529 4.054-15.602 19.159-45.834 58.001-73.015 102.869-35.028 57.823-52.789 105.63-52.789 142.09 0 74.071 60.261 134.332 134.332 134.332s134.332-60.261 134.332-134.332c.001-36.484-17.758-84.298-52.787-142.114zm-63.111 226.969c-7.844 2.006-15.986 3.022-24.205 3.022-50.186 0-91.015-37.929-91.015-84.55 0-11.255 2.97-24.405 8.825-39.083.989-2.48 3.807-3.895 6.585-3.295 2.776.598 4.64 3.018 4.354 5.65-.342 3.148-.516 6.223-.516 9.136 0 50.735 40.881 93.221 95.093 98.821 2.698.279 4.803 2.297 5.018 4.812.216 2.515-1.522 4.817-4.139 5.487z" />
          </svg>
        ) : cursorLoc === "unpopped-label" ? (
          <span style={{ marginBottom: "4px" }}>+</span>
        ) : cursorLoc === "popped-label" ? (
          <span style={{ marginBottom: "5px" }}>-</span>
        ) : null}
      </CursorIcon>
    </>
  );
});

export default CursorComp;
