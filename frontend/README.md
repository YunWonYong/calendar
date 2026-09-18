# Front-end

## 🛠️ 기술 스택 (Tech Spec)

| Category   | Technology          |
| ---------- | ------------------- |
| Core       | React               |
| Language   | TypeScript (Strict) |
| Build Tool | Webpack 5           |
| Routing    | React Router DOM    |

---

## ⚙️ 환경 설정 (Config)

프로젝트 실행 환경에 따라 `BUILD_ENV` 환경 변수를 주입하고, 해당 환경의 `.env.[BUILD_ENV]` 파일을 읽어 Webpack 설정을 구성한다.

### 1. `BUILD_ENV`

npm script에서 `BUILD_ENV`를 지정한다.

예:

```bash
npm run start:local
```

위 명령은 다음과 같은 흐름으로 동작한다.

```text
BUILD_ENV=local
    ↓
.env.local
    ↓
Webpack 환경 설정
```

Production 환경의 경우 별도의 build script를 통해 해당 환경을 지정한다.

---

### 2. `.env.[BUILD_ENV]`

환경별 설정 파일에는 Webpack에서 사용할 환경 설정을 정의한다.

예:

```env
WEBPACK_BUILD_MODE="development"
WEBPACK_DEV_SERVER_PORT=3001

# DEBUG(1), LOG(2), WARN(3), ERROR(4), NONE(5)
LOG_LEVEL=1
SERVER_URL="http://localhost:8080"
```

환경별로 다음과 같이 구성할 수 있다.

```text
.env.local
.env.live
```

실제로 어떤 파일을 사용할지는 `BUILD_ENV` 값에 따라 결정된다.

---

### 3. `WEBPACK_BUILD_MODE`

`WEBPACK_BUILD_MODE` 값에 따라 Webpack의 개발/배포 설정을 구분한다.

#### Development

`development` 환경에서는 Webpack Dev Server를 사용한다.

주요 설정:

* Development Server
* Hot Reload
* History API Fallback
* 환경별 개발 서버 Port

```typescript
if (envConfig.webpackBuildMode === "development") {
    config.devServer = {
        port: envConfig.devServerPort,
        hot: true,
        historyApiFallback: true,
    };
}
```

#### Production

`production` 환경에서는 배포용 번들을 생성한다.

주요 작업:

* JavaScript Minification
* CSS Minification
* JavaScript Obfuscation
* CSS 파일 분리
* Bundle 분석 리포트 생성
* Gzip 압축

```typescript
if (envConfig.webpackBuildMode === "production") {
    config.optimization = {
        minimize: true,
        minimizer: [
            new TerserPlugin(),
            new CssMinimizerPlugin(),
        ]
    };

    // Production plugins
}
```

---

## 📦 Production Webpack Plugins

### TerserPlugin

JavaScript 파일을 압축 및 최적화한다.

### CssMinimizerPlugin

CSS 파일을 압축 및 최적화한다.

### WebpackObfuscator

Production JavaScript 번들에 대한 난독화를 수행한다.

주요 설정:

```typescript
new WebpackObfuscator(
    {
        rotate: true,
        selfDefending: true,
        stringArray: true,
        stringArrayThreshold: 0.75
    },
    [
        "excluded_bundle_name.js"
    ],
)
```

특정 번들은 난독화 대상에서 제외할 수 있다.

### MiniCssExtractPlugin

Production 환경에서 CSS를 별도의 파일로 추출한다.

```typescript
new MiniCssExtractPlugin({
    filename: "[name].[contenthash].css"
})
```

`contenthash`를 사용하여 CSS 변경 시 파일명이 변경되도록 한다.

### BundleAnalyzerPlugin

Production 빌드 결과를 분석하기 위한 HTML 리포트를 생성한다.

```typescript
new BundleAnalyzerPlugin({
    analyzerMode: "static",
    openAnalyzer: false,
    reportFilename: "build-report.html",
})
```

### CompressionPlugin

Production 정적 파일을 Gzip으로 압축한다.

```typescript
new CompressionPlugin({
    algorithm: "gzip",
    test: /\.?(js|css|html|svg)$/,
    threshold: 10240,
    minRatio: 0.8,
})
```

---

## 📚 개발 환경 및 Dependency 관리

Node.js, npm 및 프로젝트 dependency의 버전 관리 방법은 별도의 문서에서 관리한다.

👉 [NPM 버전 및 Dependency 관리](./NPM_README.md)
