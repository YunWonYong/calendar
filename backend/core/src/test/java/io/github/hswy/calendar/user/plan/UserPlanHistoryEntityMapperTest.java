package io.github.hswy.calendar.user.plan;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import org.junit.jupiter.api.Test;
import org.mapstruct.factory.Mappers;

import io.github.hswy.calendar.plan.enums.PlanType;

class UserPlanHistoryEntityMapperTest {
    private final UserPlanHistoryEntityMapper mapper = 
        Mappers.getMapper(UserPlanHistoryEntityMapper.class); 
    
    @Test 
    void mapsUserPlanFields() { 
        UserPlanEntity entity = UserPlanEntity
            .builder()
                .userId(1L)
                .planId(PlanType.FREE.getPlanId())
                .purchaseId(100L)
            .build(); 
        UserPlanHistoryEntity history = mapper.of(entity); 

        assertNotNull(history); 
        assertEquals(history.getUserId(), entity.getUserId(), "userId"); 
        assertEquals(history.getPlanId(), entity.getPlanId(), "planId"); 
        assertEquals(history.getPurchaseId(), entity.getPurchaseId(), "purchaseId"); 
    } 
    
    @Test 
    void ignoresHistoryFields() { 
        UserPlanEntity entity = UserPlanEntity 
            .builder() 
                .userId(1L) 
                .planId(PlanType.FREE.getPlanId()) 
                .purchaseId(100L) 
            .build(); 
        UserPlanHistoryEntity history = mapper.of(entity); 
        assertNull(history.getSeq());
        assertNull(history.getCreatedAt());
        assertNull(history.getReason());
    }

    @Test 
    void mapsNullPurchaseId() { 
        UserPlanEntity entity = UserPlanEntity 
            .builder() 
                .userId(1L) 
                .planId(PlanType.FREE.getPlanId()) 
                .purchaseId(null) 
            .build(); 
        UserPlanHistoryEntity history = mapper.of(entity); 
        assertEquals(history.getUserId(), entity.getUserId(), "userId");
        assertEquals(history.getPlanId(), entity.getPlanId(), "planId");
        assertNull(history.getPurchaseId(), "purchaseId"); 
    }    
}
