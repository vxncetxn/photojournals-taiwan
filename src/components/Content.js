import React, { useState, useEffect, useContext, memo } from "react";
import styled from "styled-components";
import Img from "gatsby-image";
import { window } from "browser-monads";

import { CursorContext } from "../CursorContext";

import Marquee from "./Marquee";

function arrayTo2DArray2(list, howMany) {
  var idx = 0;
  const result = [];

  while (idx < list.length) {
    if (idx % howMany === 0) result.push([]);
    result[result.length - 1].push(list[idx++]);
  }

  return result;
}

const Content = styled.div`
  position: relative;
  padding: 30px 100px;

  @media (max-width: 1100px) {
    padding: 30px 70px;
  }

  @media (max-width: 800px) {
    padding: 30px 50px;
  }

  @media (max-width: 520px) {
    padding: 30px 30px;
  }
`;

const ImageRow = styled.div`
  margin-top: -4.25vw;
  width: 85%;
  height: calc(20vh + 15vw);
  display: flex;
  justify-content: start;
  clip-path: polygon(0 20%, 100% 0, 100% 80%, 0 100%);

  & > div + div {
    margin-left: 1vw;
  }

  @media (max-width: 1100px) {
    margin-top: -4.8vw;
  }

  @media (max-width: 800px) {
    margin-top: -5.75vw;
  }
`;

const ImageWrapper = styled.div`
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

const Trial = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  background-color: palevioletred;
  clip-path: polygon(0 5%, 100% 0%, 100% 80%, 0 85%);
  will-change: transform, width, height, clip-path;
`;

const ContentComp = memo(({ loc, locPhotos, setLightboxPhoto }) => {
  const setCursorLoc = useContext(CursorContext);

  const [groupSize, setGroupSize] = useState(4);

  let groupedLocPhotos = arrayTo2DArray2(locPhotos, groupSize);

  useEffect(() => {
    if (window) {
      window.addEventListener("resize", () => {
        if (window.innerWidth <= 520) {
          setGroupSize(1);
        } else if (window.innerWidth <= 800) {
          setGroupSize(2);
        } else if (window.innerWidth <= 1100) {
          setGroupSize(3);
        } else {
          setGroupSize(4);
        }

        groupedLocPhotos = arrayTo2DArray2(locPhotos, groupSize);
      });
    }
  }, []);

  return (
    <>
      <Content className={`${loc}-section`}>
        <Marquee>Taipei City 臺北</Marquee>
        {groupedLocPhotos.map(group => {
          return (
            <ImageRow>
              {group.map(photo => {
                return (
                  <ImageWrapper
                    onMouseEnter={() => setCursorLoc("image")}
                    onMouseLeave={() => setCursorLoc("neutral")}
                    onClick={e => {
                      const initDims = e.target.getBoundingClientRect();
                      setLightboxPhoto({
                        fluid: photo.fluid,
                        initDims
                      });
                    }}
                  >
                    <Img
                      fluid={photo.fluid}
                      imgStyle={{ objectFit: "cover" }}
                    />
                  </ImageWrapper>
                );
              })}
            </ImageRow>
          );
        })}
      </Content>
      <Trial id="trial" />
    </>
  );
});

export default ContentComp;
