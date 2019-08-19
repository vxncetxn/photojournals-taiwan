import React, { useState, useEffect } from "react";

import Defaults from "../components/Defaults";
import Hero from "../components/Hero";
import Content from "../components/Content";
import Popout from "../components/Popout";
import SectionPagi from "../components/SectionPagi";
import Cursor from "../components/Cursor";
import CursorPalette from "../components/CursorPalette";

export default () => {
  const [cursorColor, setCursorColor] = useState(1);

  useEffect(() => {}, []);

  return (
    <>
      <Defaults />
      <Hero />
      <Content />
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
