import { globalCss } from "@ignite-ui/react";

export default globalCss({
  "*": {
    margin: 0,
    padding: 0,
    boxSizing: "border-box",
    outline: "none",
  },

  body: {
    background: "$gray900",
    color: "$gray100",
    "-webkit-font-smoothing": "antialiased",
  },
});
