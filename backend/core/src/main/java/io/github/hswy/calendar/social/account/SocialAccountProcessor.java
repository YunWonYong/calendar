package io.github.hswy.calendar.social.account;

import java.util.Optional;

import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Component;

import io.github.hswy.calendar.social.account.exception.SocialAccountAlreadyExistsException;
import io.github.hswy.calendar.social.model.SocialType;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class SocialAccountProcessor {
    private final SocialAccountRepository repo;
    
    @Cacheable(
        cacheNames = "OAUTH:SOCIAL:ACCOUNTS",
        key = "#socialType + ':' + #socialIdentity"
    )
    public SocialAccountEntity getSocialAccountEntity(SocialType socialType, String socialIdentity) {
        Optional<SocialAccountEntity> socialAccountEntityOpt = repo.findBySocialTypeAndSocialIdentity(socialType, socialIdentity);
        if (socialAccountEntityOpt.isEmpty()) {
            return null;
        }

        return socialAccountEntityOpt.get();
    }

    @Cacheable(
        cacheNames = "OAUTH:SOCIAL:ACCOUNTS:ID",
        key = "#socialAccountId"
    )
    public SocialAccountEntity getSocialAccountEntity(Long socialAccountId) {
        Optional<SocialAccountEntity> socialAccountEntityOpt = repo.findById(socialAccountId);
        if (socialAccountEntityOpt.isEmpty()) {
            return null;
        }

        return socialAccountEntityOpt.get();
    }

    @CacheEvict(
        cacheNames = "OAUTH:SOCIAL:ACCOUNTS",
        key = "#socialType + ':' + #socialIdentity"
    )
    public SocialAccountEntity createNewSocialAccount(SocialType socialType, String socialIdentity) {
        SocialAccountEntity entity = getSocialAccountEntity(socialType, socialIdentity);
        if (entity != null) {
            throw new SocialAccountAlreadyExistsException(socialType, socialIdentity);
        }

        SocialAccountEntity newSocialAccount = repo.save(
            SocialAccountEntity
                .builder()
                    .socialType(socialType)
                    .socialIdentity(socialIdentity)
                .build()
        );

        return newSocialAccount;
    }
}
