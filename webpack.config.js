const path = require('path');
const autoprefixer = require('autoprefixer');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const TerselPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require('webpack');

let isDevMode = false;
let isProdMode = false;

// Plugins
const plugins = () => {
  const base = [];

  base.push(
    new webpack.DefinePlugin({
      APP_NAME: "'Selltech test task'",
      API_HOST: "'api'",
      API_AUTHORIZE_ULR: "'http://152.228.215.94:81/auth/login'"
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: './src/index.html',
      minify: {
        collapseWhitespace: !isDevMode,
      },
    }),
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        configFile: './tsconfig.json',
        context: './',
        diagnosticOptions: {
          semantic: true,
          syntactic: true,
        },
      },
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css'
    })
  );

  if (!isDevMode) {
    base.push(
      new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: ['**/*', '!favicon.ico'],
      }),
    );
  }

  return base;
};

// Loaders
const jsLoaders = [
  {
    loader: 'babel-loader',
    options: {
      outputPath: './',
      presets: [['@babel/preset-env', { modules: false }], '@babel/preset-react', '@babel/preset-typescript'],
      plugins: ['@babel/plugin-transform-runtime', '@babel/plugin-syntax-dynamic-import'],
    },
  },
];

const cssLoaders = [
  MiniCssExtractPlugin.loader,
  {
    loader: 'css-loader',
    options: {
      importLoaders: 1,
      modules: {
        mode: 'local',
        exportLocalsConvention: "camelCase",
        localIdentName: '[local]--[hash:base64:5]',
      },
    },
  }
];

const sassLoaders = [
  {
    loader: 'postcss-loader',
    options: {
      postcssOptions: {
        plugins: [autoprefixer],
      },
    },
  },
  {
    loader: 'sass-loader',
    options: {
      sassOptions: {
        includePaths: [__dirname, 'src'],
      },
    },
  },
];

const imagesLoaders = [
  {
    loader: 'file-loader',
    options: {
      name: '[name].[ext]',
      outputPath: './images/',
    },
  },
];

const fontsLoaders = [
  {
    loader: 'file-loader',
    options: {
      name: '[name].[ext]',
      outputPath: './fonts/',
    },
  },
];

// Optimization
const optimization = () => {
  const config = {};

  if (!isDevMode) {
    config.minimizer = [new CssMinimizerPlugin(), new TerselPlugin()];
  } // if

  return config;
};

module.exports = (env, args) => {
  isProdMode = env.prod;
  isDevMode = env.dev;
  isLocalMode = env.local;

  return {
    mode: 'development',
    entry: {
      index: path.resolve(__dirname, 'src'),
    },
    devtool: isDevMode ? 'eval-cheap-module-source-map' : undefined,
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: `scripts/[name].bundle.js`,
      chunkFilename: 'scripts/[name].bundle.js',
      publicPath: '/',
    },
    
    plugins: plugins(),
    devServer: {
      static: path.resolve(__dirname, 'build'),
      compress: true,
      port: 3000,
      hot: true,
      historyApiFallback: true,
      proxy: {
        '/api': {
          target: 'http://152.228.215.94:81',
          secure: false,
          changeOrigin: true,
          onProxyReq: proxyReq => {
            console.log(proxyReq);
          }
        }
      }
    },
    module: {
      rules: [
        {
          test: /\.js(x?)$/,
          exclude: /(node_modules)/,
          use: jsLoaders,
        },
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: [
            { loader: 'thread-loader' },
            {
              loader: 'ts-loader',
              options: {
                happyPackMode: true,
                transpileOnly: true,
              },
            },
          ],
        },
        {
          test: /\.css$/,
          use: cssLoaders,
        },
        {
          test: /\.s[ac]ss$/i,
          use: [...cssLoaders, ...sassLoaders],
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: imagesLoaders,
        },
        {
          test: /\.(woff|woff2|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
          use: fontsLoaders,
        },
      ],
    },
    resolve: {
      plugins: [new TsconfigPathsPlugin()],
      extensions: ['.tsx', '.ts', '.js', '.jsx'],
    },
    
    optimization: optimization(),
  };
};
