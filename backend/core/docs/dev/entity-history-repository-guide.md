# JPA Entity History Management Pattern Guide

본 문서는 원장(Ledger) 엔티티의 변경 이력(History/Snapshot)을 관리할 때 적용할 수 있는 설계 패턴과 각 방식의 장단점 및 선택 기준을 정리한 가이드입니다.

---

## 1. 개요 및 핵심 과제

금융, 결제, 정기구독과 같은 핵심 도메인에서는 데이터의 변경 이력 추적이 필수적입니다.

히스토리 관리 시 고려해야 할 핵심 요소는 다음과 같습니다.

1. **원장 데이터와 히스토리 데이터의 정합성 (Transactional Consistency)**
2. **개발자의 히스토리 누락 실수 방지 (Safety)**
3. **변경 원인(Reason), 요청자, IP 등 맥락(Context) 데이터의 저장 가능 여부**
4. **Entity의 상태 변경과 DML 수행 책임의 분리**
5. **Service에서 직접 Entity를 변경하거나 DML을 수행하는 것을 방지하는 구조**

---

## 2. 주요 패턴 비교

### 패턴 A. Custom Repository Fragment 방식

Repository의 Custom Fragment 구현체 내부에서 **원장 수정**과 **히스토리 INSERT**를 하나의 메서드로 묶어서 명시적으로 처리하는 방식입니다.

#### 장점

* **변경 사유(Reason) 및 맥락 전달 용이:** 메서드 파라미터로 `reason`, `updatedBy` 등을 전달받아 히스토리에 포함하기 매우 명확합니다.
* **히스토리 저장 누락 방지:** Repository 수준에서 원장 수정 시 히스토리가 함께 기록되도록 강제할 수 있습니다.

#### 단점

* **보일러플레이트 코드 증가:** 수정 유스케이스가 추가될 때마다 Custom Fragment 인터페이스와 Impl 구현체에 `changeXxx` 메서드를 추가해야 합니다.
* **JPA 변경 감지 활용도가 낮아질 수 있음:** Entity의 상태 변경을 위해 매번 명시적인 Repository 메서드를 호출해야 하는 구조가 될 수 있습니다.

---

### 패턴 B. JPA `@EntityListeners` 방식

JPA 영속성 컨텍스트의 생명주기 이벤트(`@PostPersist`, `@PostUpdate`)를 감지하여 엔티티 변경 시 자동으로 히스토리를 저장하는 방식입니다.

#### 장점

* **자동화:** 엔티티에 `@EntityListeners`를 지정하면 서비스 로직에서 히스토리 저장을 직접 처리하지 않아도 됩니다.
* **코드 간결성:** 별도의 Repository 메서드나 반복적인 History 저장 코드를 줄일 수 있습니다.

#### 단점

* **변경 사유(Reason) 전달의 한계:** JPA Callback은 일반적인 비즈니스 메서드처럼 일회성 비즈니스 맥락을 전달받기 어렵습니다.
* **비즈니스 로직과 Persistence Lifecycle의 결합:** 단순한 Entity 변경이 History 저장이라는 부수 작업을 암묵적으로 발생시키게 됩니다.
* **변경 의도를 파악하기 어려움:** 코드만 읽었을 때 어느 변경이 어떤 History를 생성하는지 명시적으로 드러나지 않을 수 있습니다.

---

### 패턴 C. Spring Event (`ApplicationEventPublisher`) 기반 디커플링

원장 수정 후 **변경 이벤트**를 발행하고, 이벤트 리스너가 이를 수신하여 히스토리를 저장하는 방식입니다.

#### 장점

* **변경 사유 및 Context 전달 용이**
* 원장 변경과 History 저장 로직의 결합도를 낮출 수 있음
* 여러 Listener가 동일한 변경 이벤트를 활용할 수 있음
* `@TransactionalEventListener`를 사용하면 Transaction Lifecycle과 연계 가능

#### 주의사항

History가 원장 데이터와 **반드시 동일 Transaction에서 저장되어야 하는 핵심 데이터**라면 이벤트를 단순한 비동기 이벤트처럼 사용해서는 안 됩니다.

특히 `@Async` 이벤트나 별도 메시지 브로커를 사용하면 원장 변경과 History 저장이 서로 다른 Transaction이 될 수 있습니다.

따라서 강한 정합성이 필요한 원장 History라면 동기적인 처리 또는 동일 Transaction 내 처리를 명확하게 보장해야 합니다.

---

### 패턴 D. AOP (관점 지향 프로그래밍) 기반 커스텀 어노테이션

메서드 실행 시점의 파라미터와 결과를 가로채 History를 자동으로 저장하는 방식입니다.

#### 장점

