package io.github.hswy.calendar.social.account.oauth2;

import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Component;

import io.github.hswy.calendar.global.exception.ApplicationException;
import io.github.hswy.calendar.global.utils.MapCaster;
import io.github.hswy.calendar.social.account.exception.SocialRequiredAttributeNotFoundException;
import io.github.hswy.calendar.social.model.SocialType;
import io.github.hswy.calendar.user.profile.provider.UserProfileNicknameGenerator;
import io.github.hswy.calendar.social.account.exception.SocialIdentityNotFoundException;

import java.util.Map;

@Component 
class KakaoSocialAccountOAuth2Mapper implements SocialAccountOAuth2Mapper {

    @Override
    public void map(SocialOAuth2UserInfo userInfo, OAuth2User oAuth2User) throws ApplicationException {
        String socialIdentity = null;
        Object id = oAuth2User.getAttribute("id");
        if (id instanceof Number) {
            socialIdentity = String.valueOf(id);
        } else if (id instanceof String) {
            socialIdentity = id.toString();
        } 
        
        if (socialIdentity == null || socialIdentity.isBlank()) {
            throw new SocialIdentityNotFoundException(userInfo.socialType, "id");
        }

        Map<String, Object> userAccount = SocialAccountMapCaster.getAsRequiredMap(
            oAuth2User.getAttribute("kakao_account"),
            userInfo.socialType,
            "kakao_account"
        );

        Object email = userAccount.get("email");
        if (!(email instanceof String value && !value.isBlank())) {
            throw new SocialRequiredAttributeNotFoundException(userInfo.socialType, "kakao_account->email");
        }


        userInfo.socialIdentity = socialIdentity;
        userInfo.email = (String) email;
        userInfo.nickname = getNickname(userAccount);
    }

    private String getNickname(Map<String, Object> userAccount) {
        Map<String, Object> profile = MapCaster.castToMap(userAccount.get("profile"));
        if (profile != null && profile.get("nickname") != null) {
            Object nicknameObj = profile.get("nickname");
            if (nicknameObj instanceof String value && !value.isBlank()) {
                return value;
            }
        }
        return UserProfileNicknameGenerator.getRandomNickname();
    }

    @Override
    public SocialType getSocialType() {
        return SocialType.KAKAO;
    }
}
