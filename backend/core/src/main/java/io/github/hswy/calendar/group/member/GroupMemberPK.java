package io.github.hswy.calendar.group.member;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Embeddable 
@Getter 
@AllArgsConstructor( access = AccessLevel.PROTECTED ) 
@NoArgsConstructor 
@Builder 
public class GroupMemberPK {
    @Column (
        name = "group_id",
        nullable = false,
        insertable = true
    )
    private Long groupId;
    
    @Column(
        name = "user_id",
        nullable = false,
        insertable = true
    )
    private Long userId;
}