* Service의 비즈니스 로직을 간결하게 유지할 수 있음
* 반복적인 History 저장 코드를 제거할 수 있음
* Annotation을 통해 History 기록 대상 메서드를 명시할 수 있음

#### 단점

* History 저장이라는 중요한 동작이 코드 흐름에 명시적으로 드러나지 않을 수 있음
* 메서드 파라미터나 반환값에 대한 의존성이 커질 수 있음
* 여러 도메인에 적용할 경우 Aspect가 지나치게 많은 책임을 갖게 될 가능성이 있음
* 디버깅 시 실제 History 저장 호출 위치를 추적하기 어려울 수 있음

---

## 3. 패턴 E. Processor 기반 Entity 변경 및 DML 관리

Entity의 상태 변경과 DML 수행을 `Processor`에 집중시키고, Repository는 **조회 전용(Read Only)** 으로 사용하는 방식입니다.

이 패턴에서는 각 계층의 책임을 다음과 같이 명확하게 분리합니다.

```text
Service
 ├── Transaction Boundary
 ├── Business Workflow
 ├── 외부 시스템 호출
 ├── Notification
 └── Processor 호출

Processor
 ├── Entity 상태 변경
 ├── 신규 Entity persist
 ├── History persist
 └── 변경에 필요한 DML

Entity
 ├── 자신의 상태 보유
 ├── Setter 캡슐화
 └── 자신의 상태 변경 규칙 및 불변식 관리

Repository
 └── Read Only Query
```

### 3.1 Entity Setter 캡슐화

Entity의 상태를 외부에서 직접 변경하지 못하도록 일반적인 `public setter`를 제공하지 않습니다.

예를 들어 다음과 같이 작성합니다.

```java
@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class UserPlanPurchaseEntity {

    private boolean isAutoPurchase;

    private UserPlanPurchaseStatus purchaseStatus;

    void changeAutoPurchase(boolean isAutoPurchase) {
        this.isAutoPurchase = isAutoPurchase;
        this.purchaseStatus = getNextPurchaseStatus(isAutoPurchase);
    }

    void changePurchaseStatus(UserPlanPurchaseStatus status) {
        this.purchaseStatus = status;
    }
}
```

Entity는 단순히 값을 변경하는 것이 아니라 **자신의 상태 변경 규칙을 직접 관리**합니다.

따라서 다음과 같은 형태를 방지할 수 있습니다.

```java
entity.setAutoPurchase(true);
entity.setPurchaseStatus(ACTIVE);
```

대신:

```java
entity.changeAutoPurchase(true);
```

와 같이 의미가 있는 상태 변경 메서드를 사용합니다.

이를 통해 Entity 내부에서 상태 전이 규칙과 불변식을 유지할 수 있습니다.

---

### 3.2 Repository Read Only

Repository는 Spring Data의 `Repository` 인터페이스를 사용하여 필요한 조회 메서드만 노출합니다.

```java
public interface UserPlanPurchaseRepository
    extends Repository<UserPlanPurchaseEntity, Long> {

    List<UserPlanPurchaseEntity> findAllByUserId(Long userId);

    Optional<UserPlanPurchaseEntity> findByUserIdAndPurchaseId(
        Long userId,
        Long purchaseId
    );
}
```

`JpaRepository`를 직접 상속하지 않기 때문에 `save()`, `delete()`, `flush()` 등의 DML 관련 API를 Repository 외부에 노출하지 않을 수 있습니다.

따라서 Repository의 역할을 다음과 같이 제한할 수 있습니다.

> **Repository는 데이터를 조회한다.**

---

### 3.3 Processor에서 DML 수행

Entity 변경과 DML은 Processor가 담당합니다.

```java
@Component
@RequiredArgsConstructor
public class UserPlanPurchaseProcessor {

    private final EntityManager em;

    @RequireTransaction
    public UserPlanPurchaseEntity createUserPlanPurchase(
        UserPlanPurchaseEntity entity
    ) {
        em.persist(entity);
        insertHistory(entity);
        return entity;
    }

    @RequireTransaction
    public UserPlanPurchaseEntity changeAutoPurchase(
        UserPlanPurchaseEntity entity,
        boolean isAutoPurchase
    ) {
        entity.changeAutoPurchase(isAutoPurchase);
        insertHistory(entity);
        return entity;
    }

    @RequireTransaction
    public UserPlanPurchaseEntity changePurchaseStatus(
        UserPlanPurchaseEntity entity,
        UserPlanPurchaseStatus status
    ) {
        entity.changePurchaseStatus(status);
        insertHistory(entity);
        return entity;
    }

    private void insertHistory(UserPlanPurchaseEntity entity) {
        em.persist(new UserPlanPurchaseHistoryEntity().form(entity));
    }
}
```

