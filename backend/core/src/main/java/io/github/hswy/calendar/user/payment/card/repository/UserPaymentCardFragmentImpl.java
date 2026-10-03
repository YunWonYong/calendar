package io.github.hswy.calendar.user.payment.card.repository;

import org.springframework.stereotype.Repository;

import io.github.hswy.calendar.global.annotations.RequireTransaction;
import io.github.hswy.calendar.user.payment.card.enums.UserPaymentCardStatus;
import io.github.hswy.calendar.user.payment.card.model.UserPaymentCardEntity;
import io.github.hswy.calendar.user.payment.card.model.UserPaymentCardHistoryEntity;
import jakarta.persistence.EntityManager;
import lombok.AllArgsConstructor;

@Repository
@AllArgsConstructor
public class UserPaymentCardFragmentImpl implements UserPaymentCardFragment {
    
    private final EntityManager entityManager;
    private final UserPaymentCardHistoryRepository historyRepository;
    
    @Override
    @RequireTransaction 
    public UserPaymentCardEntity saveNewCard(UserPaymentCardEntity cardEntity) {
        entityManager.persist(cardEntity);
        insertHistory(cardEntity);
        return cardEntity;
    }

    @Override
    @RequireTransaction 
    public UserPaymentCardEntity updateCardNickname(UserPaymentCardEntity cardEntity, String cardNickname) {
        cardEntity.setCardNickname(cardNickname);
        insertHistory(cardEntity, UserPaymentCardStatus.CHANGED);
        return cardEntity;
    }

    @Override
    @RequireTransaction 
    public UserPaymentCardEntity updateCardState(UserPaymentCardEntity cardEntity, UserPaymentCardStatus status) {
        cardEntity.setCardStatus(status);
        insertHistory(cardEntity);
        return cardEntity;
    }
    
    private void insertHistory(UserPaymentCardEntity cardEntity) {
        insertHistory(cardEntity, cardEntity.getCardStatus());
    };

    private void insertHistory(UserPaymentCardEntity cardEntity, UserPaymentCardStatus historyStatus) {
        UserPaymentCardHistoryEntity historyEntity = getHistoryEntity(cardEntity);
        historyEntity.setCardStatus(historyStatus);
        insertHistory(historyEntity);
    };
    
    private void insertHistory(UserPaymentCardHistoryEntity cardHistoryEntity) {
        historyRepository.save(cardHistoryEntity);
    };
    
    private UserPaymentCardHistoryEntity getHistoryEntity(UserPaymentCardEntity cardEntity) {
        return new UserPaymentCardHistoryEntity()
            .form(cardEntity);
    };
    
}
