package io.github.hswy.calendar.group;

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
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity 
@Table(
    name = "group_history"
)
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter 
class GroupHistoryEntity extends CreatedAtEntity {
    
    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column (
        name = "seq",
        nullable = false,
        updatable = false,
        insertable = false
    )
    private Long seq;
    
    @Column (
        name = "group_id",
        nullable = false,
        updatable = false,
        insertable = true
    )
    private Long groupId;
    
    @Column (
        name = "group_leader_id",
        nullable = false,
        updatable = false,
        insertable = true
    )
    private Long groupLeaderId;

    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(
        name = "group_status",
        nullable = false,
        updatable = false,
        insertable = true
    )
    @Setter 
    private GroupStatus groupStatus;

    @Column(
        name = "group_full_name",
        nullable = false,
        updatable = false,
        insertable = true,
        length = 100
    )
    private String groupFullName;

    @Column(
        name = "group_short_name",
        nullable = false,
        updatable = false,
        insertable = true,
        length = 50
    )
    private String groupShortName;

    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(
        name = "group_emblem_type",
        nullable = false,
        updatable = false,
        insertable = true,
        length = 10
    )
    private GroupEmblemType groupEmblemType;

    @Column(
        name = "group_emblem_id",
        nullable = false,
        updatable = false,
        insertable = true
    )
    private String groupEmblemId;

    @Column(
        name = "member_limit_count",
        nullable = false,
        updatable = false,
        insertable = true
    )
    private int memberLimitCount;

    @Column(
        name = "assistant_limit_count",
        nullable = false,
        updatable = false,
        insertable = true
    )
    private int assistantLimitCount;
}
