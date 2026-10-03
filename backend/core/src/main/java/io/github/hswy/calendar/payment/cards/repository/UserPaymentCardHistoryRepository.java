package io.github.hswy.calendar.payment.cards.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import io.github.hswy.calendar.payment.cards.model.UserPaymentCardHistoryEntity;

interface UserPaymentCardHistoryRepository extends JpaRepository<UserPaymentCardHistoryEntity, Long> {
    
}
