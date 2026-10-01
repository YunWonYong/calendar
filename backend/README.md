# 개발 환경
- **OS**: Windows 11 + WSL2 Ubuntu 24.04 LTS
- **개발언어**: Java 21.0.11
- **프레임워크**: Spring Boot 3.2.8
- **빌드툴**: Gradle Wrapper (Gradle 8.14.4)
- **컨테이너**: Docker Engine 29.6.0, Docker Compose v5.1.4
- **버전관리툴**: Git
## wsl2 설치
1. powershell을 관리자 권한으로 실행.
2. wsl 설치 및 버전 설정.
```shell
wsl --update
wsl --set-default-version 2

## Ubuntu 24.04 버전으로 설치.
## 설치 완료 후 사용자 설정 입력 프롬프트 나오면 알맞게 입력.
wsl --install -d Ubuntu-24.04

## 설치한 Ubuntu에 접속.
wsl -d Ubuntu-24.04
```
3. wsl 설치 시 오류 나거나 설정이 꼬였을 경우.
```powershell
## 관리자 권한으로 powershell 실행.
wsl --shutdown

dism /online /disable-feature /featurename:Microsoft-Windows-Subsystem-Linux /norestart

dism /online /disable-feature /featurename:VirtualMachinePlatform /norestart
## 여기까지 입력 후 컴퓨터 재부팅 추천.

dism /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart

dism /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart
## 여기까지 입력 후 컴퓨터 재부팅 추천.

## 주의: Ubuntu 환경 및 내부 데이터가 삭제됩니다.
wsl --unregister Ubuntu-24.04

wsl --update
wsl --install -d Ubuntu-24.04
```
4. Ubuntu가 제대로 설치 됐고 접속한 후.
```shell
sudo apt update
```
## Java 설치 및 환경변수 설정
1. Java 21 버전 설치.
```shell
sudo apt install -y openjdk-21-jdk
```
2. JAVA_HOME 환경변수 설정.
```shell
## 파일이 없더라도 만들어짐.
vi ~/.profile

## 에디터 환경에서 맨 밑 줄에 아래 내용 추가.
export JAVA_HOME="/usr/lib/jvm/java-21-openjdk-amd64"
## 에디터 환경에서 저장 후 콘솔로 나가겠다는 의미.
:wq

## 수정 내용 저장.
source ~/.profile

## JAVA_HOME 변수가 제대로 설정됐는지 확인.
## 출력 내용이 같으면 제대로 설정된 것.
echo $JAVA_HOME
dirname $(dirname $(readlink -f $(which java)))

## 프로젝트에서 ./gradlew --version 명령어로 한번 더 확인.
## 아래는 출력 예시
Build time:    2026-01-23 16:30:23 UTC
Revision:      ad5ff774b4b0e9a8a0cf1a14ca70d7230003c3ad

Kotlin:        2.0.21
Groovy:        3.0.25
Ant:           Apache Ant(TM) version 1.10.15 compiled on August 25 2024
Launcher JVM:  21.0.11 (Ubuntu 21.0.11+10-1-24.04.2-Ubuntu)
Daemon JVM:    /usr/lib/jvm/java-21-openjdk-amd64 (no JDK specified, using current Java home)
OS:            Linux 6.18.33.1-microsoft-standard-WSL2 amd64
```
## Docker 설치
1. Docker 다운로드 환경 구성.
```shell
## docker.asc 파일이 있는지 확인.
ls -ld /etc/apt/keyrings
## 없는 경우 아래 명령어 실행.
    ## /etc/apt/keyrings 폴더도 없을 때.
    sudo install -m 0755 -d /etc/apt/keyrings
    ## docker.asc 파일 다운로드.
    sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc

## docker.asc 파일 권한 설정.
sudo chmod a+r /etc/apt/keyrings/docker.asc

## docker.list 파일 확인.
ls /etc/apt/sources.list.d/docker.list
    ## /etc/apt/sources.list.d/docker.list 파일이 없는 경우 아래 명령어 실행.
    echo "deb [arch=$(dpkg --print-architecture) \
   signed-by=/etc/apt/keyrings/docker.asc] \
   https://download.docker.com/linux/ubuntu \
   $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
## apt install할 때 느리거나 멈추면 각각 별도로 install.
    sudo apt install docker-ce -y
    sudo apt install docker-ce-cli -y
    sudo apt install containerd.io -y
    sudo apt install docker-buildx-plugin -y
    sudo apt install docker-compose-plugin -y

## 제대로 설치 됐는지 확인.
docker --version
docker compose version
docker run hello-world

## 선택사항.
## ubuntu에 로그인한 사용자에게 docker 그룹을 추가해 sudo 명령어 없이 실행할 수 있도록 권한 처리.
sudo usermod -aG docker $USER
## 설정 후 wsl 재시작 필수.
```
## 2. 프로젝트 설명

Calendar Backend는 기능별 실행 환경을 분리할 수 있도록 멀티 모듈로 구성한다.


```text
calendar/
├── core/              # 공통 도메인/애플리케이션/영속성/인증 핵심 로직
├── api/               # HTTP API 및 Spring Boot 실행 애플리케이션
├── batch/             # 향후 추가: 배치 작업 전용 애플리케이션
└── websocket/         # 향후 추가: 실시간 통신 전용 애플리케이션
```


