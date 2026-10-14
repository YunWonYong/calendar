package io.github.hswy.calendar.plan.benefit;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;

@Embeddable 
@AllArgsConstructor(access = AccessLevel.PACKAGE)
@Getter 
@EqualsAndHashCode
@Builder 
class PlanBenefitPK {
    @Column(
        name = "plan_id",
        nullable = false,
        insertable = true,
        updatable = false
    )
    private Long planId;

    @Column(
        name = "version_no",
        nullable = false,
        insertable = true,
        updatable = false
    )
    private Long versionNo;

    @Enumerated(value = EnumType.STRING)
    @Column(
        name = "benefit_name",
        nullable = false,
        insertable = true,
        updatable = false
    )
    private PlanBenefitNames benefitName;
}
