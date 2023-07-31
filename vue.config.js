const { defineConfig } = require("@vue/cli-service");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    resolve: {
      fallback: {
        crypto: require.resolve("crypto-browserify"),
        stream: require.resolve("stream-browserify"),
      },
    },
  },
  lintOnSave: false,
  css: {
    loaderOptions: {
      scss: {
        additionalData: `@import "/public/_app_variables_and_themes.scss"; @import "/public/main.scss";`,
      },
    },
  },
});
