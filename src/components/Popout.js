import React, { useContext, memo } from "react";
import styled from "styled-components";

import { CursorContext } from "../CursorContext";

const Popout = styled.div`
  position: fixed;
  right: ${props => (props.popped ? `0` : `-287px`)};
  top: 100px;
  width: 350px;
  height: 350px;
  background-color: var(--color-secondary);
  clip-path: polygon(100% 0, 100% 92%, 18% 100%, 18% 55%, 0 57%, 0 8%);
  transition: all 0.4s ease-in;

  @media (max-width: 520px) {
    width: 300px;
    right: ${props => (props.popped ? `0` : `-246px`)};
  }
`;

const PopoutLabel = styled.div`
  position: absolute;
  font-family: var(--font-secondary), sans-serif;
  font-size: 2.4rem;
  font-weight: 700;
  text-transform: uppercase;
  color: var(--color-white);
  padding: 20px;
  transform: translate(-54px, 74px) rotate(-90deg);

  @media (max-width: 520px) {
    transform: translate(-58px, 74px) rotate(-90deg);
  }

  //   border: 1px solid green;
`;

const PopoutComp = memo(({ popped, setPopped }) => {
  const setCursorLoc = useContext(CursorContext);

  return (
    <Popout popped={popped}>
      <PopoutLabel
        className="popout-label"
        onClick={() => {
          if (popped) {
            setPopped(false);
          } else {
            setPopped(true);
          }
        }}
        onMouseEnter={() => {
          if (popped) {
            setCursorLoc("popped-label");
          } else {
            setCursorLoc("unpopped-label");
          }
        }}
        onMouseLeave={() => setCursorLoc("neutral")}
      >
        Locations
      </PopoutLabel>
    </Popout>
  );
});

export default PopoutComp;
