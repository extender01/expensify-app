//pro webpack musime uvest zdroj, kde nase app zacina a output, kde bude vystupni bundle.js
//tehle kod je nodejs
//potrebujeme package path, ktery umi spojit cestu k vystupnimu souboru:
//__dirname je absolutni cesta, kde se prave nachazime a public jmeno slozky ve ktere to bude (takze to bude __dirname\public)
//vse uvadime v module.exports, aby to bylo pristupne pro dalsi soubory

//use [] se pouziva kdyz je vice loader
const path = require("path");

const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CSSExtract = new ExtractTextPlugin("styles.css");


module.exports = (env) => {
    const isProduction = env ==="production"

    return {
        entry: "./src/app.js",
        output: {
            path: path.join(__dirname, "public", "dist"),
            filename: "bundle.js"
        },
        module: {
            rules: [{
                loader: "babel-loader",
                test: /\.js$/,
                exclude: /node_modules/
            }, {
                test: /\.s?css$/,
                use: CSSExtract.extract({
                    use: [
                        {
                            loader: "css-loader",
                            options: {
                                sourceMap: true
                            }
                        },
                        {
                            loader: "sass-loader",
                            options: {
                                sourceMap: true
                            }
                        }
                    ]
                })
                                  
            }]
        },
        plugins: [
            CSSExtract
        ],
        devtool: isProduction ? "source-map" : "inline-source-map",
        devServer: {
            contentBase: path.join(__dirname, "public"),
            historyApiFallback: true,
            publicPath: "/dist/"
        }
    }
}


