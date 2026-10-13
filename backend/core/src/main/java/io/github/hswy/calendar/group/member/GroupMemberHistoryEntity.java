package io.github.hswy.calendar.group.member;

import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import io.github.hswy.calendar.global.model.CreatedAtEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Entity 
@Table(
    name = "group_member_history"
)
@Getter 
@AllArgsConstructor( access = AccessLevel.PROTECTED )
class GroupMemberHistoryEntity extends CreatedAtEntity {
    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(
        name = "seq",
        nullable = false,
        insertable = false
    )
    private Long seq;

    @Column(
        name = "group_id",
        nullable = false,
        insertable = true
    )
    @Setter
    private Long groupId;

    @Column(
        name = "user_id",
        nullable = false,
        insertable = true
    )
    @Setter
    private Long userId;
    
    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(
        name = "member_type",
        nullable = false,
        insertable = true,
        columnDefinition = "group_member_types"
    )
    private GroupMemberType memberType;
    
    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(
        name = "member_status",
        nullable = false,
        insertable = true,
        columnDefinition = "group_member_status"
    )
    private GroupMemberStatus memberStatus;

    @Column(
        name = "order_no",
        nullable = false,
        insertable = true
    )
    private int orderNo;

    @Enumerated(EnumType.STRING)
    @Column(
        name = "reason",
        nullable = false,
        insertable = true
    )
    @Setter
    private GroupMemberHistoryReason reason;
}
