const isDev = process.env.NODE_ENV !== "production";

module.exports = {
  syntax: "postcss-scss",
  plugins: [
    require("@csstools/postcss-sass"),
    require("postcss-preset-env"),
  ].concat(isDev ? [] : [require("postcss-csso")]),
};
