package io.github.hswy.calendar.social.account.oauth2;

import java.util.Arrays;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Component;

import io.github.hswy.calendar.social.account.exception.SocialAccountNotSupportedException;
import io.github.hswy.calendar.social.model.SocialType;

@Component 
public class SocialAccountOAuth2MapperResolver {
    private final Map<SocialType, SocialAccountOAuth2Mapper> socialMappers;
    
    public SocialAccountOAuth2MapperResolver(SocialAccountOAuth2Mapper[] mappers) {
        socialMappers = Arrays
            .stream(mappers)
            .collect(
                Collectors.toUnmodifiableMap(
                    SocialAccountOAuth2Mapper::getSocialType,
                    Function.identity()    
                )
            );
    }

    public void map(SocialOAuth2UserInfo userInfo, OAuth2User oAuth2User) {
        SocialAccountOAuth2Mapper socialMapper = socialMappers.get(userInfo.getSocialType());
        if (socialMapper == null) {
            throw new SocialAccountNotSupportedException(
                userInfo.getSocialType(),
                userInfo.getSocialIdentity()
            );
        }

        socialMapper.map(userInfo, oAuth2User);
    }
}
