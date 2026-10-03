package io.github.hswy.calendar.payment.cards.repository;

import io.github.hswy.calendar.payment.cards.enums.UserPaymentCardStatus;
import io.github.hswy.calendar.payment.cards.model.UserPaymentCardEntity;

interface UserPaymentCardFragment {
    UserPaymentCardEntity saveNewCard(UserPaymentCardEntity cardEntity);
    UserPaymentCardEntity updateCardState(UserPaymentCardEntity cardEntity, UserPaymentCardStatus status);
    UserPaymentCardEntity updateCardNickname(UserPaymentCardEntity cardEntity, String cardNickname);
}
