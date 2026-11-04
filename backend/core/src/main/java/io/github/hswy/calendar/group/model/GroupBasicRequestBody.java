package io.github.hswy.calendar.group.model;

import io.github.hswy.calendar.group.GroupVisibilityType;
import io.github.hswy.calendar.plan.PlanType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter 
@NoArgsConstructor 
@ToString
public class GroupBasicRequestBody {
    @NotBlank 
    @Size(min= 2, max = 18)
    private String fullName;

    @NotBlank 
    @Size(min = 2, max = 6)
    private String shortName;

    @NotNull 
    private PlanType maxOwnedGroupMemberPlanId;

    @NotNull 
    private PlanType maxSubLeaderPlanId;

    @NotNull 
    private GroupVisibilityType visibilityType;
}
