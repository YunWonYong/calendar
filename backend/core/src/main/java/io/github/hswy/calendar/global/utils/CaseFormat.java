package io.github.hswy.calendar.global.utils;

import java.util.Locale;

public class CaseFormat {
    public static String toLowerCamelCase(String str) {
        if (str == null || str.isBlank()) {
            return str;
        }

        String[] words = str.toLowerCase(Locale.ROOT).split("_");
        StringBuilder result = new StringBuilder(words[0]);

        for (int i = 1; i < words.length; i++) {
            if (!words[i].isEmpty()) {
                result.append(
                    words[i].substring(0, 1).toUpperCase(Locale.ROOT)
                );
                result.append(words[i].substring(1));
            }
        }

        return result.toString();
    }
}
