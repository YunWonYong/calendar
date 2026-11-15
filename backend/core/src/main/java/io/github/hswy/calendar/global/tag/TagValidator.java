package io.github.hswy.calendar.global.tag;

import java.util.regex.Pattern;

import org.springframework.stereotype.Component;

@Component
public class TagValidator {

    private static final Pattern TAG_PATTERN = Pattern.compile("^[A-Za-z0-9]{2,8}$");

    public boolean isValid(String tag) {
        return tag != null && TAG_PATTERN.matcher(tag).matches();
    }

    public int getMinSize() {
        return 2;
    }
    
    public int getMaxSize() {
        return 8;
    }
}