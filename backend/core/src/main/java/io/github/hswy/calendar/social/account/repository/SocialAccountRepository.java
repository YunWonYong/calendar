package io.github.hswy.calendar.social.account.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import io.github.hswy.calendar.social.account.model.SocialAccountEntity;
import io.github.hswy.calendar.social.model.SocialType;

public interface SocialAccountRepository extends JpaRepository<SocialAccountEntity, Long> {
    Optional<SocialAccountEntity> findBySocialTypeAndSocialIdentity(SocialType socialType, String socialIdentity);
}
