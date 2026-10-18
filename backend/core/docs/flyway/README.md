# Flyway Database Migration

Spring Boot 프로젝트의 PostgreSQL 스키마 변경을 Flyway로 관리한다.

## 1. Migration 파일 관리 원칙

Migration 파일은 **테이블 단위가 아니라 논리적인 DB 변경 작업 단위**로 관리한다.

```text
V1__create_users.sql
V2__create_groups.sql
V3__create_plans.sql
V4__introduce_group_plan.sql
V5__add_user_login_history.sql
```

### 기준

* 하나의 Migration은 하나의 의미 있는 DB 변경을 표현한다.
* 하나의 Migration에서 여러 테이블을 변경할 수 있다.
* 여러 테이블이 하나의 기능 또는 스키마 변경을 구성한다면 하나의 Migration으로 묶을 수 있다.
* 서로 독립적인 변경은 별도의 Migration으로 분리한다.
* Migration을 단순히 테이블별로 나누지 않는다.
* 하나의 Migration에 서로 무관한 여러 기능의 변경을 모두 넣지 않는다.

### 예시

그룹 요금제 도입을 위해 `groups`, `plans`, `users`를 함께 변경해야 한다면:

```text
V10__introduce_group_plan.sql
```

하나로 관리할 수 있다.

반대로 다음 두 변경이 서로 독립적이라면:

```text
V10__introduce_group_plan.sql
V11__add_user_login_history.sql
```

처럼 분리한다.

---

## 2. Migration 버전 관리

Migration 파일은 버전 순서에 따라 실행된다.

```text
V1
V2
V3
V4
...
```

이미 실행된 Migration은 수정하지 않는다.

```text
V10 실행 완료

X V10 파일 수정
O V11 새로운 Migration 생성
```

기존 Migration을 수정하면 Flyway의 checksum 검증에 의해 변경 사실이 감지될 수 있으며, 운영 DB와 코드의 Migration 이력이 달라질 수 있다.

DB 변경이 필요하면 항상 새로운 Migration을 추가한다.

---

## 3. Migration 파일 이름

파일 이름은 변경 목적이 드러나도록 작성한다.

```text
V10__introduce_group_plan.sql
V11__add_user_login_history.sql
V12__add_group_member_indexes.sql
```

다음과 같은 이름은 지양한다.

```text
V10__groups.sql
V11__update.sql
V12__database_change.sql
```

Migration 파일을 나중에 다시 봤을 때 어떤 변경이 있었는지 알 수 있어야 한다.

---

## 4. Local 환경

Local과 Live는 동일한 Migration을 사용한다.

```text
Local PostgreSQL
       |
       v
    Flyway
       |
       v
Migration 실행
```

개발 과정에서 새로운 DB 변경이 필요하면 새로운 Migration을 추가하고 애플리케이션을 실행한다.

Local DB를 초기화해야 하는 경우 DB를 새로 생성한 후 모든 Migration을 처음부터 실행할 수 있다.

Local에서 아직 다른 환경에 배포하지 않은 Migration은 필요에 따라 수정할 수 있다.

단, 해당 Migration이 이미 실행되었거나 다른 개발자 또는 환경에 공유된 이후에는 수정하지 않고 새로운 Migration을 추가한다.

---

## 5. Live 환경

Live 환경에서도 Flyway를 사용한다.

Local에서만 Flyway를 사용하고 Live DB를 직접 수정하지 않는다.

```text
Git
 |
 v
Build
 |
 v
Deploy
 |
 v
Flyway Migration
 |
 v
PostgreSQL
```

Live DB의 스키마 변경은 반드시 Migration을 통해 반영한다.

```text
X 직접 ALTER TABLE 실행

O 새로운 Migration 작성
O 코드와 함께 배포
O Flyway가 Migration 실행
```

이를 통해 Git의 Migration 이력과 실제 DB의 변경 이력을 일치시킨다.

---

## 6. 운영 환경의 Schema 변경

운영 중인 DB는 기존 애플리케이션이 동작하고 있는 상태에서 변경될 수 있으므로 **하위 호환성을 우선적으로 고려한다.**

필요한 경우 다음과 같이 단계적으로 변경한다.

```text
1. 새로운 컬럼/구조 추가
        |
        v
2. 애플리케이션이 새로운 구조를 사용하도록 배포
        |
        v
3. 기존 데이터 변환
        |
        v
4. 기존 구조 제거
```

특히 컬럼 삭제, NOT NULL 변경, 컬럼 이름 변경 등 기존 애플리케이션과 호환되지 않을 수 있는 변경은 한 번에 수행하지 않는다.

---

## 7. 데이터 Migration

Schema 변경과 함께 기존 데이터를 변경해야 하는 경우 Migration에서 데이터를 변환할 수 있다.

예:

```text
Schema 변경
    +
기존 데이터 변환
```

단, 대량의 데이터를 한 번에 변경하는 작업은 운영 DB의 Lock, 실행 시간, 트랜잭션 크기 등을 고려한다.

대규모 데이터 변경은 Schema Migration과 별도의 데이터 Migration으로 분리하는 것을 고려한다.

---

## 8. 여러 테이블을 변경하는 경우

Migration을 나누는 기준은 테이블 개수가 아니다.

다음과 같이 여러 테이블을 하나의 Migration에서 변경할 수 있다.

```text
V20__introduce_subscription.sql

groups
plans
users
user_plan
```

이 변경들이 하나의 논리적인 기능 또는 DB 변경을 구성한다면 하나의 Migration으로 관리한다.

반대로 같은 개발 작업에서 발생했더라도 서로 독립적인 변경이라면 분리한다.

```text
V20__introduce_subscription.sql
V21__add_user_login_history.sql
```

---

## 9. Migration 작성 시 고려사항

Migration은 다음 원칙을 따른다.

* 이미 실행된 Migration을 수정하지 않는다.
* Live DB를 직접 수정하지 않는다.
* DB 변경은 새로운 Migration으로 기록한다.
* Migration 이름만 보고 변경 목적을 이해할 수 있도록 작성한다.
* 서로 강하게 연결된 DB 변경은 하나의 Migration으로 묶을 수 있다.
* 서로 독립적인 변경은 별도의 Migration으로 분리한다.
* 운영 환경에서는 기존 애플리케이션과의 호환성을 고려한다.
* 대규모 데이터 변경은 별도의 전략을 고려한다.
* FK, UNIQUE, INDEX 등의 의존 관계와 실행 순서를 고려한다.
* PostgreSQL ENUM 변경 역시 새로운 Migration으로 관리한다.

---

## 10. 핵심 원칙

Flyway Migration을 나누는 기준은 다음 한 가지를 중심으로 판단한다.

> **"이 변경들이 하나의 논리적인 DB 변경으로 취급되어야 하는가?"**

테이블의 개수나 개발 작업 티켓의 개수가 Migration을 결정하는 기준이 아니다.

Migration은 **DB Schema의 현재 모습을 저장하는 파일이 아니라, 현재 상태까지 DB가 어떻게 변경되어 왔는지를 기록하는 변경 이력**이다.