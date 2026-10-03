package io.github.hswy.calendar.plans.model;

import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import io.github.hswy.calendar.global.model.CreatedAtUpdatedAtEntity;
import io.github.hswy.calendar.plans.enums.PlanType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity 
@Table (
    name = "plans",
    uniqueConstraints = {
        @UniqueConstraint(
            name = "uk_plans_plan_type",
            columnNames = { "plan_type" }
        )
    }
)
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor 
@Builder
public class PlanEntity extends CreatedAtUpdatedAtEntity {
    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(
        name = "plan_id",
        updatable = false
    )
    private Long planId;

    
    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(
        name = "plan_type",
        updatable = false,
        nullable = false
    )
    private PlanType planType;

    @Column(
        name = "plan_price",
        updatable = false,
        nullable = false
    )
    private Long planPrice;

    @Column(
        name = "is_active"
    )
    private boolean isActive;
}
