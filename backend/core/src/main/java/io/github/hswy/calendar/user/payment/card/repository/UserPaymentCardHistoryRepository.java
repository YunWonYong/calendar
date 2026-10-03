package io.github.hswy.calendar.user.payment.card.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import io.github.hswy.calendar.user.payment.card.model.UserPaymentCardHistoryEntity;

interface UserPaymentCardHistoryRepository extends JpaRepository<UserPaymentCardHistoryEntity, Long> {
    
}
