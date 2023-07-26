var path = require("path");
var SRC_DIR = path.join(__dirname, "/client/src");
var DIST_DIR = path.join(__dirname, "/client/dist");

module.exports = {
  mode: "development",
  devtool: "inline-source-map",
  entry: `${SRC_DIR}/index.jsx`,
  output: {
    filename: "bundle.js",
    path: DIST_DIR
  },
  devServer: {
    static: path.resolve(__dirname, 'client/dist'),
    open: true,
    client: {
      logging: 'none'
    }
  },
  module: {
    rules: [
      {
        test: [/\.jsx$/],
        exclude: /node_modules/,
        use:{
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader"}
        ]
      }
    ]
  }
};

// const path = require('path')

// module.exports = {
//   mode: 'development',
//   entry: path.resolve(__dirname, 'client/src', 'index.js'),
//   output: {
//     path: path.resolve(__dirname, 'client/dist'),
//     filename: 'bundle.js'
//   },
//   devServer: {
//     static: path.resolve(__dirname, 'client/dist'),
//     open: true,
//     client: {
//       logging: 'none'
//     },
//     port: 9000
//   },
//   module: {
//     rules: [
//       {
//         test: /\.(jsx|js)$/,
//         include: path.resolve(__dirname, 'src'),
//         exclude: /node_modules/,
//         use: [{
//           loader: 'babel-loader',
//           options: {
//             presets: [
//               '@babel/preset-env',
//               '@babel/preset-react'
//             ]
//           }
//         }]
//       }
//     ]
//   }
// }