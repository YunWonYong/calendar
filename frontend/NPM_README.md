# NPM 및 Dependency 관리

프로젝트의 Node.js, npm, dependency 버전을 일관되게 관리하고 개발 환경 차이로 인한 문제를 방지하기 위한 기준을 정리한다.

---

## 1. Node.js 버전 관리

Node.js 버전은 `.nvmrc`를 기준으로 관리한다.

```text
.nvmrc
```

`.nvmrc`에는 프로젝트에서 실제로 사용할 **Node.js 버전 하나를 지정**한다.

```text
Node.js
    ↓
.nvmrc
    ↓
bootstrap.sh
    ↓
NVM
    ↓
지정된 Node.js 환경
```

`.nvmrc`는 Node.js의 **실제 개발 환경 버전**을 결정하는 역할을 한다.

---

## 2. `bootstrap.sh`

프로젝트의 `bootstrap.sh`는 `.nvmrc`를 읽어 개발 환경에서 필요한 Node.js 버전을 자동으로 구성한다.

주요 역할:

1. `.nvmrc`에서 Node.js 버전 확인
2. NVM 설치 여부 확인
3. NVM이 없는 경우 설치
4. 필요한 Node.js 버전이 없는 경우 설치
5. 지정된 Node.js 버전으로 전환
6. 기본 Node.js 버전 설정
7. Node.js / npm 버전 확인

따라서 Node.js 버전을 변경할 경우 `.nvmrc`를 기준으로 변경하고, `bootstrap.sh`는 해당 값을 사용하도록 유지한다.

---

# 3. `package.json`의 `engines`

`engines`는 프로젝트에서 지원하는 Node.js와 npm의 **호환 범위**를 정의한다.

예:

```json
{
    "engines": {
        "node": "Node.js 지원 범위",
        "npm": "npm 지원 범위"
    }
}
```

`engines`는 실제 사용할 버전을 지정하는 `.nvmrc`와 목적이 다르다.

| 설정        | 역할                             |
| --------- | ------------------------------ |
| `.nvmrc`  | 실제 사용할 Node.js 버전              |
| `engines` | 프로젝트가 허용하는 Node.js / npm 버전 범위 |

예를 들어 `.nvmrc`에서 특정 Node.js 버전을 사용하도록 고정하더라도 `engines`에서는 해당 버전 이상부터 특정 Major 버전 미만까지 허용하는 식으로 프로젝트의 호환 범위를 정의할 수 있다.

npm의 `engines`는 Node.js뿐 아니라 npm 버전도 지정할 수 있다. 기본적으로는 advisory 성격이며 `engine-strict` 설정을 통해 엄격하게 적용할 수 있다.

---

# 4. `devEngines`

`devEngines`는 **프로젝트를 개발하는 사람의 환경을 검사하기 위한 설정**이다.

`engines`와 이름은 비슷하지만 목적이 다르다.

```text
engines
→ 프로젝트가 어떤 환경을 지원하는가?

devEngines
→ 현재 개발자가 어떤 환경에서 작업하고 있는가?
```

`devEngines`에서는 다음과 같은 개발 환경을 검사할 수 있다.

* Node.js runtime
* npm package manager
* CPU
* OS
* libc

현재 프로젝트에서는 Node.js와 npm 환경을 검사하도록 구성한다.

```json
{
    "devEngines": {
        "runtime": {
            "name": "node",
            "version": "Node.js 지원 범위",
            "onFail": "error"
        },
        "packageManager": {
            "name": "npm",
            "version": "npm 지원 범위",
            "onFail": "error"
        }
    }
}
```

`onFail`은 환경이 조건을 만족하지 않을 경우 어떻게 처리할지 결정한다.

* `warn`: 경고
* `error`: 오류
* `ignore`: 무시

`devEngines`는 npm의 `install`, `ci`, `run` 실행 전에 개발 환경을 검사한다.

### 주의사항

`devEngines`는 잘못된 버전의 Node.js나 npm을 자동으로 설치하거나 변경하지 않는다.

예를 들어 현재 npm이 프로젝트의 요구 범위와 맞지 않는다면 npm이 해당 환경을 오류로 판단할 뿐, npm 버전을 자동으로 변경해주지는 않는다.

Node.js 환경 변경은 현재 프로젝트의:

```text
NVM
+
.nvmrc
+
bootstrap.sh
```

구조가 담당한다.

---

# 5. `.npmrc`

프로젝트 루트의 `.npmrc`에서는 npm의 engine 검사 동작을 설정한다.

```ini
engine-strict=true
```

