const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const autoprefixer = require('autoprefixer')

const path = require('path')
const isProd = process.env.NODE_ENV === 'production' ? true : false

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, '../javascript/entry/index.js'),
  output: {
    path: path.resolve(__dirname, '..', '..', 'dist'),
    filename: 'tpp_bundle.js'
  },
  resolve: {
    extensions: ['.js', '.vue']
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            scss: [
              'vue-style-loader',
              {
                loader: 'css-loader',
                options: { minimize: isProd ? true : false }
              },
              'sass-loader'
            ],
            css: ['vue-style-loader', 'css-loader']
          }
        }
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader', // creates style nodes from JS strings
          'css-loader', // translates CSS into CommonJS
          {
            loader: 'postcss-loader',
            options: {
              plugins: loader => [
                autoprefixer({
                  browsers: ['last 3 versions', 'iOS 9']
                })
              ]
            }
          },
          'sass-loader' // compiles Sass to CSS
        ]
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        options: {
          presets: ['babel-preset-env']
        }
      },
      // https://github.com/webpack-contrib/url-loader/issues/6
      // {
      //   test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
      //   use: 'url-loader?limit=10000&mimetype=image/svg+xml'
      // },
      {
        test: /\.svg$/,
        loader: 'file-loader',
        options: {
          name: 'asset/[hash].[ext]'
        }
      }
    ]
  },
  devServer: {
    port: 8081,
    proxy: {
      '/tpp': 'http://localhost:8082'
    }
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../index.html')
    })
  ],
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/](faye|vue|vue-router|vuex)[\\/]/,
          name: 'vendor',
          chunks: 'initial'
        }
      }
    }
  }
}
