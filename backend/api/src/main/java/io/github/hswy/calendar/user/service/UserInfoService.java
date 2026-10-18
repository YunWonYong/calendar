package io.github.hswy.calendar.user.service;

import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import io.github.hswy.calendar.user.model.UserInfoDTO;
import io.github.hswy.calendar.user.model.UserInfoDTOMapper;
import io.github.hswy.calendar.user.plan.UserPlanEntity;
import io.github.hswy.calendar.user.plan.UserPlanProcessor;
import io.github.hswy.calendar.user.profile.UserProfileEntity;
import io.github.hswy.calendar.user.profile.UserProfileProcessor;
import lombok.RequiredArgsConstructor;

@Service 
@RequiredArgsConstructor 
public class UserInfoService {
    private final UserProfileProcessor userProfileProcessor;
    private final UserPlanProcessor userPlanProcessor;
    private final UserInfoDTOMapper userInfoDTOMapper;

    @Cacheable(
        cacheNames = "USER:DTO",
        key = "#userId"
    )
    public UserInfoDTO getUserInfo(Long userId) {
        UserProfileEntity profileEntity = userProfileProcessor.getUserProfile(userId);
        UserPlanEntity planEntity = userPlanProcessor.getUserPlan(userId);
        return userInfoDTOMapper.toDTO(profileEntity, planEntity);
    }
}
