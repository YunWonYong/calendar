package io.github.hswy.calendar.user.profile;

import java.util.Optional;

import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Component;

import io.github.hswy.calendar.global.annotations.RequireTransaction;
import io.github.hswy.calendar.global.exception.ApplicationException;
import io.github.hswy.calendar.global.tag.TagGenerator;
import io.github.hswy.calendar.social.account.oauth2.SocialOAuth2UserInfo;
import io.github.hswy.calendar.user.profile.exception.UserProfileNotFoundException;
import lombok.RequiredArgsConstructor;

@Component 
@RequiredArgsConstructor 
public class UserProfileProcessor {
    
    private final UserProfileRepository repo;
    private final TagGenerator tagGenerator;

    @RequireTransaction 
    public UserProfileEntity createNewUserProfile(Long userId, SocialOAuth2UserInfo info) throws ApplicationException {
        String nickname = info.getNickname();
        UserProfileEntity newEntity = UserProfileEntity
            .builder()
                .userId(userId)
                .nickname(nickname)
                .tel(info.getTel())
                .email(info.getEmail())
                .profileImage(info.getProfileImage())
            .build();

        while(true) {
            // [TODO] lock
            String tag = tagGenerator.generate();
            if (!repo.existsByNicknameAndTag(nickname, tag)) {
                newEntity.setTag(tag);
                return repo.save(newEntity);
            }
        }
    }

    @Cacheable(
        cacheNames = "USER:PROFILE",
        key = "#userId"
    )
    public UserProfileEntity getUserProfile(Long userId) {
        Optional<UserProfileEntity> entityOpt = repo.findById(userId);
        if (entityOpt.isEmpty()) {
            throw new UserProfileNotFoundException(userId);
        }

        return entityOpt.get();
    }

    @RequireTransaction 
    public UserProfileEntity changeEmail(Long userId, String email) {
        UserProfileEntity profileEntity = getUserProfile(userId);
        profileEntity.changeEmail(email);
        // [TODO] user history oldEmail
        // String oldEmail = profileEntity.changeEmail(email);
        return profileEntity;
    }

    @RequireTransaction 
    public UserProfileEntity changeTel(Long userId, String tel) {
        UserProfileEntity profileEntity = getUserProfile(userId);
        profileEntity.changeTel(tel);
        // [TODO] user history oldTel
        // String oldTel = profileEntity.changeTel(tel);
        return profileEntity;
    }

}
 