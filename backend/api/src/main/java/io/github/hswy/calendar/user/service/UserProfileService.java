package io.github.hswy.calendar.user.service;

import org.springframework.stereotype.Service;

import io.github.hswy.calendar.user.profile.UserProfileEntity;
import io.github.hswy.calendar.user.profile.UserProfileProcessor;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserProfileService {
    private final UserProfileProcessor processor;

    public UserProfileEntity getUserProfile(Long userId) {
        processor.getUserProfile(userId);
        return null;
    }
}
