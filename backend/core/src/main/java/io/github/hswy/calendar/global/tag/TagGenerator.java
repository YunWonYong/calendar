package io.github.hswy.calendar.global.tag;

import java.security.SecureRandom;

import org.springframework.stereotype.Component;

@Component 
public class TagGenerator {
    private static final String FIRST_CHARACTERS = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz";
    private static final String CHARACTERS = FIRST_CHARACTERS + "23456789";
    private static final int MIN_GENERATED_LEN = 2;
    private static final int MAX_GENERATED_LEN = 6;
    private static final SecureRandom random = new SecureRandom();

    public String generate() {
        final int tagSize = getRandomTagSize();

        StringBuilder buffer = new StringBuilder(tagSize);
        buffer.append(getFirstCharacter());

        for (int i = 1; i < tagSize; i++) {
            buffer.append(getRandomCharacter());
        }

        return buffer.toString();
    }

    private int getRandomTagSize() {
        return random.nextInt(MIN_GENERATED_LEN, MAX_GENERATED_LEN + 1);
    }

    private char getFirstCharacter() {
        int randomIndex = getRandomNumber(FIRST_CHARACTERS.length());
        return FIRST_CHARACTERS.charAt(randomIndex);
    }

    private char getRandomCharacter() {
        int randomIndex = getRandomNumber(CHARACTERS.length());
        return CHARACTERS.charAt(randomIndex);
    }

    private int getRandomNumber(int base) {
        return random.nextInt(base);
    }
}
