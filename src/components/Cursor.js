import React, { useEffect } from "react";
import styled from "styled-components";
import { window } from "browser-monads";

const cursorColorList = [
  "var(--color-primary)",
  "var(--color-secondary)",
  "var(--color-tertiary)",
  "silver"
];

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
`;

const CursorComp = ({ cursorColor }) => {
  useEffect(() => {
    window.addEventListener("mousemove", e => {
      document.querySelector(".cursor").style.left = `${e.clientX - 70}px`;
      document.querySelector(".cursor").style.top = `${e.clientY - 70}px`;
    });
  }, []);

  return <Cursor cursorColor={cursorColor} className="cursor" />;
};

export default CursorComp;
