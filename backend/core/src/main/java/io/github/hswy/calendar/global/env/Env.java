package io.github.hswy.calendar.global.env;

import java.util.Arrays;
import java.util.Locale;

import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor 
@Getter 
enum ENV {
    LOCAL("local"),
    DEV("dev"),
    PROD("prod");

    private final String env;
    
    public boolean matches(String env) {
        return this.env.equalsIgnoreCase(env);
    }

    public static boolean contains(String env) {
        return Arrays.stream(values())
            .anyMatch(value -> value.matches(env));
    }
}

@Component 
public class Env {
    private final String activeEnv;

    public Env(Environment environment) throws IllegalStateException {
        String activeEnv = environment.getProperty("spring.profiles.active");
        if (!ENV.contains(activeEnv)) {
            throw new IllegalStateException("Missing required property: spring.profiles.active");
        }

        this.activeEnv = activeEnv.toLowerCase(Locale.ROOT);
    }

    public boolean isLocal() {
        return ENV.LOCAL.matches(activeEnv);
    }

    public boolean isDev() {
        return ENV.DEV.matches(activeEnv);
    }

    public boolean isProd() {
        return ENV.PROD.matches(activeEnv);
    }

    public String get() {
        return this.activeEnv;
    }
}
