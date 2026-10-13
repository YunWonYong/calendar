package io.github.hswy.calendar.user.social.account;

import java.util.List;
import java.util.Optional;

import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.Caching;
import org.springframework.stereotype.Component;

import io.github.hswy.calendar.global.annotations.RequireTransaction;
import io.github.hswy.calendar.social.account.SocialAccountEntity;
import io.github.hswy.calendar.social.account.oauth2.SocialOAuth2UserInfo;
import io.github.hswy.calendar.user.UserEntity;
import io.github.hswy.calendar.user.social.account.exception.UserSocialAccountAlreadyConnectedToAnotherUserException;
import io.github.hswy.calendar.user.social.account.exception.UserSocialAccountAlreadyExistsException;
import io.github.hswy.calendar.user.social.account.exception.UserSocialAccountNotFoundException;
import lombok.RequiredArgsConstructor;

@Component 
@RequiredArgsConstructor 
public class UserSocialAccountProcessor {
    private final UserSocialAccountRepository repo;

    @RequireTransaction     
    public UserSocialAccountEntity createNewUserSocialAccount(UserEntity userEntity, SocialAccountEntity socialAccountEntity) {
        List<Long> connectedUserIds = getConnectedSocialAccountUserId(socialAccountEntity.getSocialAccountId());
        if (connectedUserIds != null && connectedUserIds.size() > 0) {
            // 다른 사용자 ID와 연결된게 있으면 예외처리.
            throw new UserSocialAccountAlreadyConnectedToAnotherUserException(
                userEntity.getUserId(), 
                socialAccountEntity.getSocialAccountId()
            );
        }
        // [TODO] history
        return repo.save(
            makeUserSocialAccountEntity(userEntity, socialAccountEntity)
        );
    }

    @RequireTransaction
    @Caching(
        evict = {
            @CacheEvict(
                cacheNames = "USER:SOCIAL:ACCOUNT",
                key = "#userEntity.userId + ':' + #socialAccountEntity.socialAccountId"
            ),
            @CacheEvict(
                cacheNames = "USER:SOCIAL:ACCOUNTS",
                key = "#userEntity.userId"
            ),
            @CacheEvict(
                cacheNames = "USER:SOCIAL:ACCOUNT:OWNER",
                key = "#socialAccountEntity.socialAccountId"
            ),
    })
    public UserSocialAccountEntity addConnectSocialAccount(UserEntity userEntity, SocialAccountEntity socialAccountEntity) {
        checkConnectedSocialAccount(
            userEntity.getUserId(),
            socialAccountEntity.getSocialAccountId()
        );
        // [TODO] history
        return repo.save(
            makeUserSocialAccountEntity(userEntity, socialAccountEntity)
        );
    }

    @RequireTransaction 
    @Caching(
        evict = {
            @CacheEvict(
                cacheNames = "USER:SOCIAL:ACCOUNT",
                key = "#entity.id.userId + ':' + #entity.id.socialAccountId"
            ),
            @CacheEvict(
                cacheNames = "USER:SOCIAL:ACCOUNTS",
                key = "#entity.id.userId"
            ),
            @CacheEvict(
                cacheNames = "USER:SOCIAL:ACCOUNT:OWNER",
                key = "#entity.id.socialAccountId"
            ),
            @CacheEvict(
                cacheNames = "USER:SOCIAL:ACCOUNT",
                key = "#entity.socialAccount.socialType + ':' + #entity.socialAccount.socialIdentity"
            )
    })
    public UserSocialAccountEntity changeStatus(UserSocialAccountEntity entity, UserSocialAccountStatus status) {
        entity.changeStatus(status);
        // [TODO] history
        // String oldStatus = userSocialAccountEntity.changeStatus(status);
        return entity;
    }

    @Cacheable(
        cacheNames = "USER:SOCIAL:ACCOUNT:OWNER",
        key = "#socialAccountId"
    )
    public List<Long> getConnectedSocialAccountUserId(Long socialAccountId) {
        return repo.findUserIdBySocialAccountIdAndUserSocialStatus(
            socialAccountId,
            UserSocialAccountStatus.CONNECTED
        );
    }

    @Cacheable(
        cacheNames = "USER:SOCIAL:ACCOUNT",
        key = "#userId + ':' + #socialAccountId"
    )
    public UserSocialAccountEntity getSocialAccount(Long userId, Long socialAccountId) {
        Optional<UserSocialAccountEntity> userSocialAccountEntityOpt = repo.findById(
            makeUserSocialAccountId(
                userId,
                socialAccountId
            )
        );
        if (userSocialAccountEntityOpt.isEmpty()) {
            throw new UserSocialAccountNotFoundException(userId, socialAccountId);
        }

        return userSocialAccountEntityOpt.get();
    } 

    @Cacheable(
        cacheNames = "USER:SOCIAL:ACCOUNT",
        key = "#info.socialType + ':' + #info.socialIdentiy"
    )
    public UserSocialAccountEntity getConnectedSocialAccount(SocialOAuth2UserInfo info) {
        return repo.findBySocialIdentityAndSocialTypeAndUserSocialStatus(
            info.getSocialIdentity(),
            info.getSocialType(),
            UserSocialAccountStatus.CONNECTED
        );
    }

    private void checkConnectedSocialAccount(Long userId, Long socialAccountId) {
        List<Long> connectedUserIds = getConnectedSocialAccountUserId(socialAccountId);
        if (connectedUserIds != null && connectedUserIds.size() > 0) {
            
            if (connectedUserIds.indexOf(userId) == 0) {
                throw new UserSocialAccountAlreadyConnectedToAnotherUserException(
                    userId, 
                    socialAccountId
                );
            }

            throw new UserSocialAccountAlreadyExistsException(
                userId, 
                socialAccountId
            );
        }
    }

    private UserSocialAccountEntity makeUserSocialAccountEntity(UserEntity userEntity, SocialAccountEntity socialAccountEntity) {
        return UserSocialAccountEntity
            .builder()
                .id(makeUserSocialAccountId(
                    userEntity.getUserId(),
                    socialAccountEntity.getSocialAccountId()
                ))
                .user(userEntity)
                .socialAccount(socialAccountEntity)
            .build();
    }

    private UserSocialAccountId makeUserSocialAccountId(Long userId, Long socialAccountId) {
        return UserSocialAccountId
            .builder()
                .userId(userId)
                .socialAccountId(socialAccountId)
            .build();
    }
}
