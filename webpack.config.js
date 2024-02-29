const path = require('path');

const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWepbackPlugin = require('copy-webpack-plugin');
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");


module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true
    },
    devServer: {
        historyApiFallback: true,
        static: path.resolve(__dirname, './dist'),
        open: true,
        compress: true,
        hot: true,
        port: 8080,
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            url: false,
                            import: false
                        }
                    }],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'img/[hash][ext]'
                },
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'fonts/[hash][ext]'
                },
            },
        ],
    },
    plugins: [
        new CopyWepbackPlugin({
            patterns: [
                { from: "src/img", to: "img" },
                { from: "src/fonts", to: "fonts" },
                { from: 'src/favicon.ico' }
            ],
        }),
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            scriptLoading: 'defer',
            favicon: 'src/favicon.ico'
        })
    ],
    optimization: {
        minimizer: [
            '...',
            new ImageMinimizerPlugin({
                loader: true,
                minimizer: {
                    implementation: ImageMinimizerPlugin.imageminMinify,
                    options: {
                        plugins: [
                            "imagemin-gifsicle",
                            "imagemin-mozjpeg",
                            "imagemin-pngquant",
                            "imagemin-svgo",
                        ],
                    },
                },
                generator: [
                    {
                        type: "asset",
                        implementation: ImageMinimizerPlugin.imageminGenerate,
                        options: {
                            plugins: ["imagemin-webp"],
                        },
                    },
                ],
            }),
        ],
    },
};