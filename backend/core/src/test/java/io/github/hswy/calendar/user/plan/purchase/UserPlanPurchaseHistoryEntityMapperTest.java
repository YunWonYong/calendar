package io.github.hswy.calendar.user.plan.purchase;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;

import java.time.Instant;

import org.junit.jupiter.api.Test;
import org.mapstruct.factory.Mappers;

class UserPlanPurchaseHistoryEntityMapperTest {

    private final UserPlanPurchaseHistoryEntityMapper mapper =
        Mappers.getMapper(UserPlanPurchaseHistoryEntityMapper.class);

    @Test
    void entityToHistory() {
        Instant periodStartAt = Instant.parse("2026-10-01T00:00:00Z");
        Instant periodEndAt = Instant.parse("2026-11-01T00:00:00Z");

        UserPlanPurchaseEntity entity = UserPlanPurchaseEntity.builder()
            .userId(1L)
            .cardId(2L)
            .purchaseStatus(UserPlanPurchaseStatus.ACTIVE)
            .purchaseCurrency("KRW")
            .purchasePrice(10000L)
            .purchaseDecimals((short) 0)
            .periodStartAt(periodStartAt)
            .periodEndAt(periodEndAt)
            .autoPurchase(true)
            .build();

        UserPlanPurchaseHistoryEntity history = mapper.of(entity);

        assertNull(history.getSeq(), "seq");

        assertEquals(entity.getPurchaseId(), history.getPurchaseId(), "purchaseId");
        assertEquals(entity.getUserId(), history.getUserId(), "userId");
        assertEquals(entity.getCardId(), history.getCardId(), "cardId");
        assertEquals(entity.getPurchaseStatus(), history.getPurchaseStatus(), "purchaseStatus");
        assertEquals(entity.getPurchaseCurrency(), history.getPurchaseCurrency(), "purchaseCurrency");
        assertEquals(entity.getPurchasePrice(), history.getPurchasePrice(), "purchasePrice");
        assertEquals(entity.getPurchaseDecimals(), history.getPurchaseDecimals(), "purchaseDecimals");
        assertEquals(entity.getPeriodStartAt(), history.getPeriodStartAt(), "periodStartAt");
        assertEquals(entity.getPeriodEndAt(), history.getPeriodEndAt(), "periodEndAt");
        assertEquals(entity.isAutoPurchase(), history.isAutoPurchase(), "isAutoPurchase");

        assertNull(history.getCreatedAt(), "createdAt");
    }
}