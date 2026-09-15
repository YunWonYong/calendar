package io.github.hswy.calendar.users.model;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder( access = AccessLevel.PUBLIC )
public class UserInfoDTO {
    private final Long id;
    private final String email;
    private final String nickname;
    private final String profileImageUrl;
    private final String tel;

    public static UserInfoDTO from(UserProfileEntity profile) {
        return UserInfoDTO.builder()
            .id(profile.getUserId())
            .email(profile.getEmail())
            .nickname(profile.getNickname())
            .profileImageUrl(profile.getProfileImageUrl())
            .tel(profile.getTel())
            .build();
    }
}
