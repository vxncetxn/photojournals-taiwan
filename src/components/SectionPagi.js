import React, { useEffect } from "react";
import styled from "styled-components";

const SectionPagi = styled.div`
  font-family: var(--font-secondary), sans-serif;
  font-weight: 700;
  color: #182e4e;
  position: fixed;
  bottom: 0;
  right: 90px;
  mix-blend-mode: difference;

  @media (max-width: 520px) {
    right: 30px;
  }
`;

const Digits = styled.span`
  display: inline-block;
  font-size: ${props => props.fontSize};
  line-height: 0;
  transition: opacity 0.3s linear, transform 0.3s linear;
`;

const SectionPagiComp = ({ currentSection }) => {
  useEffect(() => {
    console.log("CURRENT SECTION: ", currentSection);
    if (currentSection === "hero") {
      document.querySelector(".animated-digit").style.opacity = 0;
      document.querySelector(".animated-digit").style.transform =
        "translateY(-100px)";
      setTimeout(() => {
        document.querySelector(".animated-digit").innerHTML = "0";
        document.querySelector(".animated-digit").style.opacity = 1;
        document.querySelector(".animated-digit").style.transform =
          "translateY(0)";
      }, 300);
    } else if (currentSection === "wroclaw") {
      document.querySelector(".animated-digit").style.opacity = 0;
      document.querySelector(".animated-digit").style.transform =
        "translateY(-100px)";
      setTimeout(() => {
        document.querySelector(".animated-digit").innerHTML = "1";
        document.querySelector(".animated-digit").style.opacity = 1;
        document.querySelector(".animated-digit").style.transform =
          "translateY(0)";
      }, 300);
    }
  }, [currentSection]);

  return (
    <SectionPagi>
      <Digits fontSize="calc(6rem + 10vw)">0</Digits>
      <Digits fontSize="calc(7rem + 10vw)" className="animated-digit">
        0
      </Digits>
      <Digits fontSize="2.4rem">/5</Digits>
    </SectionPagi>
  );
};

export default SectionPagiComp;
