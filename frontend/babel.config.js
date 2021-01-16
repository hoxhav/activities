module.exports = {
  presets: [
    ["@vue/cli-plugin-babel/preset", {useBuiltIns: "usage"}]
  ],
  plugins: [
    "@babel/plugin-transform-runtime",
    "@babel/plugin-transform-modules-commonjs"
  ]
};
