package io.github.hswy.calendar.user.model;

import io.github.hswy.calendar.plan.enums.PlanType;
import io.github.hswy.calendar.user.profile.UserProfileImageType;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@Builder( access = AccessLevel.PUBLIC )
@RequiredArgsConstructor 
public class UserInfoDTO {
    private final long id;
    private final String email;
    private final String nickname;
    private final UserProfileImageType profileImageType;
    private final String profileImage;
    private final String tel;
    private final long planId;
    private final PlanType planType;
}
