package io.github.hswy.calendar.user.model;

import io.github.hswy.calendar.user.profile.UserProfileEntity;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder( access = AccessLevel.PUBLIC )
public class UserInfoDTO {
    private final Long id;
    private final String email;
    private final String nickname;
    private final String profileImageId;
    private final String tel;

    public static UserInfoDTO from(UserProfileEntity profile) {
        return UserInfoDTO.builder()
            .id(profile.getUserId())
            .email(profile.getEmail())
            .nickname(profile.getNickname())
            .profileImageId(profile.getProfileImage())
            .tel(profile.getTel())
            .build();
    }
}
