const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const autoprefixer = require("autoprefixer");
const assetsPath = path.join(__dirname, "build", "assets");
const serverPath = path.join(__dirname,  "build", "server");
const commonLoaders = [
];

module.exports = [
	{
		name: "browser",
		entry: './app/entry.js',
		output: {
			path: assetsPath,
			filename: 'bundle.js'
		},
		module: {
			rules: commonLoaders.concat([
				{
					test: [/\.svg$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
					loader: "file-loader",
					options: {
						name: "[name].[ext]",
						publicPath: url => url.replace(/build/, "")
					}
				},
				{
					test: /\.css$/,
					use: ExtractTextPlugin.extract({
						use: [
							{
								loader: "css-loader",
								options: { importLoaders: 1 }
							},
							{
								loader: "postcss-loader",
								options: { plugins: [autoprefixer()] }
							}
						]
					})
				},
				{
					test: /\.js$/,
					exclude: /(node_modules)/,
					loader: "babel-loader",
					query: {presets: ["react-app"] }
				},
			])
		},
		plugins: [

			new ExtractTextPlugin({
				filename: "[name].css"
			}),
			function(compiler) {
				this.plugin("done", function(stats) {
					require("fs").writeFileSync(path.join(assetsPath, "stats.generated.json"), JSON.stringify(stats.toJson()));
				});
			}
		]

	},
	{
		name: "server-side rending",
		entry: './server/page.js',
		output: {
			path: serverPath,
			filename: "page.generator.js",
			library: 'page',
			libraryTarget: 'commonjs2'
		},
		module: {
			rules:  commonLoaders.concat([
				{
					test: [/\.svg$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
					loader: "file-loader",
					options: {
						name: "build/media/[name].[ext]",
						publicPath: url => url.replace(/build/, ""),
						emit: false
					}
				},
				{
					test: /\.js$/,
					exclude: /(node_modules)/,
					loader: "babel-loader",
					query: {presets: ["react-app"] }
				},

				{ test: /\.css$/, loader: "css-loader/locals" },
			])
		}
	}
]