기존 Entity의 경우 Transaction 안에서 Repository를 통해 조회된 Entity가 영속 상태라면 별도의 `save()` 호출 없이 JPA Dirty Checking을 통해 UPDATE가 수행됩니다.

```text
Transaction 시작
    ↓
Repository 조회
    ↓
Managed Entity
    ↓
Processor
    ↓
Entity 상태 변경
    ↓
History persist
    ↓
Transaction Commit
    ↓
Dirty Checking → 원장 UPDATE
History → INSERT
```

따라서 Processor에서 모든 UPDATE를 명시적인 `save()`로 처리할 필요는 없습니다.

---

### 3.4 Transaction Boundary와 Processor의 책임 분리

Processor는 Transaction을 생성하지 않습니다.

Transaction Boundary는 Service가 담당합니다.

```java
@Service
@RequiredArgsConstructor
public class UserPlanPurchaseService {

    private final UserPlanPurchaseRepository repository;
    private final UserPlanPurchaseProcessor processor;

    @Transactional
    public void changeAutoPurchase(
        Long userId,
        Long purchaseId,
        boolean isAutoPurchase
    ) {
        UserPlanPurchaseEntity entity =
            repository.findByUserIdAndPurchaseId(userId, purchaseId)
                .orElseThrow();

        processor.changeAutoPurchase(entity, isAutoPurchase);
    }
}
```

Processor는 이미 시작된 Transaction 내부에서만 동작하도록 제한할 수 있습니다.

```java
@RequireTransaction
public UserPlanPurchaseEntity changeAutoPurchase(...) {
    ...
}
```

이를 통해 다음과 같은 책임 분리가 가능합니다.

| 계층             | 책임                                          |
| -------------- | ------------------------------------------- |
| Service        | Transaction Boundary, 업무 흐름, 외부 Side Effect |
| Processor      | Entity 변경, DML, History 저장                  |
| Entity         | 상태 및 상태 전이 규칙                               |
| Repository     | 조회                                          |
| History Entity | 변경 당시 Snapshot 표현                           |

---

### 3.5 장점

#### 1. DML 책임 명확화

Service에서 직접 `save()`나 `persist()`를 호출하지 않도록 하여 변경 작업의 진입점을 Processor로 제한할 수 있습니다.

#### 2. History 누락 방지

특정 상태 변경과 History 저장이 하나의 Processor 메서드에 함께 존재하므로 다음과 같은 실수를 줄일 수 있습니다.

```java
entity.changeAutoPurchase(true);
// History 저장 누락
```

대신:

```java
processor.changeAutoPurchase(entity, true);
```

하나의 작업으로 묶을 수 있습니다.

#### 3. Repository의 역할 단순화

Repository는 조회에만 집중할 수 있습니다.

```text
Repository → Read
Processor  → Write
```

#### 4. Entity 캡슐화 강화

Entity의 `setter`를 외부에 공개하지 않고 의미 있는 상태 변경 메서드를 제공함으로써 상태 전이 규칙을 Entity 내부에 둘 수 있습니다.

#### 5. Dirty Checking 활용

기존 Managed Entity의 수정에는 별도의 `save()` 호출 없이 JPA Dirty Checking을 활용할 수 있습니다.

---

### 3.6 단점 및 주의사항

#### 1. Processor가 지나치게 커질 수 있음

모든 DML을 하나의 Processor에 몰아넣으면 Processor가 거대한 Persistence Service처럼 변할 수 있습니다.

따라서 도메인 단위로 Processor를 분리하는 것이 좋습니다.

```text
user
 └── plan
      └── purchase
           └── UserPlanPurchaseProcessor
```

#### 2. 모든 변경을 Processor 메서드로 만들어야 할 수 있음

다음과 같은 메서드가 계속 증가할 수 있습니다.

```text
changeAutoPurchase()
changePeriodDates()
changePurchaseStatus()
changeCard()
...
```

다만 각 메서드가 실제 비즈니스 상태 변경을 명확하게 표현한다는 장점도 있습니다.

#### 3. Entity 변경 메서드의 접근 범위 관리 필요

Entity의 변경 메서드를 `public`으로 열어두면 Service나 다른 객체에서 직접 변경할 수 있습니다.

가능하다면 Package-private 접근 제한을 사용하여 Processor와 Entity의 패키지 구조를 함께 설계하는 것이 좋습니다.

#### 4. History Context가 필요한 경우 추가 설계 필요

단순 Snapshot만 저장한다면 Processor에서 Entity를 복제하여 저장하는 방식으로 충분합니다.

하지만 다음과 같은 데이터가 필요하다면:

```text
reason
updatedBy
requestId
ipAddress
source
```

