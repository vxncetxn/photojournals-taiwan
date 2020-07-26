import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import Img from "gatsby-image";

export const LightboxContext = React.createContext();

const ThumbnailImage = styled.div`
  flex: 1 0 calc((100% - 60px) / 4);

  @media (max-width: 1100px) {
    flex: 1 0 calc((100% - 60px) / 3);
  }

  @media (max-width: 800px) {
    flex: 1 0 calc((100% - 60px) / 2);
  }

  @media (max-width: 520px) {
    flex: 1 0 calc((100% - 60px) / 1);
  }

  & > .gatsby-image-wrapper {
    height: 100%;
  }
`;

const LightboxOverlay = styled.div`
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

export const Thumbnail = ({ image, alt, idx, ...others }) => {
  const { setCurrentIdx, setInitDims } = useContext(LightboxContext);

  return (
    <ThumbnailImage
      onClick={e => {
        setInitDims(e.target.getBoundingClientRect());
        setCurrentIdx(idx);
      }}
      {...others}
    >
      <Img fluid={image.fluid} imgStyle={{ objectFit: "cover" }} />
    </ThumbnailImage>
  );
};

export const Lightbox = ({ images, children, ...others }) => {
  const [currentIdx, setCurrentIdx] = useState(NaN);
  const [initDims, setInitDims] = useState({});
  const [closed, setClosed] = useState(true);

  useEffect(() => {
    if (currentIdx + 1) {
      setClosed(false);
    }
  }, [currentIdx]);

  return (
    <LightboxContext.Provider value={{ setCurrentIdx, setInitDims }}>
      {children}
      {currentIdx ? (
        <LightboxOverlay
          {...others}
          onClick={() => {
            setClosed(true);
            setTimeout(() => setCurrentIdx(NaN), 500);
          }}
          closed={closed}
          aspectRatio={images[currentIdx].fluid.aspectRatio}
          left={initDims.left}
          top={initDims.top}
          width={initDims.width}
          height={initDims.height}
        >
          <Img
            fluid={images[currentIdx].fluid}
            imgStyle={{ objectFit: "cover" }}
          />
        </LightboxOverlay>
      ) : null}
    </LightboxContext.Provider>
  );
};
