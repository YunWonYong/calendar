package io.github.hswy.calendar.social.account.oauth2;

import org.springframework.security.oauth2.core.user.OAuth2User;

import io.github.hswy.calendar.global.exception.ApplicationException;
import io.github.hswy.calendar.social.account.exception.SocialRequiredAttributeNotFoundException;
import io.github.hswy.calendar.social.account.exception.SocialIdentityNotFoundException;
import io.github.hswy.calendar.user.profile.provider.UserProfileNicknameGenerator;

import java.util.Map;

public class NaverSocialAccountOAuth2Mapper implements SocialAccountOAuth2Mapper {

    @Override
    public void map(SocialOAuth2UserInfo userInfo, OAuth2User oAuth2User) throws ApplicationException {
        System.out.println(oAuth2User);
        Map<String, Object> response = SocialAccountMapCaster.getAsRequiredMap(
            oAuth2User.getAttribute("response"),
            userInfo.socialType,
            "response"
        );

        String socialIdentity = null;
        Object id = response.get("id");

        if (id instanceof Number) {
            socialIdentity = String.valueOf(id);
        } else if (id instanceof String) {
            socialIdentity = id.toString();
        }

        if (socialIdentity == null) {
            throw new SocialIdentityNotFoundException(userInfo.socialType, "response->id");
        }

        Object email = response.get("email");
        if (!(email instanceof String value && !value.isBlank())) {
            throw new SocialRequiredAttributeNotFoundException(userInfo.socialType, "response->email");
        }

        userInfo.socialIdentity = socialIdentity;
        userInfo.email = (String) email;
        userInfo.nickname = getNickname(response.get("nickname"));
        String name = (String) response.get("name");

        Object phoneNumberObj = response.get("mobile");
        if (phoneNumberObj != null) {
            userInfo.tel = String.valueOf(phoneNumberObj);
        }

        Object profileImageObj = response.get("profile_image");
        if (profileImageObj instanceof String profileImage && !profileImage.isBlank()) {
            userInfo.profileImage = profileImage;
        }
        
        // TODO Naver login optional data
        Object ageObj = response.get("age");
        Object genderObj = response.get("gender");
        Object birthdayObj = response.get("birthday");
        Object birthyearObj = response.get("birthyear");
        System.out.println("===Naver Login===");
        System.out.println(name);
        System.out.println(phoneNumberObj);
        System.out.println(ageObj);
        System.out.println(genderObj);
        System.out.println(profileImageObj);
        System.out.println(birthdayObj);
        System.out.println(birthyearObj);
    }

    private String getNickname(Object nickname) {
        if (nickname instanceof String value && !value.isBlank()) {
            return value;
        }
        return UserProfileNicknameGenerator.getRandomNickname();
    }
}
