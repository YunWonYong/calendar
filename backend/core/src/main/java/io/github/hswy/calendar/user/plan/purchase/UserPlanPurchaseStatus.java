package io.github.hswy.calendar.user.plan.purchase;

public enum UserPlanPurchaseStatus {
    FREE_TRIAL,                 // 무료 체험 중          
    FREE_TRIAL_PENDING,         // 무료 체험 중인데 결제 취소한 상태.          
    ACTIVE,                     // 정기 구독 이용 중          
    ACTIVE_PENDING,             // 정기 구독 취소한 상태.          
    PURCHASE_LEDGER_FAILED,     // 구독료 결제 실패 상태.          
    CANCELED                    // 완전히 종료 및 해지된 상태
}
