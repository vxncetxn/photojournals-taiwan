import React, { useContext, memo } from "react";
import styled from "styled-components";

import { CursorContext } from "../CursorContext";

const CursorPalette = styled.div`
  width: 60px;
  height: 180px;
  position: fixed;
  bottom: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;

  @media (max-width: 520px) {
    display: none;
  }
`;

const CursorChoice = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50px;
`;

const CursorChoiceOne = styled(CursorChoice)`
  background-color: var(--color-secondary);
  border: ${props =>
    props.cursorColor === 0 ? "4px solid var(--color-white)" : "none"};
`;

const CursorChoiceTwo = styled(CursorChoice)`
  background-color: var(--color-tertiary);
  border: ${props =>
    props.cursorColor === 1 ? "4px solid var(--color-white)" : "none"};
`;

const CursorChoiceThree = styled(CursorChoice)`
  background-color: gold;
  border: ${props =>
    props.cursorColor === 2 ? "4px solid var(--color-white)" : "none"};
`;

const CursorChoiceFour = styled(CursorChoice)`
  background-color: silver;
  border: ${props =>
    props.cursorColor === 3 ? "4px solid var(--color-white)" : "none"};
`;

const CursorPaletteComp = memo(({ cursorColor, setCursorColor }) => {
  const setCursorLoc = useContext(CursorContext);

  return (
    <CursorPalette>
      <CursorChoiceOne
        className="cursor-choice"
        cursorColor={cursorColor}
        onClick={() => setCursorColor(0)}
        onMouseEnter={() => setCursorLoc("choice")}
        onMouseLeave={() => setCursorLoc("neutral")}
      />
      <CursorChoiceTwo
        className="cursor-choice"
        cursorColor={cursorColor}
        onClick={() => setCursorColor(1)}
        onMouseEnter={() => setCursorLoc("choice")}
        onMouseLeave={() => setCursorLoc("neutral")}
      />
      <CursorChoiceThree
        className="cursor-choice"
        cursorColor={cursorColor}
        onClick={() => setCursorColor(2)}
        onMouseEnter={() => setCursorLoc("choice")}
        onMouseLeave={() => setCursorLoc("neutral")}
      />
      <CursorChoiceFour
        className="cursor-choice"
        cursorColor={cursorColor}
        onClick={() => setCursorColor(3)}
        onMouseEnter={() => setCursorLoc("choice")}
        onMouseLeave={() => setCursorLoc("neutral")}
      />
    </CursorPalette>
  );
});

export default CursorPaletteComp;
