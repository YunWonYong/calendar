package io.github.hswy.calendar.user;

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
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

@Entity 
@Table (
    name = "users"
)
@Getter 
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor 
@Builder 
public class UserEntity extends CreatedAtEntity {

    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(
        name = "user_id",
        updatable = false
    )
    private Long userId;

    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(
        name = "user_status",
        nullable = false,
        insertable = false,
        updatable = true
    )
    @Builder.Default
    private UserStatus userStatus = UserStatus.ACTIVE;

    UserStatus changeStatus(UserStatus newStatus) {
        UserStatus oldStatus = this.userStatus;
        this.userStatus = newStatus;
        return oldStatus;
    }
}
