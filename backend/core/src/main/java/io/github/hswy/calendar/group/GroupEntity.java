package io.github.hswy.calendar.group;

import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import io.github.hswy.calendar.global.model.CreatedAtUpdatedAtEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Entity 
@Table(
    name = "groups"
)
@AllArgsConstructor
@Getter 
@Builder 
public class GroupEntity extends CreatedAtUpdatedAtEntity {
    
    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column (
        name = "group_id",
        nullable = false,
        updatable = false,
        insertable = false
    )
    private Long groupId;
    
    @Column (
        name = "group_leader_id",
        nullable = false,
        updatable = true,
        insertable = true
    )
    private Long groupLeaderId;

    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(
        name = "group_status",
        nullable = false,
        updatable = true,
        insertable = false
    )
    @Builder.Default
    private GroupStatus groupStatus = GroupStatus.ACTIVE;

    @Column(
        name = "group_full_name",
        nullable = false,
        updatable = true,
        insertable = true,
        length = 100
    )
    private String groupFullName;

    @Column(
        name = "group_short_name",
        nullable = false,
        updatable = true,
        insertable = true,
        length = 50
    )
    private String groupShortName;

    @Enumerated(EnumType.STRING)
    @Column(
        name = "group_emblem_type",
        nullable = false,
        updatable = true,
        insertable = true,
        length = 10
    )
    private GroupEmblemType groupEmblemType;

    @Column(
        name = "group_emblem_id",
        nullable = false,
        updatable = true,
        insertable = true
    )
    private String groupEmblemId;

    @Column(
        name = "member_limit_count",
        nullable = false,
        updatable = true,
        insertable = true
    )
    private int memberLimitCount;

    @Column(
        name = "assistant_limit_count",
        nullable = false,
        updatable = true,
        insertable = true
    )
    private int assistantLimitCount;
    
    void changeLeaderId(Long groupLeaderId) {
        // [TODO] groupStatus가 inactive일 때만 처리해야 하나?
        this.groupLeaderId = groupLeaderId;
    }

    boolean changeStatus(GroupStatus status) {
        if (this.groupStatus == GroupStatus.DELETED) {
            return false;
        }

        if (this.groupStatus == GroupStatus.ACTIVE) {
            if (status == GroupStatus.INACTIVE || status == GroupStatus.PAST_DUE) {
                // 이 상황은 사용자, 배치, 운영자에 의해 도달할 수 있음.
                this.groupStatus = status;
                return true;
            }
        }

        if (
            this.groupStatus == GroupStatus.PAST_DUE || 
            this.groupStatus == GroupStatus.PENDING_DELETE ||
            this.groupStatus == GroupStatus.INACTIVE
        ) {
            if (status == GroupStatus.ACTIVE) {
                // 이 상황은 사용자의 액션으로만 도달할 수 있음.
                // 1. group을 삭제 요청한 상황에서 기간이 남아있을 때 다시 활성화할 때.
                // 2. group의 leader가 다른 member한테 leader를 양도하고 활성화할 때.
                this.groupStatus = status;
                return true;
            }
        }

        if (
            this.groupStatus == GroupStatus.INACTIVE || 
            this.groupStatus == GroupStatus.PAST_DUE
        ) {
            if (status == GroupStatus.PENDING_DELETE) {
                // 이 상황은 사용자의 액션으로만 도달할 수 있음.
                this.groupStatus = status;
                return true;
            }
        }

        if (this.groupStatus == GroupStatus.PENDING_DELETE) {
            if (status == GroupStatus.DELETED) {
                // 이 상황은 배치 작업으로만 도달할 수 있음.
                this.groupStatus = status;
                return true;
            }
        }

        return false;
    }

    void changeNames(String groupFullName, String groupShortName) {
        this.groupFullName = groupFullName;
        this.groupShortName = groupShortName;
    }

    void changeEmblem(GroupEmblemType groupEmblemType, String groupEmblemId) {
        this.groupEmblemType = groupEmblemType;
        this.groupEmblemId = groupEmblemId;
    }

    void changeMemberLimits(int memberLimitCount, int assistantLimitCount) {
        this.memberLimitCount = memberLimitCount;
        this.assistantLimitCount = assistantLimitCount;
    }
}
