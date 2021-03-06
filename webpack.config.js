const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

const config = {
  mode: "development",
  entry: "./src/index.ts",
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "docs")
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".json"]
  },
  devtool: "inline-source-map",
  plugins: [
    new CopyPlugin([
      {
        from: "src/*.html",
        to: "",
        flatten: true
      }
    ])
  ],
  module: {
    rules: [
      // all files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'
      {
        test: /\.tsx?$/,
        use: ["ts-loader"],
        exclude: /node_modules/
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          {
            loader: "style-loader"
            // options: {
            //   // injectType: "singletonStyleTag"
            //   // injectType: "linkTag"
            // }
          },
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader"
        ]
      }
    ]
  }
};

const serverConfig = {
  mode: 'development',
  devtool: 'source-map',
  entry: {
    'server': './src/serverThings/server.ts'
  },
  target: 'node',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js'],
  },
  output: {
    path: path.resolve(__dirname, 'docs'),
    filename: '[name].js'
  }
};

module.exports = [serverConfig, config];
