import React, { useState, useEffect } from "react";
import { graphql, useStaticQuery } from "gatsby";

import { CursorContext } from "../CursorContext";

import Defaults from "../components/Defaults";
import Lightbox from "../components/Lightbox";
import Hero from "../components/Hero";
import Content from "../components/Content";
import Popout from "../components/Popout";
import SectionPagi from "../components/SectionPagi";
import Cursor from "../components/Cursor";
import CursorPalette from "../components/CursorPalette";

const locs = ["taipei", "istanbul"];

export default () => {
  const [popped, setPopped] = useState(false);
  const [cursorLoc, setCursorLoc] = useState("neutral");
  const [cursorColor, setCursorColor] = useState(0);
  const [currentSection, setCurrentSection] = useState("hero");
  const [lightboxPhoto, setLightboxPhoto] = useState(null);

  //   useEffect(() => {
  //     const observerHero = new IntersectionObserver(
  //       (entries, observer) => {
  //         entries.forEach(entry => {
  //           if (entry.isIntersecting) {
  //             setCurrentSection("hero");
  //           }
  //         });
  //       },
  //       { threshold: 0.4 }
  //     );
  //     observerHero.observe(document.querySelector(".hero-section"));

  //     const observerWroclawSection = new IntersectionObserver(
  //       (entries, observer) => {
  //         entries.forEach(entry => {
  //           if (entry.isIntersecting) {
  //             setCurrentSection("wroclaw");
  //           }
  //         });
  //       },
  //       { threshold: 0.4 }
  //     );
  //     observerWroclawSection.observe(document.querySelector(".wroclaw-section"));
  //   }, []);

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

  return (
    <>
      <Defaults />
      <CursorContext.Provider value={setCursorLoc}>
        {lightboxPhoto ? (
          <Lightbox
            lightboxPhoto={lightboxPhoto}
            setLightboxPhoto={setLightboxPhoto}
          />
        ) : null}
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
              setLightboxPhoto={setLightboxPhoto}
            />
          );
        })}
        <Popout popped={popped} setPopped={setPopped} />
        <SectionPagi currentSection={currentSection} />
        <Cursor
          cursorLoc={cursorLoc}
          popped={popped}
          cursorColor={cursorColor}
        />
        <CursorPalette
          cursorColor={cursorColor}
          setCursorColor={setCursorColor}
        />
      </CursorContext.Provider>
    </>
  );
};
