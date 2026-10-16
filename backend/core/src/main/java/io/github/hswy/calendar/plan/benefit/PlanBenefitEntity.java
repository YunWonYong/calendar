package io.github.hswy.calendar.plan.benefit;

import io.github.hswy.calendar.global.model.CreatedAtUpdatedAtEntity;
import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity 
@Table(
    name = "plan_benefits"
)
@Getter 
@NoArgsConstructor(access = AccessLevel.PROTECTED)
class PlanBenefitEntity extends CreatedAtUpdatedAtEntity {
    @EmbeddedId 
    private PlanBenefitPK pk;

    @Column(
        name = "benefit_value",
        nullable = false,
        insertable = true,
        updatable = false
    )
    private String benefitValue;

    @Enumerated(value = EnumType.STRING)
    @Column(
        name = "benefit_value_type",
        nullable = false,
        insertable = true,
        updatable = false
    )
    private PlanBenefitValueTypes benefitValueType;

    @Column(
        name = "is_view",
        nullable = false,
        insertable = true,
        updatable = false
    )
    private Boolean isView;

    @Column(
        name = "created_by",
        nullable = false,
        insertable = true,
        updatable = false
    )
    private String createdBy;

    @Column(
        name = "updated_by",
        nullable = true,
        insertable = true,
        updatable = false
    )
    private String updatedBy;
}
