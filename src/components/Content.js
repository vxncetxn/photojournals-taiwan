import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Img from "gatsby-image";
import { window } from "browser-monads";

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
  margin-top: 150px;
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

const ImageRowsGroup = styled.div`
  position: relative;

  // border: 1px solid green;

  &::before {
    content: "Kaohsiung 高雄";
    position: absolute;
    left: -2.75vw;
    top: -7.5vw;

    z-index: 1;
    display: inline-block;
    font-size: 12.5vw;
    font-family: var(--font-primary), var(--font-chinese), sans-serif;
    font-weight: 700;
    // letter-spacing: 10px;
    text-transform: uppercase;
    color: var(--color-secondary);
    mix-blend-mode: exclusion;
    transform-origin: 100% 50%;
    transform: rotate(-4.25deg);
    pointer-events: none;

    @media (max-width: 800px) {
      transform: rotate(-4.75deg);
    }

    @media (max-width: 700px) {
      transform: rotate(-6deg);
    }

    @media (max-width: 470px) {
      transform: rotate(-7deg);
      left: -4vw;
    }

    @media (max-width: 410px) {
      transform: rotate(-8deg);
      left: -5vw;
    }

    // border: 1px solid red;
  }
`;

const ImageRow = styled.div`
  margin-top: -4.25vw;
  width: 85%;
  height: calc(20vh + 15vw);
  display: flex;
  justify-content: start;
  //   gap: 1vw;
  clip-path: polygon(0 20%, 100% 0, 100% 80%, 0 100%);

  & > .gatsby-image-wrapper + .gatsby-image-wrapper {
    margin-left: 1vw;
  }

  @media (max-width: 1100px) {
    margin-top: -4.8vw;
  }

  @media (max-width: 800px) {
    margin-top: -5.75vw;
  }

  & > .gatsby-image-wrapper {
    // transition: all 0.3s ease;
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
  }

  //   border: 1px solid red;
`;

const ContentComp = ({ loc, locPhotos }) => {
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
    <Content className={`${loc}-section`}>
      <ImageRowsGroup>
        {groupedLocPhotos.map(group => {
          return (
            <ImageRow>
              {group.map(photo => {
                return (
                  <Img fluid={photo.fluid} imgStyle={{ objectFit: "cover" }} />
                );
              })}
            </ImageRow>
          );
        })}
      </ImageRowsGroup>
    </Content>
  );
};

export default ContentComp;
