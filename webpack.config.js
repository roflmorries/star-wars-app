import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path, { resolve } from 'path';
import { fileURLToPath } from 'url';

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
            { test: /\.css$/, use: ['style-loader', 'css-loader'] },
            {
                test: /\.(png|jpe?g|svg|gif|webp)$/,
                type: 'asset/resource',
              },
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            favicon: './src/images/favicon.svg'
        })
    ],
    optimization: {
        splitChunks: {
          chunks: "all",
        },
      },
}