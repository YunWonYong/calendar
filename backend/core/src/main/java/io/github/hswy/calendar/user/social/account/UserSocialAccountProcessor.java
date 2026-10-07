package io.github.hswy.calendar.user.social.account;

import java.util.List;
import java.util.Optional;

import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.Caching;
import org.springframework.stereotype.Component;

import io.github.hswy.calendar.global.annotations.RequireTransaction;
import io.github.hswy.calendar.social.account.SocialAccountEntity;
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
        checkConnectedSocialAccount(
            userEntity.getUserId(),
            socialAccountEntity.getSocialAccountId()
        );
        return repo.save(
            UserSocialAccountEntity
                .builder()
                    .user(userEntity)
                    .socialAccount(socialAccountEntity)
                .build()
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
            UserSocialAccountEntity
                .builder()
                    .user(userEntity)
                    .socialAccount(socialAccountEntity)
                .build()
        );
    }

    @RequireTransaction 
    @Caching(
        evict = {
            @CacheEvict(
                cacheNames = "USER:SOCIAL:ACCOUNT",
                key = "#userId + ':' + #socialAccountId"
            ),
            @CacheEvict(
                cacheNames = "USER:SOCIAL:ACCOUNTS",
                key = "#userId"
            ),
            @CacheEvict(
                cacheNames = "USER:SOCIAL:ACCOUNT:OWNER",
                key = "#socialAccountId"
            ),
    })
    public UserSocialAccountEntity changeStatus(Long userId, Long socialAccountId, UserSocialAccountStatus status) {
        UserSocialAccountEntity userSocialAccountEntity = getSocialAccount(userId, socialAccountId);
        userSocialAccountEntity.changeStatus(status);
        // [TODO] history
        // String oldStatus = userSocialAccountEntity.changeStatus(status);
        return userSocialAccountEntity;
    }

    @Cacheable(
        cacheNames = "USER:SOCIAL:ACCOUNT:OWNER",
        key = "#socialAccountId"
    )
    public Long getConnectedSocialAccountUserId(Long socialAccountId) {
        try {
            return repo
                .findUserIdBySocialAccountIdAndUserSocialStatus(
                    socialAccountId,
                    UserSocialAccountStatus.CONNECTED
                )
                .orElse(null);
        } catch(Exception e) {
            System.out.println(e);
            throw e;
        }
    }

    @Cacheable(
        cacheNames = "USER:SOCIAL:ACCOUNT",
        key = "#userId + ':' + #socialAccountId"
    )
    public UserSocialAccountEntity getSocialAccount(Long userId, Long socialAccountId) {
        Optional<UserSocialAccountEntity> userSocialAccountEntityOpt = repo.findById(getUserSocialAccountId(userId, socialAccountId));
        if (userSocialAccountEntityOpt.isEmpty()) {
            throw new UserSocialAccountNotFoundException(userId, socialAccountId);
        }

        return userSocialAccountEntityOpt.get();
    }

    
    @Cacheable(
        cacheNames = "USER:SOCIAL:ACCOUNTS",
        key = "#userId"
    )
    public List<UserSocialAccountEntity> getSocialAccounts(Long userId) {
        return repo.findByUser_UserId(userId);
    }

    private void checkConnectedSocialAccount(Long userId, Long socialAccountId) {
        Long connectedUserId = getConnectedSocialAccountUserId(socialAccountId);
        if (connectedUserId != null) {
            if (!userId.equals(connectedUserId)) {
                throw new UserSocialAccountAlreadyConnectedToAnotherUserException(
                    userId, 
                    socialAccountId, 
                    connectedUserId
                );
            }

            throw new UserSocialAccountAlreadyExistsException(
                userId, 
                socialAccountId
            );
        }
    }

    private UserSocialAccountId getUserSocialAccountId(Long userId, Long socialAccountId) {
        return UserSocialAccountId
            .builder()
                .userId(userId)
                .socialAccountId(socialAccountId)
            .build();
    }
}
