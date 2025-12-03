module.exports = function (api) {
  api.cache(true);

  return {
    presets: ["module:@react-native/babel-preset"],

    plugins: [
      "react-native-reanimated/plugin",
      [
        "module-resolver",
        {
          root: ["./src"],
          alias: {
            "@assets": "./src/assets",
            "@features": "./src/app/features",
            "@navigation": "./src/app/navigation",
            "@components": "./src/app/components",
            "@unistyles": "./src/app/unistyles",
            "@utils": "./src/app/utils",
            "@screens": "./src/app/screens",
          },
        },
      ],
    ],
  };
};
