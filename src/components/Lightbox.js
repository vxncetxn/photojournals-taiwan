import React from "react";
import styled from "styled-components";
import Img from "gatsby-image";

const Lightbox = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.8);

  & > .gatsby-image-wrapper {
      width: ${props =>
        props.aspectRatio < 1 ? `calc(100vh * ${props.aspectRatio})` : "800px"};
`;

const LightboxComp = ({ lightboxPhoto, setLightboxPhoto }) => {
  console.log(lightboxPhoto);
  return (
    <Lightbox
      onClick={() => setLightboxPhoto(null)}
      aspectRatio={lightboxPhoto.fluid.aspectRatio}
    >
      <Img fluid={lightboxPhoto.fluid} imgStyle={{ objectFit: "cover" }} />
    </Lightbox>
  );
};

export default LightboxComp;
