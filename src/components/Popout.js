import React, { useState } from "react";
import styled from "styled-components";

const Popout = styled.div`
  position: fixed;
  right: ${props => (props.popped ? `0` : `-287px`)};
  top: 100px;
  width: 350px;
  height: 350px;
  background-color: var(--color-secondary);
  clip-path: polygon(100% 0, 100% 92%, 18% 100%, 18% 55%, 0 57%, 0 8%);
  transition: all 0.4s ease-in;

  @media (max-width: 660px) {
    width: 300px;
    right: ${props => (props.popped ? `0` : `-246px`)};
  }
`;

const PopoutLabel = styled.div`
  position: absolute;
  font-family: "Lato", sans-serif;
  font-size: 2.2rem;
  text-transform: uppercase;
  color: var(--color-white);
  padding: 20px;
  cursor: pointer;
  transform: translate(-50px, 77.5px) rotate(-90deg);

  @media (max-width: 1100px) {
    background-color: yellow;
  }

  @media (max-width: 800px) {
    background-color: green;
  }

  @media (max-width: 660px) {
    font-size: 2rem;
  }

  //   border: 1px solid green;
`;

const PopoutComp = () => {
  const [popped, setPopped] = useState(false);
  return (
    <Popout popped={popped}>
      <PopoutLabel
        onClick={() => {
          if (popped) {
            setPopped(false);
          } else {
            setPopped(true);
          }
        }}
      >
        Locations
      </PopoutLabel>
    </Popout>
  );
};

export default PopoutComp;