**의존성 방향은 항상 실행 모듈 → core 방향을 유지한다.**
```text
   ┌──────────────┐
   │     core     │
   │              │
   │ domain       │
   │ application  │
   │ persistence  │
   │ auth logic   │
   │ shared       | 
   │ ...          |
   └──────▲───────┘
          │
 ┌────────┼────────┐
 │        │        │
api      batch  websocket
```

## 2.1. 모듈 책임

Calendar Backend는 실행 환경에 따라 `core`, `api`, `batch`, `websocket` 모듈로 분리한다.

각 모듈은 다음과 같은 책임을 가진다.

### core

여러 실행 모듈에서 공통으로 사용하는 Domain 및 영속성 관련 핵심 요소를 관리한다.

* Domain Model 및 Entity
* Enum
* Domain Exception
* Repository
* Cache Name 및 Cache Contract와 같이 실행 모듈에서 공통으로 사용하는 정의

`core`는 특정 실행 환경의 Use Case나 Service를 관리하지 않는다.

또한 `api`, `batch`, `websocket`과 같은 실행 모듈의 구현에 의존하지 않는다.

### api

HTTP API를 제공하는 실행 모듈이다.

* HTTP 요청 및 응답 처리
* Controller
* API DTO
* API Use Case 및 Service
* API에서 필요한 Cache 처리

`api`는 `core`의 Domain 및 Repository 등을 사용하여 API에 필요한 기능을 구현한다.

### batch

배치 작업을 처리하는 실행 모듈이다.

* 정기적인 데이터 처리
* 데이터 상태 변경 및 정리 작업
* Batch Use Case 및 Service
* Batch 작업에서 필요한 Cache 처리

### websocket

실시간 통신을 처리하는 실행 모듈이다.

* WebSocket 연결 및 메시지 처리
* 실시간 통신 관련 Use Case 및 Service
* WebSocket 작업에서 필요한 Cache 처리

---

## 2.2. 패키지 구성 원칙

각 모듈 내부의 패키지는 기술 계층보다 **Domain을 우선하여 구성한다.**

예를 들어 `auth`, `users`와 같이 기능 또는 Domain을 기준으로 패키지를 구분하고, 해당 Domain 내부에서 `model`, `repository`, `exception`, `service`, `controller`, `dto` 등의 역할을 구분한다.

이를 통해 특정 Domain과 관련된 코드가 하나의 패키지 영역에서 관리되도록 한다.

`core`에서는 Domain에 필요한 Model, Repository, Exception 등의 핵심 요소를 관리하고, `api`에서는 동일한 Domain의 Controller, Service, DTO 등을 관리한다.

---

## 2.3. Service 관리 원칙

Service는 실행 모듈에서 관리한다.

`api`, `batch`, `websocket`은 각각 자신의 실행 환경에 필요한 Use Case와 Service를 가진다.

동일한 Domain을 사용하더라도 실행 환경에 따라 필요한 처리 방식이나 Use Case가 다를 수 있으므로, 모든 Service를 `core`에 공통으로 배치하지 않는다.

실제 여러 실행 모듈에서 동일한 Use Case가 필요하고 공통화할 명확한 이유가 발생한 경우에만 별도의 공통 로직으로 추출한다.

실행 모듈 간에는 서로의 Service를 직접 의존하지 않는다.

---

## 2.4. Cache 관리 원칙

Cache의 실제 동작은 각 실행 모듈의 Service에서 관리한다.

Spring Cache의 `@Cacheable`, `@CachePut`, `@CacheEvict` 등은 해당 Cache를 사용하는 실행 모듈에서 적용한다.

예를 들어 API에서 데이터를 조회하여 Cache에 저장하고, Batch에서 해당 데이터를 변경하는 경우 API와 Batch가 각각 자신의 Service에서 Cache 처리를 담당한다.

Cache Name과 Cache Key의 의미 및 타입과 같이 여러 실행 모듈에서 공유해야 하는 Cache Contract는 `core`에서 관리한다.

단, 실제 Cache Key 표현식은 각 Service의 메서드에 맞게 작성한다.

예를 들어 특정 Cache의 Contract가 다음과 같이 정의되어 있다면:

* Cache Name: `user_profiles`
* Key: `Long userId`
* Value: `UserProfileEntity`

각 실행 모듈은 해당 Contract를 준수하여 동일한 Cache Name과 Key 규칙을 사용해야 한다.

`core`는 Cache의 실제 동작이나 Spring Cache Annotation에 의존하지 않으며, 실행 모듈이 공통으로 참조할 수 있는 Cache 정의만 제공한다.

---

## 2.5. 모듈 의존성 원칙

모듈 간 기본 의존 방향은 **실행 모듈 → core**로 유지한다.

```text
api ────────┐
batch ──────┼──→ core
websocket ──┘
```

`core`는 실행 모듈을 의존하지 않는다.

또한 `api`, `batch`, `websocket`은 서로의 Service를 직접 의존하지 않는다.

이를 통해 Domain 및 공통 핵심 요소와 실행 환경에 따른 Application 로직을 분리한다.
