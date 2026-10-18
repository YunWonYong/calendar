package io.github.hswy.calendar.user.profile.provider;

import java.security.SecureRandom;

public class UserProfileNicknameGenerator {
    private static final String[] PREFIX_WORDS = new String[]{
        "Blue",
        "Red",
        "Sky",
        "Star",
        "Moon",
        "Sun",
        "Rain",
        "Snow",
        "Dark",
        "Light",
        "Tiny",
        "Big",
        "Wild",
        "Soft",
        "Fast",
        "Cool",
        "Calm",
        "Lucky",
        "Happy",
        "Brave"
    };

    private static final String[] SUFFIX_WORDS = new String[]{
        "Fox",
        "Bear",
        "Wolf",
        "Cat",
        "Dog",
        "Bird",
        "Owl",
        "Lion",
        "Tiger",
        "Bunny",
        "Panda",
        "Frog",
        "Deer",
        "Hawk",
        "Bee",
        "Ant",
        "Fish",
        "Duck",
        "Goat",
        "Lynx"
    };

    private static final SecureRandom random = new SecureRandom();

    public static String getRandomNickname() {
        String first = PREFIX_WORDS[random.nextInt(PREFIX_WORDS.length)];
        String second = SUFFIX_WORDS[random.nextInt(SUFFIX_WORDS.length)];
        return first + " " + second;
    }
}
