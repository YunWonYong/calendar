package io.github.hswy.calendar.user.plan;

import io.github.hswy.calendar.global.model.CreatedAtEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table (
    name = "user_plan_history"
)
@Getter 
@AllArgsConstructor
class UserPlanHistoryEntity extends CreatedAtEntity {

    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(
        name = "seq",
        nullable = false,
        insertable = false
    )
    private Long seq;

    @Column(
        name = "user_id",
        nullable = false,
        insertable = true
    )
    private Long userId;

    @Column(
        name = "plan_id",
        nullable = false,
        insertable = true
    )
    private Long planId;

    @Column(
        name = "purchase_id",
        nullable = true,
        insertable = true
    )
    private Long purchaseId;

    @Column(
        name = "reason",
        nullable = false,
        insertable = true
    )
    @Setter 
    private String reason;
}
