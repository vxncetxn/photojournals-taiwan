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

const ArrowButtonLeft = styled.button`
  position: absolute;
  left: 0;
  top: 0;
  font-family: var(--font-primary);
  font-size: 80px;
  line-height: 0.45;
  color: white;
  transform: translate(200px, calc(50vh - 50%));
  // transform: translate(calc(100vw - 200px - 35px), calc(100vh - 150px + 20px))
  //   rotate(-25deg);
  // border: 1px solid red;
`;

const ArrowButtonRight = styled.button`
  position: absolute;
  left: 0;
  top: 0;
  font-family: var(--font-primary);
  font-size: 80px;
  line-height: 0.45;
  color: white;
  transform: translate(calc(100vw - 200px), calc(50vh - 50%));
  // transform: translate(calc(100vw - 200px + 35px), calc(100vh - 150px - 20px))
  //   rotate(-25deg);
  // border: 1px solid red;
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

  const goToNextImage = () => setCurrentIdx((currentIdx + 1) % images.length);
  const goToPreviousImage = () =>
    currentIdx - 1 < 0
      ? setCurrentIdx(images.length - 1)
      : setCurrentIdx(currentIdx - 1);

  useEffect(() => {
    if (currentIdx + 1) {
      setClosed(false);
    }
  }, [currentIdx]);

  return (
    <LightboxContext.Provider value={{ setCurrentIdx, setInitDims }}>
      {children}
      {currentIdx + 1 ? (
        <LightboxOverlay
          {...others}
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
          <ArrowButtonLeft onClick={goToPreviousImage}>
            <svg
              enable-background="new 0 0 443.52 443.52"
              viewBox="0 0 443.52 443.52"
              xmlns="http://www.w3.org/2000/svg"
              width="50"
              height="50"
              fill="white"
            >
              <path d="m143.492 221.863 192.734-192.734c6.663-6.664 6.663-17.468 0-24.132-6.665-6.662-17.468-6.662-24.132 0l-204.8 204.8c-6.662 6.664-6.662 17.468 0 24.132l204.8 204.8c6.78 6.548 17.584 6.36 24.132-.42 6.387-6.614 6.387-17.099 0-23.712z" />
            </svg>
          </ArrowButtonLeft>
          <ArrowButtonRight onClick={goToNextImage}>
            <svg
              enable-background="new 0 0 443.52 443.52"
              viewBox="0 0 443.52 443.52"
              xmlns="http://www.w3.org/2000/svg"
              width="50"
              height="50"
              fill="white"
            >
              <path d="m336.226 209.591-204.8-204.8c-6.78-6.548-17.584-6.36-24.132.42-6.388 6.614-6.388 17.099 0 23.712l192.734 192.734-192.734 192.734c-6.663 6.664-6.663 17.468 0 24.132 6.665 6.663 17.468 6.663 24.132 0l204.8-204.8c6.663-6.665 6.663-17.468 0-24.132z" />
            </svg>
          </ArrowButtonRight>
        </LightboxOverlay>
      ) : null}
    </LightboxContext.Provider>
  );
};
