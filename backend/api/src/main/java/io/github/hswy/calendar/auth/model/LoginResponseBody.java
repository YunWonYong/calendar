package io.github.hswy.calendar.auth.model;

import io.github.hswy.calendar.user.model.UserInfoDTO;

public record LoginResponseBody(UserInfoDTO userInfo, AuthTokenInfoDTO authTokenInfo) {}
