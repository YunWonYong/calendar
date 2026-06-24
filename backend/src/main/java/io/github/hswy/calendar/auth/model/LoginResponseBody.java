package io.github.hswy.calendar.auth.model;

import io.github.hswy.calendar.users.model.UserInfoDTO;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder( access = AccessLevel.PUBLIC )
public class LoginResponseBody {
    private final UserInfoDTO user;
}
