import React from "react";
import styled from "styled-components";

const SectionPagi = styled.div`
  font-family: "Roboto Mono", sans-serif;
  font-weight: 700;
  color: #182e4e;
  position: fixed;
  bottom: 0;
  right: 90px;
  mix-blend-mode: difference;
`;

const Digits = styled.span`
  font-size: ${props => props.fontSize};
  line-height: 0;
  transition: all 0.3s linear;
`;

const SectionPagiComp = () => {
  return (
    <SectionPagi>
      <Digits fontSize="20rem">0</Digits>
      <Digits fontSize="21rem">0</Digits>
      <Digits fontSize="2.4rem">/5</Digits>
    </SectionPagi>
  );
};

export default SectionPagiComp;
