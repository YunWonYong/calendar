package io.github.hswy.calendar.group.member;

import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import io.github.hswy.calendar.global.model.CreatedAtUpdatedAtEntity;
import io.github.hswy.calendar.group.GroupEntity;
import io.github.hswy.calendar.user.UserEntity;
import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity 
@Table(
    name = "group_members"
)
@Getter 
@AllArgsConstructor( access = AccessLevel.PROTECTED )
@NoArgsConstructor 
@Builder 
public class GroupMemberEntity extends CreatedAtUpdatedAtEntity {
    @EmbeddedId 
    private GroupMemberPK pk;

    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(
        name = "member_type",
        nullable = false,
        insertable = true,
        updatable = true,
        columnDefinition = "group_member_types"
    )
    @Builder.Default
    private GroupMemberType memberType = GroupMemberType.NORMAL;
    
    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(
        name = "member_status",
        nullable = false,
        insertable = true,
        updatable = true,
        columnDefinition = "group_member_status"
    )
    @Builder.Default
    private GroupMemberStatus memberStatus = GroupMemberStatus.INVITED;

    @Column(
        name = "order_no",
        nullable = false,
        insertable = true,
        updatable = true
    )
    private int orderNo;

    @MapsId("userId")
    @ManyToOne(
        fetch = FetchType.LAZY,
        optional = false,
        targetEntity = UserEntity.class
    )
    @JoinColumn(
        name = "user_id",
        nullable = false,
        foreignKey = @ForeignKey(
            name = "fk_group_members_users"
        )
    )
    private UserEntity user;

    @MapsId("groupId")
    @ManyToOne(
        fetch = FetchType.LAZY,
        optional = false,
        targetEntity = GroupEntity.class
    )
    @JoinColumn(
        name = "group_id",
        nullable = false,
        foreignKey = @ForeignKey(
            name = "fk_group_members_groups"
        )
    )
    private GroupEntity group;

    void setupOrderNo() {
        int typeOrderNo = this.memberType.getOrderNo();
        int statusOrderNo = this.memberStatus.getOrderNo();
        this.orderNo = typeOrderNo + statusOrderNo;
    }

    void changeStatus(GroupMemberStatus memberStatus) {
        this.memberStatus = memberStatus;
    }

    void changeType(GroupMemberType memberType) {
        this.memberType = memberType;
    }
}
