package io.github.hswy.calendar.global.common.enums;

import lombok.Getter;

@Getter
public enum Platform {
    GOOGLE("google"),
    KAKAO("kakao"),
    NAVER("naver");

    private final String registrationId;

    Platform(String registrationId) {
        this.registrationId = registrationId;
    }

    public static Platform fromRegistrationId(String registrationId) {
        for (Platform value: values()) {
            if (value.registrationId.equalsIgnoreCase(registrationId)) {
                return value;
            }
        }

        throw new IllegalArgumentException("Unsupported registration : " + registrationId);
    }
}
