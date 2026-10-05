package io.github.hswy.calendar.social.accounts.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import io.github.hswy.calendar.social.accounts.model.SocialAccountEntity;
import io.github.hswy.calendar.social.model.SocialType;

public interface SocialAccountRepository extends JpaRepository<SocialAccountEntity, Long> {
    Optional<SocialAccountEntity> findBySocialTypeAndSocialIdentity(SocialType socialType, String socialIdentity);
}
