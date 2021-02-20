const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')

const mainConfig = {
  entry: './src/js/main.js',
  output: {
    filename: 'js/main.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: './src/manifest.json', to: '' },
        { from: './src/app.html', to: '' },
        { from: './src/assets', to: 'assets' }
      ]
    })
  ]
}

const piConfig = {
  entry: './src/js/pi.js',
  output: {
    filename: 'js/pi.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: './src/pi.html', to: '' },
        { from: './src/css', to: 'css' }
      ]
    })
  ]
}

const setupConfig = {
  entry: './src/js/setup.js',
  output: {
    filename: 'js/setup.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: './src/setup.html', to: '' }
      ]
    })
  ]
}

module.exports = [mainConfig, piConfig, setupConfig]