Processor 메서드에 명시적으로 전달하는 방식을 고려할 수 있습니다.

```java
processor.changeAutoPurchase(
    entity,
    true,
    reason,
    updatedBy
);
```

이 경우 History 저장에 필요한 Context가 명시적으로 표현되므로 Spring Event나 AOP보다 흐름을 추적하기 쉬운 장점이 있습니다.

---

## 4. 패턴별 비교

| 패턴                             | Reason 기록 | 유지보수성 | History 누락 방지 | 변경 흐름 명시성 | 특징                              |
| :----------------------------- | :-------: | :---: | :-----------: | :-------: | :------------------------------ |
| **Custom Repository Fragment** |     ⭕     |   보통  |       ⭕       |     ⭕     | Repository에서 변경과 History를 함께 처리 |
| **JPA EntityListeners**        |     △     |   높음  |       ⭕       |     ❌     | 단순 Snapshot 자동 기록에 적합           |
| **Spring Event**               |     ⭕     |   높음  |       △       |     △     | 변경 이벤트와 History를 분리             |
| **AOP**                        |     ⭕     |   높음  |       △       |     ❌     | 반복적인 History 처리 자동화             |
| **Processor**                  |     ⭕     |   높음  |       ⭕       |     ⭕     | Entity 변경과 DML을 명시적으로 집중        |

---

## 5. 선택 기준

### 단순 Snapshot 자동 기록

변경 사유나 요청 Context가 필요하지 않고 모든 Entity 변경을 동일한 방식으로 기록해야 한다면:

> **JPA `@EntityListeners`**

를 고려할 수 있습니다.

---

### 이벤트 기반으로 History를 분리해야 하는 경우

History 저장 외에도 여러 시스템이 동일한 변경 이벤트를 구독해야 하거나 도메인 간 결합을 낮추는 것이 중요한 경우:

> **Spring Event**

를 고려할 수 있습니다.

단, 원장과 History의 강한 Transactional Consistency가 필요하다면 비동기 이벤트 처리와 동일 Transaction 처리를 구분해야 합니다.

---

### 명시적인 변경 흐름과 강한 캡슐화가 필요한 경우

다음 조건이 중요하다면:

* Entity Setter를 외부에 노출하고 싶지 않음
* Repository를 Read Only로 유지하고 싶음
* Service에서 직접 DML을 수행하지 않게 하고 싶음
* Entity의 상태 변경 규칙을 Entity 내부에 유지하고 싶음
* 원장 변경과 History 저장을 하나의 작업으로 묶고 싶음
* Transaction Boundary는 Service가 유지해야 함

> **Processor 기반 패턴**

을 사용할 수 있습니다.

이 구조에서는 다음과 같은 책임 경계를 유지합니다.

```text
┌──────────────────────────────────────┐
│ Service                              │
│                                      │
│ Transaction Boundary                │
│ Business Workflow                   │
│ External Side Effects               │
└────────────────┬─────────────────────┘
                 │
                 ▼
┌──────────────────────────────────────┐
│ Processor                            │
│                                      │
│ Entity State Change                 │
│ DML                                 │
│ History Snapshot                    │
└────────────────┬─────────────────────┘
                 │
          ┌──────┴──────┐
          ▼             ▼
┌────────────────┐  ┌────────────────┐
│ Entity         │  │ EntityManager  │
│                │  │                │
│ State Rule     │  │ INSERT / DML   │
│ Invariant      │  │                │
└────────────────┘  └────────────────┘

Repository
    │
    └── Read Only
```

---

## 6. 최종 정리

History 관리에는 하나의 정답이 있는 것이 아니라 **History의 성격과 Transaction 요구사항에 따라 패턴을 선택해야 합니다.**

특히 원장 데이터와 History가 반드시 동일 Transaction에서 기록되어야 하고, Entity의 상태 변경 규칙과 Persistence 작업을 명확하게 분리하고 싶다면 다음 구조를 사용할 수 있습니다.

```text
Service
  ↓
@Transactional
  ↓
Repository
  └── Read Only

Processor
  ├── Entity 변경
  ├── 신규 Entity persist
  └── History persist

Entity
  └── 상태 변경 규칙 / 불변식
```

핵심 원칙은 다음과 같습니다.

> **Transaction Boundary는 Service가 담당한다.**

> **Repository는 Read Only로 제한한다.**

> **Entity는 자신의 상태와 상태 변경 규칙을 캡슐화한다.**

> **Processor는 이미 시작된 Transaction 안에서 Entity 변경과 DML, History 저장을 담당한다.**

이렇게 하면 Service가 Persistence 세부 구현에 직접 의존하는 것을 줄이면서도, JPA Dirty Checking을 활용하고 History 누락 가능성을 낮출 수 있습니다.
