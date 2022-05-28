import webpack from "webpack";

module.exports = {
  webpack: {
    configure: {
      resolve: {
        fallback: {
          process: require.resolve("process/browser"),
        },
      },
    },
    plugins: [
      new webpack.ProvidePlugin({
        process: "process/browser",
      }),
    ],
    devServer: {
      proxy: {
        "http://localhost:3000": "http://localhost:3001",
        "/api": "http://localhost:3001",

        secure: false,
      },
    },
  },
  devServer: {
    proxy: {
      "http://localhost:3000": "http://localhost:3001",
      "/api": "http://localhost:3001",

      secure: false,
    },
  },
};
