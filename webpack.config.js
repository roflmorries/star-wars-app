import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path, { resolve } from 'path';
import { fileURLToPath } from 'url';
import ESLintPlugin from 'eslint-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import ImageMinimizerPlugin from 'image-minimizer-webpack-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)

export default {
    mode: 'production',
    entry: './src/app.js',
    // devtool: 'source-map',
    resolve: {
        alias: {
            '@img': path.resolve(__dirname, 'src/images'),
            '@css': path.resolve(__dirname, 'src/css'),
        }
    },
    output: {
        filename: 'app.[contenthash].js',
        path: path.resolve(__dirname, 'docs')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                  'style-loader',
                  'css-loader',
                  {
                    loader: 'postcss-loader',
                    options: {
                      postcssOptions: {
                        plugins: [
                          ['autoprefixer', {}],
                          ['cssnano', {}]
                        ],
                      },
                    },
                  },
                ],
              },
            {
                test: /\.(png|jpe?g|svg|gif|webp)$/,
                type: 'asset/resource',
              },
              {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: ['@babel/preset-env'],
                  }
                }
              }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            favicon: './src/images/favicon.svg'
        }),
        new ESLintPlugin({
            extensions: ['js'],
            emitWarning: true,
        }),
        new BundleAnalyzerPlugin(),
        new ImageMinimizerPlugin({
            minimizer: {
              implementation: ImageMinimizerPlugin.imageminMinify,
              options: {
                plugins: [
                  ['imagemin-mozjpeg', { quality: 75 }],
                  ['imagemin-pngquant', { quality: [0.6, 0.8] }],
                  ['imagemin-gifsicle', { interlaced: true }],
                  ['imagemin-svgo', { plugins: [{ removeViewBox: false }] }],
                ],
              },
            },
            exclude: /favicon.svg/,
          }),
        
    ],
    optimization: {
        splitChunks: {
          chunks: "all",
        },
      },
}