`package.json`의 `engines`에 정의된 Node.js / npm 조건을 만족하지 않는 환경을 npm에서 엄격하게 처리하기 위한 설정이다.

즉:

```text
package.json
    ↓
engines
    ↓
지원하는 Node.js / npm 범위 정의
    ↓
.npmrc
    ↓
engine-strict=true
    ↓
engine 조건을 엄격하게 적용
```

---

# 6. Node.js / npm 관리 구조

현재 프로젝트의 환경 관리 구조는 다음과 같다.

```text
.nvmrc
    │
    │ 실제 사용할 Node.js 버전
    ▼
bootstrap.sh
    │
    │ NVM을 이용한 설치 / 전환
    ▼
Node.js
    │
    ├── npm
    │
    └── package.json
          │
          ├── engines
          │     └── 프로젝트 호환 범위
          │
          └── devEngines
                └── 개발 환경 검사

.npmrc
    │
    └── engine-strict=true
          └── engines 조건 엄격 적용

package-lock.json
    │
    └── 실제 dependency tree 및 버전 고정
```

각 설정의 역할을 분리하여 관리한다.

| 파일 / 설정             | 역할                            |
| ------------------- | ----------------------------- |
| `.nvmrc`            | 실제 사용할 Node.js 버전             |
| `bootstrap.sh`      | Node.js 환경 자동 구성              |
| `engines`           | 프로젝트의 Node.js / npm 호환 범위     |
| `devEngines`        | 개발 환경의 Node.js / npm 검사       |
| `.npmrc`            | npm 동작 및 engine 검사 설정         |
| `package-lock.json` | 실제 dependency tree 및 설치 버전 고정 |

---

# 7. Dependency 버전 관리

`package.json`은 dependency의 **허용 버전 범위**를 정의하고, `package-lock.json`은 실제 설치되는 dependency tree를 고정한다.

```text
package.json
    ↓
허용 가능한 dependency 버전 범위

package-lock.json
    ↓
실제로 설치할 dependency tree
```

따라서 `package.json`과 `package-lock.json`은 함께 관리한다.

---

# 8. Dependency 업데이트 확인

현재 설치된 dependency 중 업데이트 가능한 패키지를 확인하려면 다음 명령을 사용한다.

```bash
npm outdated
```

주요 항목은 다음과 같다.

| 항목      | 의미                                            |
| ------- | --------------------------------------------- |
| Current | 현재 설치된 버전                                     |
| Wanted  | 현재 `package.json`의 semver 범위에서 업데이트 가능한 최대 버전 |
| Latest  | npm registry의 최신 `latest` 버전                  |

예:

```text
Package   Current   Wanted   Latest
react     현재버전   업데이트가능버전   최신버전
```

### 업데이트 판단 기준

`Latest`가 존재한다고 해서 무조건 최신 버전으로 업데이트하지 않는다.

```text
Current < Wanted
```

인 경우 현재 `package.json`에서 허용한 범위 안에서 업데이트할 수 있다.

반면:

```text
Wanted < Latest
```

라면 더 높은 버전이 존재하지만 현재 dependency에 선언된 범위를 벗어날 수 있으므로 별도의 검토가 필요하다.

특히 Major 버전이 변경되는 경우 migration guide와 호환성을 확인한 후 업데이트한다.

---

# 9. Dependency 업데이트

## Patch / Minor 업데이트

현재 `package.json`에 정의된 semver 범위 안에서 dependency를 업데이트하려면:

```bash
npm update
```

를 사용한다.

업데이트 후에는 변경된 `package-lock.json`을 확인하고 프로젝트를 검증한다.

---

## Major 업데이트

Major 버전 업데이트는 기존 API, 설정 또는 dependency 간 호환성이 깨질 가능성이 있으므로 별도의 작업으로 관리한다.

예:

```text
현재 Major
    ↓
다음 Major
```

Major 업데이트 시에는 다음 순서로 진행한다.

```text
업데이트 대상 선정
        ↓
공식 changelog / migration guide 확인
        ↓
호환성 확인
        ↓
dependency 업데이트
        ↓
build
        ↓
lint
        ↓
test
        ↓
development server 확인
```

Webpack처럼 여러 dependency가 서로 연결된 경우에는 핵심 dependency를 한 번에 여러 개 Major 업데이트하지 않고 개별적으로 검증하는 것을 권장한다.

---

# 10. npm 버전 업데이트

npm 자체의 버전을 변경하는 경우 dependency 업데이트와 별개의 변경으로 취급한다.

npm 버전 변경 전에는 현재 프로젝트에서 사용하는 dependency가 새로운 npm 환경에서도 정상적으로 설치되는지 확인한다.

