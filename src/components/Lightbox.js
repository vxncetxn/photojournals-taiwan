import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import Img from "gatsby-image";

// const Darken = keyframes`
//   100% {
//     background-color: rgba(0, 0, 0, 0.8);
//   }
// `;

// const Morph = (aspectRatio, width, height, left, top) => keyframes`
//   0% {
//     width: ${width}px;
//     height: ${height}px;
//     clip-path: polygon(0 5%, 100% 0%, 100% 80%, 0 85%);
//     transform: ${`translate(${left}px, ${top}px)`};
//   }

//   100% {
//     width: ${aspectRatio < 1 ? `calc(100vh * ${aspectRatio})` : "800px"};
//     height: ${aspectRatio < 1 ? `100vh` : `calc(800px / ${aspectRatio})`};
//     clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0 100%);
//     transform: translate(calc(50vw - 50%), calc(50vh - 50%));
//   }
// `;

const Lightbox = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0);
  transition: background-color 0.5s ease-out;

  & > .gatsby-image-wrapper {
    position: absolute;
    left: 0;
    top: 0;
    transform: ${props => `translate(${props.left}px, ${props.top}px);`}
    width: ${props => `${props.width}px`};
    height: ${props => `${props.height}px`};
    clip-path: polygon(0 5%, 100% 0%, 100% 80%, 0 85%);
  }
`;

const LightboxComp = ({ lightboxPhoto, setLightboxPhoto }) => {
  const lightboxRef = useRef();
  const { left, top, width, height } = lightboxPhoto.initDims;

  const unanimate = () => {
    const gatsbyWrapper = lightboxRef.current.firstChild;

    lightboxRef.current.style.backgroundColor = "rgba(0, 0, 0, 0)";

    gatsbyWrapper.style.width = `${width}px`;
    gatsbyWrapper.style.height = `${height}px`;
    gatsbyWrapper.style.clipPath = "polygon(0 5%, 100% 0%, 100% 80%, 0 85%)";
    gatsbyWrapper.style.transform = `translate(${left}px, ${top}px)`;
  };

  useEffect(() => {
    const gatsbyWrapper = lightboxRef.current.firstChild;
    const aspectRatio = lightboxPhoto.fluid.aspectRatio;

    lightboxRef.current.style.backgroundColor = "rgba(0, 0, 0, 0.8)";

    gatsbyWrapper.classList.toggle("trial-class");
    gatsbyWrapper.style.width =
      aspectRatio < 1 ? `calc(100vh * ${aspectRatio})` : "800px";
    gatsbyWrapper.style.height =
      aspectRatio < 1 ? `100vh` : `calc(800px / ${aspectRatio})`;
    gatsbyWrapper.style.clipPath = "polygon(0% 0%, 100% 0%, 100% 100%, 0 100%)";
    gatsbyWrapper.style.transform =
      "translate(calc(50vw - 50%), calc(50vh - 50%))";
  }, []);

  return (
    <Lightbox
      ref={lightboxRef}
      onClick={() => {
        unanimate();
        setTimeout(() => setLightboxPhoto(null), 500);
      }}
      aspectRatio={lightboxPhoto.fluid.aspectRatio}
      left={left}
      top={top}
      width={width}
      height={height}
    >
      <Img fluid={lightboxPhoto.fluid} imgStyle={{ objectFit: "cover" }} />
    </Lightbox>
  );
};

export default LightboxComp;
