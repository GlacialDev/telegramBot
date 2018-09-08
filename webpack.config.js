const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
    entry: './index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    node: {
        console: true,
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        dns: 'empty',
        module: 'empty'
    },
    target: 'node', // in order to ignore built-in modules like path, fs, etc. 
    externals: [nodeExternals()], // in order to ignore all modules in node_modules folder 
    module: {
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: [/node_modules/],
            options: {
                presets: ['es2015', 'stage-2'],
            }
        }]
    }
};