특정 npm 버전을 직접 설치하여 현재 환경을 변경하는 대신, 테스트 목적으로 원하는 npm 버전을 임시 실행할 수 있다.

예:

```bash
npx npm@<검증할 버전> ci
```

설치가 정상적으로 수행된 후 다음 항목까지 검증한다.

```text
npm
 ↓
dependency 설치
 ↓
build
 ↓
lint
 ↓
test
 ↓
development server
```

npm 버전 업데이트가 dependency의 API 호환성을 보장하는 것은 아니므로 실제 프로젝트의 build와 test까지 확인해야 한다.

---

# 11. `npm ci`

`npm ci`는 `package-lock.json`을 기준으로 dependency를 깨끗하게 설치할 때 사용한다.

```bash
npm ci
```

주요 특징:

* `package-lock.json` 기준으로 dependency 설치
* 기존 `node_modules` 제거 후 설치
* `package.json`과 `package-lock.json`의 dependency 정보가 일치하지 않으면 오류
* 설치 과정에서 dependency 버전을 임의로 업데이트하지 않음

따라서 CI/CD 환경이나 dependency 변경 후 깨끗한 설치 환경을 검증할 때 적합하다.

```text
package.json
+
package-lock.json
        ↓
     npm ci
        ↓
깨끗한 dependency 설치
        ↓
build / lint / test
```

---

# 12. Dependency 업데이트 검증

Dependency 또는 npm 버전을 변경한 경우 최소한 다음 항목을 검증한다.

```bash
npm ci
npm run build
npm run lint
npm test
```

프로젝트에 development server 동작 검증이 필요한 경우 development server도 실행하여 확인한다.

Webpack 기반 프로젝트에서는 다음과 같은 구성 요소가 서로 연관되어 있으므로 Major 업데이트 시 함께 확인한다.

```text
Webpack
 ├── webpack-cli
 ├── webpack-dev-server
 ├── ts-loader
 ├── esbuild-loader
 └── Webpack plugins
```

---

# 13. 버전 업데이트 원칙

## Node.js

* `.nvmrc`를 실제 개발 환경의 Node.js 버전 기준으로 사용한다.
* Node.js 버전을 변경할 경우 `.nvmrc`를 변경한다.
* `bootstrap.sh`는 `.nvmrc`를 기준으로 동작하도록 유지한다.
* `engines`와 `devEngines`의 Node.js 지원 범위도 함께 검토한다.
* Node.js Major 버전 변경은 별도의 호환성 검토 후 진행한다.

## npm

* `engines`에서 프로젝트가 지원하는 npm 범위를 정의한다.
* `devEngines`에서 실제 개발 환경의 npm 버전을 검사한다.
* npm Major 버전 변경은 별도의 호환성 검토 후 진행한다.
* npm Minor / Patch 업데이트는 dependency 설치 및 프로젝트 검증을 통해 확인한다.
* npm 버전 변경과 dependency 버전 변경을 가능하면 별도의 변경으로 관리한다.

## Dependency

* `npm outdated`로 업데이트 가능 여부를 확인한다.
* `Wanted` 범위의 Patch / Minor 업데이트는 일반적인 유지보수 대상으로 본다.
* `Latest`가 존재한다고 해서 무조건 업데이트하지 않는다.
* Major 업데이트는 migration guide와 changelog를 확인한 후 진행한다.
* 업데이트 후 `package-lock.json` 변경 내용을 확인한다.
* 업데이트 후 build / lint / test를 수행한다.

---

# 14. 핵심 정리

```text
.nvmrc
→ 실제 사용할 Node.js 버전

bootstrap.sh
→ Node.js 개발 환경 자동 구성

engines
→ 프로젝트가 지원하는 Node.js / npm 범위

devEngines
→ 현재 개발 환경의 Node.js / npm 검사

.npmrc
→ npm engine 검사 설정

package.json
→ dependency 버전 범위

package-lock.json
→ 실제 dependency tree 및 버전 고정

npm outdated
→ dependency 업데이트 가능 여부 확인

npm update
→ 현재 semver 범위 내 dependency 업데이트

npm ci
→ package-lock.json 기준의 깨끗한 dependency 설치

Major 업데이트
→ migration guide 확인 후 개별 검증
```

**핵심 원칙은 "최신 버전 = 반드시 업데이트"가 아니다.**

현재 dependency 범위 안에서 안정적으로 업데이트할 수 있는 것은 유지보수하고, Major 버전 변경은 호환성과 변경 내용을 확인한 후 의도적으로 진행한다.