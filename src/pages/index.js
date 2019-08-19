import React, { useState, useEffect } from "react";
import { graphql, useStaticQuery } from "gatsby";

import Defaults from "../components/Defaults";
import Hero from "../components/Hero";
import Content from "../components/Content";
import Popout from "../components/Popout";
import SectionPagi from "../components/SectionPagi";
import Cursor from "../components/Cursor";
import CursorPalette from "../components/CursorPalette";

const locs = ["wroclaw", "istanbul"];

export default () => {
  const [cursorColor, setCursorColor] = useState(1);

  useEffect(() => {}, []);

  const photos = useStaticQuery(graphql`
    query {
      allFile {
        nodes {
          sharp: childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
          relativeDirectory
        }
      }
    }
  `).allFile.nodes;

  console.log(photos);

  return (
    <>
      <Defaults />
      <Hero />
      {locs.map(loc => {
        return (
          <Content
            key={loc}
            loc={loc}
            locPhotos={photos.flatMap(photo => {
              if (photo.relativeDirectory === loc) {
                return photo.sharp;
              } else {
                return [];
              }
            })}
          />
        );
      })}
      <Popout />
      <SectionPagi />
      <Cursor cursorColor={cursorColor} />
      <CursorPalette
        cursorColor={cursorColor}
        setCursorColor={setCursorColor}
      />
    </>
  );
};
