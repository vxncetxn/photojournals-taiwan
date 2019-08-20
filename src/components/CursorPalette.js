import React from "react";
import styled from "styled-components";

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

const CursorPaletteComp = ({ cursorColor, setCursorColor }) => {
  return (
    <CursorPalette>
      <CursorChoiceOne
        className="cursor-choice"
        cursorColor={cursorColor}
        onClick={() => setCursorColor(0)}
      />
      <CursorChoiceTwo
        className="cursor-choice"
        cursorColor={cursorColor}
        onClick={() => setCursorColor(1)}
      />
      <CursorChoiceThree
        className="cursor-choice"
        cursorColor={cursorColor}
        onClick={() => setCursorColor(2)}
      />
      <CursorChoiceFour
        className="cursor-choice"
        cursorColor={cursorColor}
        onClick={() => setCursorColor(3)}
      />
    </CursorPalette>
  );
};

export default CursorPaletteComp;
