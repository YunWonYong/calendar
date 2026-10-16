package io.github.hswy.calendar.plan.benefit;

import java.io.Serializable;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AccessLevel;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Embeddable 
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@EqualsAndHashCode
class PlanBenefitPK implements Serializable {
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
