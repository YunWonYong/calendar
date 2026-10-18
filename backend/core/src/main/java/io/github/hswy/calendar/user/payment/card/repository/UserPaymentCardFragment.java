package io.github.hswy.calendar.user.payment.card.repository;

import io.github.hswy.calendar.user.payment.card.enums.UserPaymentCardStatus;
import io.github.hswy.calendar.user.payment.card.model.UserPaymentCardEntity;

interface UserPaymentCardFragment {
    UserPaymentCardEntity saveNewCard(UserPaymentCardEntity cardEntity);
    UserPaymentCardEntity updateCardState(UserPaymentCardEntity cardEntity, UserPaymentCardStatus status);
    UserPaymentCardEntity updateCardNickname(UserPaymentCardEntity cardEntity, String cardNickname);
}
