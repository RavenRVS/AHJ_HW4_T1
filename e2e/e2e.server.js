/* eslint-disable import/no-extraneous-dependencies */
const Webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfig = require('../webpack.prod');

const compiler = Webpack(webpackConfig);
const devServerOptions = { compress: true, port: 8888, open: false };
const server = new WebpackDevServer(devServerOptions, compiler);

export default server;