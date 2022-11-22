const path = require('path');
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
const { config } = require('process');
const webpackBundleAnalyzer = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");


module.exports = {
    resolve: {
        extensions: ['.js', '.json','.wasm', '...'],
        fallback: {
        "path": require.resolve("path-browserify"),
        //"path": false,
        "fs": false
            },
        alias: {
            'assets': path.resolve(__dirname + '/assets/images')
        }

    },
    mode: 'production',
    optimization: {
        usedExports: true,
        minimize: true,
        minimizer: [new TerserPlugin({
                include: /\.min\.js$/
            }),
            new CssMinimizerPlugin()],
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]((?!(cannon-es)).*)[\\/]/,
                    name: 'vendor',
                    chunks: 'all'
    
                }

            }

        }
        
    },
    entry: {
        
        index: path.resolve(__dirname , './public/index.js')

    },
     output : {

            path: path.resolve(__dirname , './build'),
            filename: '[name].bundle.min.js',
            assetModuleFilename: '[name][ext]'

    },
    devtool: "source-map",
    plugins:
    [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './public/index.html'),
            minify: true
        }),
        new CopyWebpackPlugin({
            patterns: [
                { 
                    from: path.resolve(__dirname, './public/javascript/Utils/draco/gltf/draco_decoder.wasm'),
                    to : 'helper/draco_decoder.wasm',
                    noErrorOnMissing: true,
                    from: path.resolve(__dirname, './public/javascript/Utils/draco/gltf/draco_wasm_wrapper.js'),
                    to : 'helper/draco_wasm_wrapper.js',
                    noErrorOnMissing: true
                }
                ,
                {
                    from: path.resolve(__dirname, './public/style/styles.vendor.css'),
                    to: 'styles.min.css'
                },
                {
                    from: path.resolve(__dirname, './public/assets/images/'),
                    to: 'assets/images/'
                }
 

            ]
        }),
        new NodePolyfillPlugin(),

     

        new webpackBundleAnalyzer(),

        // new CompressionPlugin({
        //     deleteOriginalAssets: true
        // })

        
        // new webpack.ProvidePlugin({
        //     Ammo: 'ammo.js'
        // }),


    ],
    module:
    {
        rules:
        [

             // JS
             {
                test: /\.(js|.wasm)$/,
                exclude: /node_modules/,
                use:
                [
                    'babel-loader'
                ]
            },

            //       // JS
            // {
            //     test: /\(draco_decoder.js)$/,
            //     type: 'asset/source',
            //     generator: {
            //         filename: 'draco/[name][ext]'
            //     },
          
            // },


                // CSS
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
                
               
            },

            // textures
            {
                test: /\.(jpg|png|gif|svg)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/textures/[name][ext]'
                  }
              
                     
           
       
            },

            // Fonts
            {
                test: /\.(ttf|eot|woff|woff2)$/,
                type: 'asset/resource',
                generator:
                {
                    filename: 'assets/fonts/[hash][ext]'
                }
            },

            {
                test: /\.(glsl|vs|fs|vert|frag)$/,
                type: 'asset/source',
                generator:
                {
                    filename: 'assets/shaders/[hash][ext]'
                }
            },
            {
                test: /\.(bin|glb|gltf|fbx)$/,
                loader: 'file-loader',
                options:
                        {
                            outputPath: 'assets/models/'
                        }
          
       
            },



          ]
    }


    
}