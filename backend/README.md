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
