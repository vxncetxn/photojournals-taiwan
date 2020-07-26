import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Img from "gatsby-image";

const Lightbox = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  width: 100vw;
  height: 100vh;
  background-color: ${props =>
    props.closed ? `rgba(0, 0, 0, 0)` : `rgba(0, 0, 0, 0.8)`};
  transition: background-color 0.5s ease-out;

  & > .gatsby-image-wrapper {
    position: absolute;
    left: 0;
    top: 0;
    transform: ${props =>
      props.closed
        ? `translate(${props.left}px, ${props.top}px);`
        : `translate(calc(50vw - 50%), calc(50vh - 50%))`};
    width: ${props =>
      props.closed
        ? `${props.width}px`
        : props.aspectRatio < 1
        ? `calc(100vh * ${props.aspectRatio})`
        : "800px"};
    height: ${props =>
      props.closed
        ? `${props.height}px`
        : props.aspectRatio < 1
        ? `100vh`
        : `calc(800px / ${props.aspectRatio})`};
    clip-path: ${props =>
      props.closed
        ? `polygon(0 5%, 100% 0%, 100% 80%, 0 85%)`
        : `polygon(0% 0%, 100% 0%, 100% 100%, 0 100%)`};

    transition: transform 0.5s ease-out, clip-path 0.5s ease-out,
      width 0.5s ease-out, height 0.5s ease-out;
  }
`;

const LightboxComp = ({ lightboxPhoto, setLightboxPhoto }) => {
  const [closed, setClosed] = useState(true);
  const { left, top, width, height } = lightboxPhoto.initDims;

  useEffect(() => setClosed(false), []);

  return (
    <Lightbox
      onClick={() => {
        setClosed(true);
        setTimeout(() => setLightboxPhoto(null), 500);
      }}
      closed={closed}
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
