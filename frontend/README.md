# Front-end
## 🛠️ 기술 스택 (Tech Spec)
- Core: React 19
- Language: TypeScript (Strict)
- Build Tool: Webpack 5
- Routing: React Router v6 (createBrowserRouter)

## 환경 설정 (Config) 사용법
1. npm 스크립트에서 주입하는 BUILD_ENV 변수를 사용한다.
2. .env.[BUILD_ENV] 파일을 읽어 처리한다.
```
WEBPACK_BUILD_MODE="development"
WEBPACK_DEV_SERVER_PORT=3001

SERVER_URL="http://localhost:8080"
```
3. WEBPACK_BUILD_MODE의 값에 따라 번들링 옵션이 변경된다.
```typescript

if (envConfig.webpackBuildMode === "development") {
    config.devServer = {
        port: envConfig.devServerPort,
        hot: true,
        historyApiFallback: true,
    };
} else if (envConfig.webpackBuildMode === "production") {
    config.optimization = {
        minimize: true,
        minimizer: [
            new TerserPlugin(),
            new CssMinimizerPlugin(),
        ]
    };

    config.plugins?.push(
        new WebpackObfuscator(
            {
                rotate: true,
                selfDefending: true,
                stringArray: true,
                stringArrayThreshold: 0.75
            },
            [ "excluded_bundle_name.js" ],
        ),
        new MiniCssExtractPlugin({
            filename: "[name].[contenthash].css"
        }),
        new BundleAnalyzerPlugin({
            analyzerMode: "static",
            openAnalyzer: false,
            reportFilename: "build-report.html",
        }),
        new CompressionPlugin({
            algorithm: "gzip",
            test: /\.(js|css|html|svg)$/,
            threshold: 10240,
            minRatio: 0.8,
        }),
    );
}
```