import { createGlobalStyle } from "styled-components";

const Defaults = createGlobalStyle`
@import url("https://fonts.googleapis.com/css?family=Lato:300,400&display=optional");
@import url("https://fonts.googleapis.com/css?family=Contrail+One&display=optional");
@import url("https://fonts.googleapis.com/css?family=Roboto+Mono:700&display=optional");
@import url("https://fonts.googleapis.com/css?family=Noto+Sans+SC:700&display=optional");

:root {
    --font-primary: Contrail One;
    --font-secondary: Roboto Mono;
    --font-nav: Lato;
    --font-chinese: Noto Sans SC;

    --color-primary: #0c1727;
    --color-primary-light: #182e4e;
    --color-secondary: #9c3046;
    --color-tertiary: turquoise;
    --color-white: #fcfcfc;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html {
    font-size: 62.5%;
}

body {
    position: relative;
    background-color: var(--color-primary);
    isolation: isolate;
    overflow-x: hidden;
}

ul {
    list-style: none;
}

a {
    text-decoration: none;
    color: black;
}

.chinese-char {
    font-family: "Noto Sans SC";
}
`;

export default Defaults;
