package io.github.hswy.calendar.user.payment.card.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import io.github.hswy.calendar.user.payment.card.model.UserPaymentCardEntity;


public interface UserPaymentCardRepository extends JpaRepository<UserPaymentCardEntity, Long>, UserPaymentCardFragment {
    List<UserPaymentCardEntity> findAllByUserId(Long userId);
    Optional<UserPaymentCardEntity> findByUserIdAndCardId(Long userId, Long cardId);
}
