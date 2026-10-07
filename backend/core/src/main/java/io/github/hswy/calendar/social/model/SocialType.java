package io.github.hswy.calendar.social.model;

public enum SocialType {
    GOOGLE("google"),
    KAKAO("kakao"),
    NAVER("naver"),
    TEST("test");
    
    private final String registrationId;

    SocialType(String registrationId) {
        this.registrationId = registrationId;
    }

    public static SocialType fromRegistrationId(String registrationId) {
        for (SocialType value: values()) {
            if (value.registrationId.equalsIgnoreCase(registrationId)) {
                return value;
            }
        }

        throw new IllegalArgumentException("Unsupported registration : " + registrationId);
    }

    public String value() {
        return this.registrationId;
    }
}
