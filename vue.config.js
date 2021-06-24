const fs = require("fs")
const path = require("path")
const webpack = require("webpack")
const moment = require('moment')
const pkg = require('./package.json')

const resolve = dir => path.join(__dirname, dir)

process.env.VUE_APP_BUILD_TIME = moment().format('YYYY.MM.DD HH:mm:ss')
process.env.VUE_APP_VERSION = pkg.version

console.log(process.env.VUE_APP_BUILD_TIME)
console.log(process.env.VUE_APP_VERSION)

let config = {
	configureWebpack: {
		plugins: [
			new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
			new webpack.DefinePlugin({
				VERSION: `${require('./package.json').version}`,
				BUILD_DATE: JSON.stringify(new Date().toLocaleString())
			})
		]
	},
	chainWebpack: config => {
		config.resolve.alias.set("@", resolve("src"))
		config.plugin('html').tap(args => {
			if (process.env.NODE_ENV === 'production') {
				args[0].minify.removeComments = false
			}
			return args
		})
	},
	publicPath: './',
	productionSourceMap: false,
	transpileDependencies: []
}

module.exports = config